import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Clock,
  Eye,
  FileDown,
  MessageCircle,
  PiggyBank,
  Share2,
  Sparkles,
  Target,
  User,
  Wallet,
} from "lucide-react";
import type { GeneratedPdf } from "./retirementReportPdf";
import { toast } from "sonner@2.0.3";
import logoColor from "../assets/0f2bacd61666436b2144d7fb5694974b05d285a1.png";
import { navigateTo } from "../router";
import { Footer } from "./Footer";
import {
  calcularRetiro,
  formatoMoneda,
  LIMITES,
  maxAniosAportando,
  TASA_ACUMULACION,
  TASA_RENTA,
} from "./retirementMath";
import { buildWhatsAppUrl } from "./whatsappLink";
import { trackFbCustomEvent, trackFbEvent } from "./fbPixel";

const ORANGE = "#ff6b0c";

type PdfModule = typeof import("./retirementReportPdf");

function isMobileDevice() {
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent))
  );
}

interface SliderFieldProps {
  icon: React.ReactNode;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
}

function SliderField({
  icon,
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
}: SliderFieldProps) {
  return (
    <div>
      <div className="wv-field-head">
        <p className="wv-field-label">
          {icon}
          {label}
        </p>
        <span className="wv-pill">{valueLabel}</span>
      </div>
      <input
        type="range"
        className="wv-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="wv-range-scale">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

interface CardHeadProps {
  icon: React.ReactNode;
  kicker: string;
  title: string;
}

function CardHead({ icon, kicker, title }: CardHeadProps) {
  return (
    <div className="wv-card-head">
      <div className="wv-card-icon">{icon}</div>
      <div>
        <p className="wv-card-kicker">{kicker}</p>
        <h2 className="wv-card-title">{title}</h2>
      </div>
    </div>
  );
}

export function RetirementCalculator() {
  const [nombre, setNombre] = useState("");
  const [edadActual, setEdadActual] = useState(30);
  const [aportacion, setAportacion] = useState(5000);
  const [aniosAportando, setAniosAportando] = useState(15);
  const [edadEntrega, setEdadEntrega] = useState<number>(65);
  const [aniosRenta, setAniosRenta] = useState(20);
  const [generando, setGenerando] = useState(false);
  const [listo, setListo] = useState(false);
  const [pdf, setPdf] = useState<GeneratedPdf | null>(null);
  const [movil] = useState(isMobileDevice);
  const pdfModule = useRef<PdfModule | null>(null);
  const resultadoRef = useRef<HTMLDivElement>(null);

  // Precarga el generador del PDF para que el botón responda al instante
  useEffect(() => {
    import("./retirementReportPdf").then((m) => {
      pdfModule.current = m;
    });
  }, []);

  // Libera la URL temporal del PDF anterior
  useEffect(() => {
    return () => {
      if (pdf) URL.revokeObjectURL(pdf.url);
    };
  }, [pdf]);

  // La edad de entrega tiene que dejar al menos 10 años de aportación
  const edadEntregaEfectiva =
    edadActual + LIMITES.aniosAportando.min > edadEntrega ? 65 : edadEntrega;
  const maxPlazo = maxAniosAportando(edadActual, edadEntregaEfectiva);
  const aniosAportandoEfectivos = Math.min(aniosAportando, maxPlazo);
  const edadFinAportaciones = edadActual + aniosAportandoEfectivos;
  const aniosExtra = edadEntregaEfectiva - edadFinAportaciones;

  const cambiar = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setListo(false);
  };

  const inputs = {
    nombre: nombre.trim(),
    edadActual,
    aportacion,
    aniosAportando: aniosAportandoEfectivos,
    edadEntrega: edadEntregaEfectiva,
    aniosRenta,
  };

  const calcular = async () => {
    if (!nombre.trim()) {
      toast.error("Escribe tu nombre", {
        description: "Lo usamos para personalizar tu proyección en PDF.",
      });
      document.getElementById("nombreCliente")?.focus();
      return;
    }

    // En celular el PDF se abre en otra pestaña. Safari solo permite abrirla
    // en el instante del toque, así que se abre vacía y se carga después.
    let pestana: Window | null = null;
    if (movil) {
      pestana = window.open("", "_blank");
      pestana?.document.write(
        '<p style="font-family:sans-serif;padding:24px;color:#0d2a6e">Generando tu proyección…</p>'
      );
    }

    setGenerando(true);
    try {
      const resultados = calcularRetiro(inputs);
      trackFbCustomEvent("DescargarSimulacionPDF", {
        edad_actual: edadActual,
        anos_ahorro: aniosAportandoEfectivos,
        aporte_mensual: aportacion,
        edad_entrega: edadEntregaEfectiva,
        anos_renta: aniosRenta,
      });
      const mod =
        pdfModule.current ?? (await import("./retirementReportPdf"));
      pdfModule.current = mod;
      const generado = await mod.createRetirementReportPdf(resultados);
      if (movil) {
        if (pestana) pestana.location.href = generado.url;
      } else {
        mod.downloadPdf(generado);
      }
      setPdf(generado);
      setListo(true);
      toast.success("¡Tu proyección está lista!", {
        description: movil
          ? pestana
            ? "Se abrió en una pestaña nueva. También puedes verla o compartirla aquí abajo."
            : "Ábrela o compártela con los botones de abajo."
          : "El PDF se está descargando en tu dispositivo.",
      });
      setTimeout(() => {
        resultadoRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      pestana?.close();
      console.error("Error al generar el PDF:", error);
      toast.error("No se pudo generar el PDF", {
        description: "Intenta de nuevo o escríbeme por WhatsApp.",
      });
    } finally {
      setGenerando(false);
    }
  };

  const compartir = async () => {
    if (!pdf || !pdfModule.current) return;
    const r = await pdfModule.current.sharePdf(pdf);
    if (r === "failed") {
      pdfModule.current.downloadPdf(pdf);
      toast.info("Tu PDF se está descargando", {
        description: "Tu navegador no permitió abrir el menú de compartir.",
      });
    }
  };

  const puedeCompartir =
    movil && pdf !== null && pdfModule.current?.canSharePdf(pdf) === true;

  const whatsappUrl = buildWhatsAppUrl({
    nombre,
    edadActual,
    aportacion,
    aniosAportando: aniosAportandoEfectivos,
  });

  const irAlInicio = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Barra superior */}
      <div className="wv-topbar">
        <div className="wv-topbar-inner">
          <a href="/" onClick={irAlInicio} aria-label="Ir al inicio">
            <img
              src={logoColor}
              alt="Walter Valdez Logo"
              className="h-10 md:h-12 w-auto"
            />
          </a>
          <a href="/" onClick={irAlInicio} className="wv-topbar-back">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>
        </div>
      </div>

      {/* Encabezado */}
      <section className="wv-hero">
        <div className="wv-hero-inner">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Sparkles className="w-4 h-4 text-[#ffa400]" />
            <span className="text-sm text-white" style={{ fontWeight: 600 }}>
              Simulador
            </span>
          </div>
          <h1>
            Calculadora de{" "}
            <span style={{ fontWeight: 800, color: ORANGE }}>
              retiro y pensión privada
            </span>
          </h1>
          <p>
            Llena tus datos, presiona <strong>Calcular</strong> y recibe tu
            proyección personalizada en PDF.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <main className="wv-main">
        <div className="wv-container wv-stack">
          {/* Datos del cliente */}
          <div className="wv-card">
            <CardHead
              icon={<User className="h-6 w-6" />}
              kicker="Paso 1"
              title="Datos del cliente"
            />
            <div>
              <div className="wv-field-head">
                <label htmlFor="nombreCliente" className="wv-field-label">
                  Nombre completo
                </label>
              </div>
              <input
                id="nombreCliente"
                type="text"
                className="wv-input"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setListo(false);
                }}
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
              />
            </div>
          </div>

          {/* Fase de acumulación */}
          <div className="wv-card">
            <CardHead
              icon={<PiggyBank className="h-6 w-6" />}
              kicker="Paso 2 · Acumulación"
              title="Mientras aportas"
            />
            <div className="wv-fields">
              <SliderField
                icon={<Clock className="h-4 w-4 text-[#ff6b0c]" />}
                label="Edad actual"
                valueLabel={`${edadActual} años`}
                min={LIMITES.edadActual.min}
                max={LIMITES.edadActual.max}
                step={LIMITES.edadActual.step}
                value={edadActual}
                onChange={cambiar(setEdadActual)}
                minLabel={`${LIMITES.edadActual.min} años`}
                maxLabel={`${LIMITES.edadActual.max} años`}
              />

              <SliderField
                icon={<Wallet className="h-4 w-4 text-[#ff6b0c]" />}
                label="Aportación mensual"
                valueLabel={formatoMoneda.format(aportacion)}
                min={LIMITES.aportacion.min}
                max={LIMITES.aportacion.max}
                step={LIMITES.aportacion.step}
                value={aportacion}
                onChange={cambiar(setAportacion)}
                minLabel={formatoMoneda.format(LIMITES.aportacion.min)}
                maxLabel={formatoMoneda.format(LIMITES.aportacion.max)}
              />

              <SliderField
                icon={<Target className="h-4 w-4 text-[#ff6b0c]" />}
                label="Años que planeas aportar"
                valueLabel={`${aniosAportandoEfectivos} años`}
                min={LIMITES.aniosAportando.min}
                max={maxPlazo}
                step={LIMITES.aniosAportando.step}
                value={aniosAportandoEfectivos}
                onChange={cambiar(setAniosAportando)}
                minLabel={`${LIMITES.aniosAportando.min} años`}
                maxLabel={`${maxPlazo} años`}
              />

              <div>
                <div className="wv-field-head">
                  <p className="wv-field-label">
                    <Target className="h-4 w-4 text-[#ff6b0c]" />
                    Edad de entrega (retiro)
                  </p>
                  <span className="wv-pill">{edadEntregaEfectiva} años</span>
                </div>
                <div className="wv-segment">
                  {LIMITES.edadesEntrega.map((edad) => {
                    const activo = edad === edadEntregaEfectiva;
                    const deshabilitado =
                      edadActual + LIMITES.aniosAportando.min > edad;
                    return (
                      <button
                        key={edad}
                        type="button"
                        disabled={deshabilitado}
                        className={activo ? "active" : ""}
                        onClick={() => cambiar(setEdadEntrega)(edad)}
                      >
                        <span className="big">{edad}</span>
                        <span className="small">años</span>
                      </button>
                    );
                  })}
                </div>
                <p className="wv-hint">
                  Aportas hasta los {edadFinAportaciones} años
                  {aniosExtra > 0
                    ? ` y tu fondo sigue creciendo ${aniosExtra} años más hasta la entrega.`
                    : "."}
                </p>
              </div>
            </div>
          </div>

          {/* Fase de renta */}
          <div className="wv-card">
            <CardHead
              icon={<Calculator className="h-6 w-6" />}
              kicker="Paso 3 · Renta"
              title="Cuando te retires"
            />
            <div className="wv-fields">
              <SliderField
                icon={<Clock className="h-4 w-4 text-[#ff6b0c]" />}
                label="Años de administración"
                valueLabel={`${aniosRenta} años`}
                min={LIMITES.aniosRenta.min}
                max={LIMITES.aniosRenta.max}
                step={LIMITES.aniosRenta.step}
                value={aniosRenta}
                onChange={cambiar(setAniosRenta)}
                minLabel={`${LIMITES.aniosRenta.min} años`}
                maxLabel={`${LIMITES.aniosRenta.max} años`}
              />
            </div>
            <div className="wv-note">
              Proyección con un supuesto de rendimiento del {TASA_ACUMULACION}%
              anual mientras aportas y {TASA_RENTA}% anual durante la fase de
              renta. Tus resultados completos vienen en el PDF.
            </div>
          </div>

          {/* Acción */}
          <button
            type="button"
            onClick={calcular}
            disabled={generando}
            className="wv-cta wv-cta-orange"
          >
            <FileDown className="h-6 w-6" />
            {generando
              ? "Generando tu proyección..."
              : "Calcular y descargar mi PDF"}
          </button>

          {listo && pdf && (
            <div ref={resultadoRef} className="wv-card wv-success">
              <div className="wv-success-icon">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3>¡Listo, {nombre.trim().split(" ")[0]}!</h3>
              <p>
                {movil
                  ? "Tu proyección en PDF está lista. Ábrela para verla, guárdala o compártela, y si quieres que la revisemos juntos, escríbeme por WhatsApp."
                  : "Tu proyección se descargó en PDF. Si quieres que la revisemos juntos, escríbeme por WhatsApp."}
              </p>
              <div className="wv-actions">
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wv-cta wv-cta-navy"
                >
                  <Eye className="h-6 w-6" />
                  Ver mi PDF
                </a>
                {puedeCompartir && (
                  <button
                    type="button"
                    onClick={compartir}
                    className="wv-cta wv-cta-outline"
                  >
                    <Share2 className="h-6 w-6" />
                    Compartir o guardar
                  </button>
                )}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wv-cta wv-cta-whatsapp"
                  onClick={() =>
                    trackFbEvent("Lead", {
                      content_name: "Asesoría por WhatsApp - Calculadora",
                    })
                  }
                >
                  <MessageCircle className="h-6 w-6" />
                  Pedir asesoría por WhatsApp
                </a>
              </div>
            </div>
          )}

          <p className="wv-footnote">
            * Proyección ilustrativa. El rendimiento real puede variar y no
            sustituye la cotización oficial de la aseguradora.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
