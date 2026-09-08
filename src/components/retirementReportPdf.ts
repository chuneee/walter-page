import { jsPDF } from "jspdf";
import logoColor from "../assets/0f2bacd61666436b2144d7fb5694974b05d285a1.png";
import { buildWhatsAppUrl } from "./whatsappLink";
import {
  comparativaPorPlazo,
  formatoMoneda,
  serieCrecimiento,
  TASA_ACUMULACION,
  TASA_RENTA,
  type RetirementResults,
} from "./retirementMath";

// Paleta del reporte (identidad Walter Valdez)
const NAVY = "#0d2a6e";
const NAVY_SOFT = "#163a86";
const BLUE = "#103595";
const ORANGE = "#ff6b0c";
const ORANGE_DARK = "#c93b09";
const GOLD = "#d9a520";
const GRAY_TEXT = "#5a6472";
const DARK_TEXT = "#1f2937";
const BORDER = "#dce4ef";
const CARD_BG = "#f7f9fc";
const ROW_ALT = "#f4f6fa";
const ACCENT_BG = "#fff6f0";
const ACCENT_BORDER = "#f3c3ad";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 42;
const W = PAGE_W - M * 2;

const fmt = (n: number) => formatoMoneda.format(n);

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export async function generateRetirementReportPdf(d: RetirementResults) {
  const doc = await buildRetirementReportPdf(d);
  const nombre = slug(d.nombre) || "cliente";
  doc.save(`proyeccion-retiro-${nombre}.pdf`);
}

