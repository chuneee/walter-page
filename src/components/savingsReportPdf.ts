import { jsPDF } from "jspdf";
import logoColor from "../assets/0f2bacd61666436b2144d7fb5694974b05d285a1.png";
import { buildWhatsAppUrl } from "./whatsappLink";

export interface SavingsReportData {
  currentAge: number;
  savingYears: number;
  monthlyContribution: number;
  payoutAge: number;
  endContribAge: number;
  adminYears: number;
  totalContribution: number;
  amountAtEndOfContrib: number;
  amountAtPayout: number;
  growthAtPayout: number;
  annualReturn: number;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

// Paleta del reporte
const NAVY = "#0d2a6e";
const BLUE = "#103595";
const GOLD = "#d9a520";
const GRAY_TEXT = "#5a6472";
const DARK_TEXT = "#1f2937";
const BORDER = "#d9dde6";
const ROW_ALT = "#f4f6fa";
const GREEN_BG = "#eaf6ef";
const GREEN_BORDER = "#bfe3cd";
const GREEN_TEXT = "#146c43";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function generateSavingsReportPdf(data: SavingsReportData) {
  const doc = await buildSavingsReportPdf(data);
  const today = new Date().toISOString().slice(0, 10);
  doc.save(`simulador-de-ahorro-${today}.pdf`);
}

export async function buildSavingsReportPdf(
  data: SavingsReportData
): Promise<jsPDF> {
  const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const M = 46;
  const W = pageW - M * 2;
  let y = 52;

  // ===== Encabezado: título + logo =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(NAVY);
  doc.text("Simulador de ahorro", M, y + 14);

  const generatedAt = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(GRAY_TEXT);
  doc.text(`Proyección personalizada de retiro · ${generatedAt}`, M, y + 30);

  try {
    const logo = await loadImage(logoColor);
    const logoH = 32;
    const logoW = (logo.naturalWidth / logo.naturalHeight) * logoH;
    doc.addImage(logo, "PNG", M + W - logoW, y - 2, logoW, logoH);
  } catch {
    // Si el logo no carga, el PDF se genera sin él
  }

  doc.setDrawColor(GOLD);
  doc.setLineWidth(1.6);
  doc.line(M, y + 44, M + W, y + 44);
  y += 68;

  // ===== Tarjeta azul: capital proyectado =====
  const cardH = 104;
  doc.setFillColor(NAVY);
  doc.roundedRect(M, y, W, cardH, 8, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor("#c8d3ee");
  doc.text("CAPITAL PROYECTADO PARA RETIRO", M + 22, y + 26, {
    charSpace: 1,
  });

  doc.setFontSize(27);
  doc.setTextColor("#ffffff");
  doc.text(currency.format(data.amountAtPayout), M + 22, y + 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor("#dbe2f5");
  const cardNote = doc.splitTextToSize(
    `Capital proyectado a los ${data.payoutAge} años bajo escenario ilustrativo. Aportas hasta los ${data.endContribAge} años y la aseguradora administra ${data.adminYears} años más. No constituye garantía de rendimiento ni promesa de pago.`,
    W - 44
  );
  doc.text(cardNote, M + 22, y + 76);
  y += cardH + 30;

  // ===== Helper: título de sección con línea dorada =====
  const sectionTitle = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13.5);
    doc.setTextColor(BLUE);
    doc.text(title, M, y);
    doc.setDrawColor(GOLD);
    doc.setLineWidth(1.6);
    doc.line(M, y + 7, M + W, y + 7);
    y += 24;
  };

  // ===== Momentos clave de la simulación =====
  sectionTitle("Momentos clave de la simulación");

  const cols = [
    { label: "MOMENTO", x: M + 12, w: W * 0.55 },
    { label: "EDAD", x: M + W * 0.57 + 12, w: W * 0.16 },
    { label: "MONTO ESTIMADO", x: M + W * 0.73 + 12, w: W * 0.27 },
  ];

  const headH = 21;
  doc.setFillColor(NAVY);
  doc.rect(M, y, W, headH, "F");
  doc.setFontSize(7.5);
  doc.setTextColor("#ffffff");
  cols.forEach((c) => doc.text(c.label, c.x, y + 14, { charSpace: 0.8 }));
  y += headH;

  const momentRows: [string, string, string][] = [
    ["Inicio del plan", `${data.currentAge} años`, currency.format(0)],
    [
      "Fin de aportaciones",
      `${data.endContribAge} años`,
      currency.format(data.amountAtEndOfContrib),
    ],
    [
      `Proyección a los ${data.payoutAge} años`,
      `${data.payoutAge} años`,
      currency.format(data.amountAtPayout),
    ],
  ];

  const rowH = 24;
  momentRows.forEach((row, i) => {
    if (i % 2 === 1) {
      doc.setFillColor(ROW_ALT);
      doc.rect(M, y, W, rowH, "F");
    }
    doc.setDrawColor(BORDER);
    doc.setLineWidth(0.6);
    doc.line(M, y + rowH, M + W, y + rowH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(DARK_TEXT);
    row.forEach((cell, ci) => doc.text(cell, cols[ci].x, y + 15.5));
    y += rowH;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(GRAY_TEXT);
  const tableNote = doc.splitTextToSize(
    `Momentos mostrados conforme a edad actual, plazo de aportación y corte ilustrativo a los ${data.payoutAge} años. Montos sujetos a condiciones del producto, permanencia, supuestos de rendimiento y normativa aplicable.`,
    W
  );
  doc.text(tableNote, M, y + 14);
  y += 14 + tableNote.length * 10 + 18;

  // ===== Resumen ejecutivo =====
  sectionTitle("Resumen ejecutivo");

  const cards = [
    {
      label: "APORTACIÓN MENSUAL INICIAL",
      value: currency.format(data.monthlyContribution),
      green: false,
    },
    {
      label: "PLAZO DE APORTACIÓN",
      value: `${data.savingYears} años`,
      green: false,
    },
    {
      label: "TOTAL APORTADO ESTIMADO",
      value: currency.format(data.totalContribution),
      green: false,
    },
    {
      label: "RENDIMIENTO ESTIMADO",
      value: currency.format(data.growthAtPayout),
      green: true,
    },
  ];

  const gap = 10;
  const cardW = (W - gap * 3) / 4;
  const summaryH = 58;
  cards.forEach((c, i) => {
    const x = M + i * (cardW + gap);
    doc.setFillColor(c.green ? GREEN_BG : "#ffffff");
    doc.setDrawColor(c.green ? GREEN_BORDER : BORDER);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, y, cardW, summaryH, 5, 5, "FD");
    // Barra de acento a la izquierda
    doc.setFillColor(c.green ? GREEN_TEXT : BLUE);
    doc.roundedRect(x, y + 10, 3, summaryH - 20, 1.5, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(c.green ? GREEN_TEXT : GRAY_TEXT);
    doc.text(
      doc.splitTextToSize(c.label, cardW - 22),
      x + 12,
      y + 18,
      { charSpace: 0.4 }
    );

    doc.setFontSize(13);
    doc.setTextColor(c.green ? GREEN_TEXT : NAVY);
    doc.text(c.value, x + 12, y + 44);
  });
  y += summaryH + 30;

  // ===== Escenario simulado =====
  sectionTitle("Escenario simulado");

  const scenarioRows: [string, string][] = [
    ["Edad actual", `${data.currentAge} años`],
    ["Años que planea aportar", `${data.savingYears} años`],
    ["Aportación mensual", currency.format(data.monthlyContribution)],
    ["Fin de aportaciones", `${data.endContribAge} años`],
    ["Edad de entrega", `${data.payoutAge} años`],
    ["Años de administración", `${data.adminYears} años`],
    [
      "Rendimiento nominal usado",
      `${data.annualReturn.toFixed(1)}% nominal anual`,
    ],
    ["Capital proyectado", currency.format(data.amountAtPayout)],
  ];

  const scenarioRowH = 22;
  scenarioRows.forEach(([label, value], i) => {
    if (i % 2 === 1) {
      doc.setFillColor(ROW_ALT);
      doc.rect(M, y, W, scenarioRowH, "F");
    }
    doc.setDrawColor(BORDER);
    doc.setLineWidth(0.6);
    doc.line(M, y + scenarioRowH, M + W, y + scenarioRowH);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(DARK_TEXT);
    doc.text(label, M + 12, y + 15);

    doc.setFont("helvetica", "normal");
    doc.text(value, M + W * 0.47, y + 15);
    y += scenarioRowH;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(GRAY_TEXT);
  doc.text(
    "* Proyección ilustrativa. El rendimiento real puede variar. No constituye garantía de rendimiento ni promesa de pago.",
    M,
    y + 16
  );
  y += 34;

  // ===== Botón: pedir asesoría por WhatsApp =====
  const waUrl = buildWhatsAppUrl({
    currentAge: data.currentAge,
    monthlyContribution: data.monthlyContribution,
    savingYears: data.savingYears,
    endContribAge: data.endContribAge,
    payoutAge: data.payoutAge,
    totalContribution: data.totalContribution,
    growthAtPayout: data.growthAtPayout,
    amountAtPayout: data.amountAtPayout,
  });

  const btnW = 280;
  const btnH = 38;
  const btnX = M + (W - btnW) / 2;
  doc.setFillColor("#25d366");
  doc.roundedRect(btnX, y, btnW, btnH, 19, 19, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor("#ffffff");
  doc.text("Pedir asesoría por WhatsApp", btnX + btnW / 2, y + 24, {
    align: "center",
  });
  doc.link(btnX, y, btnW, btnH, { url: waUrl });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(GRAY_TEXT);
  doc.text(
    "Toca el botón para escribirme con tu simulación · +52 662 395 7332",
    M + W / 2,
    y + btnH + 14,
    { align: "center" }
  );

  return doc;
}