export async function buildRetirementReportPdf(
  d: RetirementResults
): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

  let logo: HTMLImageElement | null = null;
  try {
    logo = await loadImage(logoColor);
  } catch {
    // Si el logo no carga, el PDF se genera sin él
  }

  const fecha = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // ---------- helpers ----------
  const topbar = (tag: string) => {
    const y = M;
    if (logo) {
      const h = 30;
      const w = (logo.naturalWidth / logo.naturalHeight) * h;
      doc.addImage(logo, "PNG", M, y, w, h);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    const tagText = tag.toUpperCase();
    const tagW = doc.getTextWidth(tagText) + 2 * (tagText.length - 1) * 0.6 + 26;
    doc.setFillColor(ACCENT_BG);
    doc.setDrawColor(ACCENT_BORDER);
    doc.setLineWidth(0.8);
    doc.roundedRect(M + W - tagW, y + 6, tagW, 20, 10, 10, "FD");
    doc.setTextColor(ORANGE);
    doc.text(tagText, M + W - tagW / 2, y + 19, {
      align: "center",
      charSpace: 0.6,
    });

    doc.setDrawColor(GOLD);
    doc.setLineWidth(1.6);
    doc.line(M, y + 42, M + W, y + 42);
    return y + 60;
  };

  const pageFooter = (left: string, page: number) => {
    const y = PAGE_H - 34;
    doc.setDrawColor(BORDER);
    doc.setLineWidth(0.6);
    doc.line(M, y - 10, M + W, y - 10);
    doc.setFontSize(8);
    doc.setTextColor(GRAY_TEXT);
    doc.setFont("helvetica", "bold");
    doc.text("Walter Valdez", M, y);
    const boldW = doc.getTextWidth("Walter Valdez");
    doc.setFont("helvetica", "normal");
    doc.text(` · ${left}`, M + boldW, y);
    doc.text(`Calculadora de retiro y pensión privada · ${page}`, M + W, y, {
      align: "right",
    });
  };

  const sectionHead = (kicker: string, title: string, y: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(ORANGE);
    doc.text(kicker.toUpperCase(), M, y, { charSpace: 0.6 });
    doc.setFontSize(13);
    doc.setTextColor(NAVY);
    doc.text(title, M, y + 17);
    return y + 32;
  };

  // ======================= PÁGINA 1 =======================
  let y = topbar("Proyección personalizada");

  // Hero azul con panel del cliente
  const heroH = 148;
  doc.setFillColor(NAVY);
  doc.roundedRect(M, y, W, heroH, 10, 10, "F");

  const panelW = 168;
  const panelX = M + W - panelW - 14;
  doc.setFillColor(NAVY_SOFT);
  doc.roundedRect(panelX, y + 14, panelW, heroH - 28, 8, 8, "F");

  const heroTextW = panelX - M - 40;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor("#ffb08f");
  doc.text("CALCULADORA DE RETIRO Y PENSIÓN PRIVADA", M + 20, y + 30, {
    charSpace: 0.6,
  });

  doc.setFontSize(19);
  doc.setTextColor("#ffffff");
  doc.text("Tu retiro se construye", M + 20, y + 58);
  doc.text("mucho antes de llegar a él.", M + 20, y + 80);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor("#dbe2f5");
  const heroCopy = doc.splitTextToSize(
    "Esta proyección muestra cómo podrían evolucionar tus aportaciones y el patrimonio estimado bajo los supuestos seleccionados.",
    heroTextW
  );
  doc.text(heroCopy, M + 20, y + 102);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor("#b9c6ea");
  doc.text("PREPARADO PARA", panelX + 14, y + 36, { charSpace: 0.5 });
  doc.setFontSize(13);
  doc.setTextColor("#ffffff");
  const nombreLines = doc.splitTextToSize(d.nombre || "Cliente", panelW - 28);
  doc.text(nombreLines.slice(0, 2), panelX + 14, y + 54);
  doc.setFontSize(7);
  doc.setTextColor("#b9c6ea");
  doc.text("FECHA DE ELABORACIÓN", panelX + 14, y + 92, { charSpace: 0.5 });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor("#ffffff");
  doc.text(fecha, panelX + 14, y + 107);
  y += heroH + 16;

  // Capital proyectado
  const capH = 90;
  doc.setFillColor(CARD_BG);
  doc.setDrawColor(BORDER);
  doc.setLineWidth(0.8);
  doc.roundedRect(M, y, W, capH, 8, 8, "FD");
  doc.setFillColor(ORANGE);
  doc.rect(M, y + 10, 4, capH - 20, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(NAVY);
  doc.text("CAPITAL PROYECTADO PARA RETIRO", M + 20, y + 22, {
    charSpace: 0.8,
  });
  doc.setFontSize(26);
  doc.text(fmt(d.capitalEntrega), M + 20, y + 50);

  const extra = d.edadEntrega - d.edadFinAportaciones;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(GRAY_TEXT);
  const capSub = doc.splitTextToSize(
    `Capital proyectado a los ${d.edadEntrega} años bajo escenario ilustrativo. Aportas hasta los ${d.edadFinAportaciones} años${
      extra > 0 ? ` y el fondo sigue creciendo ${extra} años más.` : "."
    }`,
    W - 40
  );
  doc.text(capSub, M + 20, y + 66);
  y += capH + 14;

  // Métricas
  const metrics = [
    { label: "APORTACIÓN MENSUAL", value: fmt(d.aportacion), accent: false },
    {
      label: "PLAZO DE APORTACIÓN",
      value: `${d.aniosAportando} años`,
      accent: false,
    },
    { label: "TOTAL APORTADO", value: fmt(d.totalAportado), accent: false },
    {
      label: "RENDIMIENTO ESTIMADO",
      value: fmt(d.rendimientoEstimado),
      accent: true,
    },
  ];
  const gap = 10;
  const mW = (W - gap * 3) / 4;
  const mH = 56;
  metrics.forEach((m, i) => {
    const x = M + i * (mW + gap);
    doc.setFillColor(m.accent ? ACCENT_BG : "#ffffff");
    doc.setDrawColor(m.accent ? ACCENT_BORDER : BORDER);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, y, mW, mH, 6, 6, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(m.accent ? ORANGE_DARK : GRAY_TEXT);
    doc.text(doc.splitTextToSize(m.label, mW - 20), x + 12, y + 17, {
      charSpace: 0.4,
    });
    doc.setFontSize(13);
    doc.setTextColor(m.accent ? ORANGE_DARK : NAVY);
    doc.text(m.value, x + 12, y + 42);
  });
  y += mH + 20;

  // Gráfica de crecimiento
  y = sectionHead(
    "Evolución de la estrategia",
    "Crecimiento proyectado del patrimonio",
    y
  );
  const chartH = 200;
  doc.setFillColor("#ffffff");
  doc.setDrawColor(BORDER);
  doc.setLineWidth(0.8);
  doc.roundedRect(M, y, W, chartH + 46, 8, 8, "FD");
  drawGrowthChart(doc, d, M + 14, y + 14, W - 28, chartH);

  // Leyenda
  const legendY = y + chartH + 32;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(GRAY_TEXT);
  doc.setFillColor(BLUE);
  doc.circle(M + 24, legendY - 3, 3.5, "F");
  doc.text("Aportaciones acumuladas", M + 32, legendY);
  doc.setFillColor(ORANGE);
  doc.circle(M + 170, legendY - 3, 3.5, "F");
  doc.text("Patrimonio proyectado", M + 178, legendY);

  pageFooter("Agente de Seguros", 1);

  // ======================= PÁGINA 2 =======================
  doc.addPage();
  y = topbar("Proyección de pensión");

  // Pensión mensual estimada
  const penH = 118;
  doc.setFillColor(ORANGE);
  doc.roundedRect(M, y, W, penH, 10, 10, "F");
  doc.setFillColor("#e8560a");
  doc.roundedRect(M + W * 0.52, y, W * 0.48, penH, 10, 10, "F");
  doc.rect(M + W * 0.52, y, 10, penH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor("#ffe3d4");
  doc.text("PENSIÓN MENSUAL ESTIMADA", M + 22, y + 32, { charSpace: 0.8 });
  doc.setFontSize(28);
  doc.setTextColor("#ffffff");
  doc.text(fmt(d.pensionMensual), M + 22, y + 66);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("al mes", M + 22, y + 84);

  doc.setFontSize(9.5);
  doc.setTextColor("#ffffff");
  const penCopy = doc.splitTextToSize(
    `Durante ${d.aniosRenta} años recibirías un total de ${fmt(
      d.totalRetirado
    )}, con el capital generando un supuesto fijo de ${TASA_RENTA.toFixed(
      1
    )}% anual mientras se retira.`,
    W * 0.48 - 40
  );
  doc.text(penCopy, M + W * 0.52 + 20, y + 40);
  y += penH + 22;

  // Comparativo por plazo
  y = sectionHead(
    "Opciones de administración",
    "Comparativo de pensión por plazo",
    y
  );
  const cols = [
    { label: "PLAZO", x: M + 14, align: "left" as const },
    { label: "PENSIÓN MENSUAL ESTIMADA", x: M + W * 0.62, align: "right" as const },
    { label: "TOTAL RETIRADO", x: M + W - 14, align: "right" as const },
  ];
  const headH = 22;
  doc.setFillColor(NAVY);
  doc.rect(M, y, W, headH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor("#ffffff");
  cols.forEach((c) =>
    doc.text(c.label, c.x, y + 14.5, { align: c.align, charSpace: 0.7 })
  );
  y += headH;

  const rowH = 26;
  comparativaPorPlazo(d).forEach((row, i) => {
    if (row.seleccionado) {
      doc.setFillColor("#fff1e9");
      doc.rect(M, y, W, rowH, "F");
    } else if (i % 2 === 1) {
      doc.setFillColor(ROW_ALT);
      doc.rect(M, y, W, rowH, "F");
    }
    doc.setDrawColor(BORDER);
    doc.setLineWidth(0.6);
    doc.line(M, y + rowH, M + W, y + rowH);

    doc.setFont("helvetica", row.seleccionado ? "bold" : "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(row.seleccionado ? ORANGE_DARK : DARK_TEXT);
    doc.text(
      `${row.plazo} años${row.seleccionado ? "  ·  plazo elegido" : ""}`,
      cols[0].x,
      y + 17
    );
    doc.text(fmt(row.pensionMensual), cols[1].x, y + 17, { align: "right" });
    doc.text(fmt(row.totalRetirado), cols[2].x, y + 17, { align: "right" });
    y += rowH;
  });
  y += 24;

  // CTA + WhatsApp
  const ctaH = 104;
  const ctaLeftW = W * 0.58;
  doc.setFillColor(CARD_BG);
  doc.setDrawColor(BORDER);
  doc.setLineWidth(0.8);
  doc.roundedRect(M, y, ctaLeftW, ctaH, 8, 8, "FD");
  doc.setFillColor(ORANGE);
  doc.rect(M, y + 10, 4, ctaH - 20, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(NAVY);
  doc.text(
    doc.splitTextToSize(
      "El siguiente paso es aterrizarlo a tu estrategia.",
      ctaLeftW - 36
    ),
    M + 18,
    y + 26
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(GRAY_TEXT);
  doc.text(
    doc.splitTextToSize(
      "La proyección sirve como punto de partida. En asesoría podemos revisar plazo, aportación y estructura para construir una alternativa adecuada a tu objetivo de retiro.",
      ctaLeftW - 36
    ),
    M + 18,
    y + 60
  );

  const waX = M + ctaLeftW + 12;
  const waW = W - ctaLeftW - 12;
  doc.setFillColor(NAVY);
  doc.roundedRect(waX, y, waW, ctaH, 8, 8, "F");
  doc.setFillColor("#25d366");
  doc.circle(waX + 26, y + 30, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor("#b9c6ea");
  doc.text("ASESORÍA PERSONALIZADA", waX + 42, y + 26, { charSpace: 0.5 });
  doc.setFontSize(11.5);
  doc.setTextColor("#ffffff");
  doc.text(
    doc.splitTextToSize("Solicitar asesoría por WhatsApp", waW - 32),
    waX + 16,
    y + 56
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor("#dbe2f5");
  doc.text("Toca aquí para escribirme directamente", waX + 16, y + 88);
  doc.link(waX, y, waW, ctaH, {
    url: buildWhatsAppUrl({
      nombre: d.nombre,
      edadActual: d.edadActual,
      aportacion: d.aportacion,
      aniosAportando: d.aniosAportando,
    }),
  });
  y += ctaH + 22;

  // Nota legal
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(GRAY_TEXT);
  doc.text(
    doc.splitTextToSize(
      `* Proyección ilustrativa basada en un supuesto de ${TASA_ACUMULACION}% anual para la fase de acumulación y un supuesto interno de ${TASA_RENTA.toFixed(
        1
      )}% anual para la fase de renta. El rendimiento real puede variar. No constituye garantía de rendimiento ni promesa de pago, y no sustituye la cotización oficial de la aseguradora.`,
      W
    ),
    M,
    y
  );

  pageFooter("+52 662 395 7332", 2);

  return doc;
}

function drawGrowthChart(
  doc: jsPDF,
  d: RetirementResults,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const s = serieCrecimiento(d);
  const pad = { l: 54, r: 10, t: 10, b: 26 };
  const cw = w - pad.l - pad.r;
  const ch = h - pad.t - pad.b;
  const maxY = Math.max(...s.patrimonio, 1);

  const xAt = (idx: number) =>
    x + pad.l + (idx / (s.edades.length - 1 || 1)) * cw;
  const yAt = (val: number) => y + pad.t + ch - (val / maxY) * ch;

  // Rejilla y etiquetas del eje Y
  doc.setDrawColor("#e3e8f0");
  doc.setLineWidth(0.6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(GRAY_TEXT);
  for (let j = 0; j <= 4; j++) {
    const gy = y + pad.t + ch - (ch * j) / 4;
    doc.line(x + pad.l, gy, x + w - pad.r, gy);
    const val = (maxY * j) / 4;
    const label =
      val >= 1_000_000
        ? `$${(val / 1_000_000).toFixed(1)}M`
        : `$${Math.round(val / 1000)}k`;
    doc.text(label, x + pad.l - 6, gy + 2.5, { align: "right" });
  }

  const plot = (data: number[], color: string) => {
    doc.setDrawColor(color);
    doc.setLineWidth(2.2);
    doc.setLineCap("round");
    doc.setLineJoin("round");
    for (let i = 1; i < data.length; i++) {
      doc.line(xAt(i - 1), yAt(data[i - 1]), xAt(i), yAt(data[i]));
    }
  };
  plot(s.aportado, BLUE);
  plot(s.patrimonio, ORANGE);

  // Punto final del patrimonio
  const last = s.patrimonio.length - 1;
  doc.setFillColor(ORANGE);
  doc.circle(xAt(last), yAt(s.patrimonio[last]), 3.2, "F");

  // Etiquetas del eje X
  doc.setTextColor(GRAY_TEXT);
  const mid = Math.floor(last / 2);
  [0, mid, last].forEach((idx) => {
    doc.text(`${s.edades[idx]} años`, xAt(idx), y + h - 6, {
      align: idx === 0 ? "left" : idx === last ? "right" : "center",
    });
  });
}
