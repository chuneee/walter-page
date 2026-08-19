import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Calculator,
  Download,
  MessageCircle,
  PiggyBank,
  Target,
  TrendingUp,
  Sparkles,
  Clock,
  Minus,
  Plus,
} from "lucide-react";
import { buildWhatsAppUrl } from "./whatsappLink";
import { trackFbCustomEvent, trackFbEvent } from "./fbPixel";

const monthlyOptions = [2000, 3000, 4000, 5000, 10000, 15000];
const yearsOptions = [10, 15, 20, 25];
const payoutAgeOptions = [60, 65] as const;

const ANNUAL_RETURN = 10;

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function SavingsCalculator() {
  const [currentAge, setCurrentAge] = useState<number | "">(30);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [savingYears, setSavingYears] = useState(15);
  const [payoutAge, setPayoutAge] =
    useState<(typeof payoutAgeOptions)[number]>(65);

  const {
    ageNow,
    endContribAge,
    adminYears,
    totalContribution,
    amountAtEndOfContrib,
    amountAtPayout,
    growthAtPayout,
    growthOnlyAdmin,
  } = useMemo(() => {
    const ageNowLocal = typeof currentAge === "number" ? currentAge : 20;

    // Edad al terminar aportaciones
    const endAge = ageNowLocal + savingYears;

    // Si el usuario elige una edad de entrega menor al fin de aportación,
    // forzamos entrega >= fin de aportación (para evitar meses negativos)
    const targetPayoutAge = Math.max(endAge, payoutAge);

    const monthlyRate = ANNUAL_RETURN / 12 / 100;

    // Fase A: aportaciones
    const contribMonths = Math.max(0, savingYears * 12);
    const contributions = monthlyContribution * contribMonths;

    // FV al terminar aportaciones (anualidad ordinaria)
    const fvAtEnd =
      contribMonths > 0
        ? monthlyContribution *
          ((Math.pow(1 + monthlyRate, contribMonths) - 1) / monthlyRate)
        : 0;

    // Fase B: administración (sin aportaciones)
    const adminMonths = Math.max(0, (targetPayoutAge - endAge) * 12);
    const fvAtPayout = fvAtEnd * Math.pow(1 + monthlyRate, adminMonths);

    const growthTotalAtPayout = fvAtPayout - contributions;
    const growthAdminOnly = fvAtPayout - fvAtEnd;

    return {
      ageNow: ageNowLocal,
      endContribAge: endAge,
      adminYears: targetPayoutAge - endAge,
      totalContribution: contributions,
      amountAtEndOfContrib: fvAtEnd,
      amountAtPayout: fvAtPayout,
      growthAtPayout: growthTotalAtPayout,
      growthOnlyAdmin: growthAdminOnly,
    };
  }, [currentAge, monthlyContribution, savingYears, payoutAge]);

  return (
    <section
      id="simulador"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ backgroundColor: "#0d2a6e" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center space-y-4 md:space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#ffa400]" />
            <span className="text-sm text-white" style={{ fontWeight: 600 }}>
              Simulador
            </span>
          </div>

          <h2
            className="mx-auto mb-4 max-w-3xl text-3xl md:text-4xl text-white"
            style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Calcula cuánto puedes acumular{" "}
            <span style={{ fontWeight: 800, color: "#ff6b0c" }}>
              invirtiendo cada mes
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/90 text-lg">
            Elige cuántos años quieres ahorrar y el monto mensual. Proyectamos
            tu ahorro con un rendimiento estimado del {ANNUAL_RETURN}% anual.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-6 lg:mt-8"
          style={{ alignItems: "start" }}
        >
          {/* ============================================ */}
          {/* CARD IZQUIERDA: Configuración */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-2xl"
          >
            <div className="relative space-y-7 md:space-y-8">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b0c] to-[#ff4513] text-white shadow-lg shadow-orange-500/25">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-gray-600"
                      style={{ fontWeight: 800 }}
                    >
                      Configura tu escenario
                    </p>
                    <h3
                      className="text-2xl md:text-3xl text-gray-900"
                      style={{ fontWeight: 800 }}
                    >
                      ¿Cuánto puedes aportar?
                    </h3>
                  </div>
                </div>
                <div
                  className="rounded-full border border-[#ff6b0c]/30 bg-[#ff6b0c]/10 px-4 py-2 text-sm text-[#ff6b0c]"
                  style={{ fontWeight: 700 }}
                >
                  Personaliza tu plan
                </div>
              </div>

              <div className="space-y-4">
                {/* Edad actual */}
                <div className="space-y-2.5">
                  <p
                    className="flex items-center gap-2 text-base text-gray-900"
                    style={{ fontWeight: 700 }}
                  >
                    <Clock className="h-4 w-4 text-[#ff6b0c]" />
                    Tu edad actual
                  </p>
                  <div className="flex items-center gap-3 max-w-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentAge(Math.max(20, (currentAge || 20) - 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-[#ff6b0c] transition-all duration-200 hover:border-[#ff6b0c] hover:bg-[#ff6b0c]/5 hover:scale-105"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="flex-1">
                      <input
                        type="number"
                        min="20"
                        max="55"
                        value={currentAge}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setCurrentAge("");
                          } else {
                            const numValue = parseInt(value);
                            if (!isNaN(numValue)) setCurrentAge(numValue);
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;
                          const n = parseInt(value);
                          if (value === "" || isNaN(n) || n < 20) {
                            setCurrentAge(20);
                          } else if (n > 55) {
                            setCurrentAge(55);
                          }
                        }}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-center text-xl text-gray-900 transition-all duration-200 focus:border-[#ff6b0c] focus:outline-none focus:ring-2 focus:ring-[#ff6b0c]/20"
                        style={{ fontWeight: 700 }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentAge(Math.min(55, (currentAge || 20) + 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-[#ff6b0c] transition-all duration-200 hover:border-[#ff6b0c] hover:bg-[#ff6b0c]/5 hover:scale-105"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Años de ahorro */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-gray-900">
                    <p
                      className="flex items-center gap-2 text-base"
                      style={{ fontWeight: 700 }}
                    >
                      <Target className="h-4 w-4 text-[#ff6b0c]" />
                      Años de ahorro
                    </p>
                    <span
                      className="rounded-full bg-[#ff6b0c]/10 px-3 py-1 text-sm text-[#ff6b0c]"
                      style={{ fontWeight: 600 }}
                    >
                      {savingYears} años
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                    {yearsOptions.map((years) => {
                      const isActive = years === savingYears;
                      return (
                        <button
                          key={years}
                          type="button"
                          onClick={() => setSavingYears(years)}
                          className={`relative overflow-hidden rounded-xl border px-3 py-2.5 text-center transition-all duration-200 ${
                            isActive
                              ? "border-[#ff6b0c] bg-[#ff6b0c] shadow-lg shadow-orange-500/30 scale-105"
                              : "border-gray-300 bg-white hover:border-[#ff6b0c]/60 hover:bg-[#ff6b0c]/5"
                          }`}
                        >
                          <div
                            className="relative z-10 text-xl"
                            style={{
                              fontWeight: 700,
                              color: isActive ? "white" : "#ff6b0c",
                            }}
                          >
                            {years}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Edad de entrega */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-gray-900">
                    <p
                      className="flex items-center gap-2 text-base"
                      style={{ fontWeight: 700 }}
                    >
                      <Target className="h-4 w-4 text-[#ff6b0c]" />
                      Edad de entrega
                    </p>
                    <span
                      className="rounded-full bg-[#ff6b0c]/10 px-3 py-1 text-sm text-[#ff6b0c]"
                      style={{ fontWeight: 600 }}
                    >
                      {payoutAge} años
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-w-xs">
                    {payoutAgeOptions.map((age) => {
                      const isActive = age === payoutAge;
                      return (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setPayoutAge(age)}
                          className={`relative overflow-hidden rounded-xl border px-3 py-2.5 text-center transition-all duration-200 ${
                            isActive
                              ? "border-[#ff6b0c] bg-[#ff6b0c] shadow-lg shadow-orange-500/30 scale-105"
                              : "border-gray-300 bg-white hover:border-[#ff6b0c]/60 hover:bg-[#ff6b0c]/5"
                          }`}
                        >
                          <div
                            className="text-xl"
                            style={{
                              fontWeight: 700,
                              color: isActive ? "white" : "#ff6b0c",
                            }}
                          >
                            {age}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p
                    className="text-xs text-gray-600 leading-relaxed"
                    style={{ fontWeight: 600 }}
                  >
                    Ahorras hasta los {endContribAge} y la aseguradora
                    administra {adminYears} años más.
                  </p>
                </div>
              </div>

              {/* Aporte mensual */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-900">
                  <p
                    className="flex items-center gap-2 text-base"
                    style={{ fontWeight: 700 }}
                  >
                    <PiggyBank className="h-4 w-4 text-[#ff6b0c]" />
                    Aporte mensual
                  </p>
                  <span
                    className="text-xs text-gray-600"
                    style={{ fontWeight: 600 }}
                  >
                    Selecciona una opción
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {monthlyOptions.map((amount) => {
                    const isActive = amount === monthlyContribution;
                    return (
                      <button
                        key={amount}
                        onClick={() => setMonthlyContribution(amount)}
                        className={`relative overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                          isActive
                            ? "border-[#ff6b0c] bg-[#ff6b0c] shadow-lg shadow-orange-500/30 scale-105"
                            : "border-gray-300 bg-white hover:border-[#ff6b0c]/60 hover:bg-[#ff6b0c]/5"
                        }`}
                        style={{
                          fontWeight: 700,
                          color: isActive ? "white" : "#ff6b0c",
                        }}
                      >
                        <div className="relative z-10 text-base">
                          {currencyFormatter.format(amount)}
                        </div>
                        <div
                          className={`relative z-10 mt-0.5 text-xs ${
                            isActive ? "text-white/90" : "text-gray-600"
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          al mes
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nota informativa */}
              <div
                className="rounded-xl border border-[#ff6b0c]/20 bg-[#ff6b0c]/5 p-4 text-sm text-gray-700"
                style={{ fontWeight: 600 }}
              >
                Proyección calculada con un supuesto de rendimiento anual del{" "}
                {ANNUAL_RETURN}%.
              </div>
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* CARD DERECHA: Resultados */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-2xl flex flex-col"
          >
            <div className="relative space-y-5 md:space-y-6 flex-1 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b0c] to-[#ff4513] text-white shadow-lg shadow-orange-500/25">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-gray-600"
                      style={{ fontWeight: 800 }}
                    >
                      Proyección estimada
                    </p>
                    <h3
                      className="text-2xl md:text-3xl text-gray-900"
                      style={{ fontWeight: 800 }}
                    >
                      A los {payoutAge} años
                    </h3>
                  </div>
                </div>
                <div
                  className="rounded-full border border-[#ff6b0c]/30 bg-[#ff6b0c]/10 px-4 py-2 text-sm text-[#ff6b0c]"
                  style={{ fontWeight: 700 }}
                >
                  Crecimiento compuesto al {ANNUAL_RETURN}% anual
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Plazo */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
                  <div
                    className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[#103595]"
                    style={{ fontWeight: 800 }}
                  >
                    <Target className="h-4 w-4 text-[#103595]" />
                    Aportas durante
                  </div>
                  <p
                    className="text-3xl text-gray-900"
                    style={{ fontWeight: 900 }}
                  >
                    {savingYears}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontWeight: 600 }}
                  >
                    años (hasta los {endContribAge})
                  </p>
                </div>

                {/* Aporte total */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
                  <div
                    className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[#103595]"
                    style={{ fontWeight: 800 }}
                  >
                    <PiggyBank className="h-4 w-4 text-[#103595]" />
                    Aporte total
                  </div>
                  <p
                    className="text-3xl text-gray-900"
                    style={{ fontWeight: 900 }}
                  >
                    {currencyFormatter.format(totalContribution)}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontWeight: 600 }}
                  >
                    Tus aportaciones
                  </p>
                </div>

                {/* Rendimiento total (hasta edad entrega) */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
                  <div
                    className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[#103595]"
                    style={{ fontWeight: 800 }}
                  >
                    <TrendingUp className="h-4 w-4 text-[#103595]" />
                    Rendimiento total
                  </div>
                  <p
                    className="text-3xl text-gray-900"
                    style={{ fontWeight: 900 }}
                  >
                    {currencyFormatter.format(growthAtPayout)}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontWeight: 600 }}
                  >
                    A los {payoutAge} años recibirás
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  trackFbCustomEvent("DescargarSimulacionPDF", {
                    edad_actual: ageNow,
                    anos_ahorro: savingYears,
                    aporte_mensual: monthlyContribution,
                    edad_entrega: payoutAge,
                  });
                  const { generateSavingsReportPdf } = await import(
                    "./savingsReportPdf"
                  );
                  generateSavingsReportPdf({
                    currentAge: ageNow,
                    savingYears,
                    monthlyContribution,
                    payoutAge,
                    endContribAge,
                    adminYears,
                    totalContribution,
                    amountAtEndOfContrib,
                    amountAtPayout,
                    growthAtPayout,
                    annualReturn: ANNUAL_RETURN,
                  });
                }}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#ff6b0c] to-[#ff4513] px-6 py-5 text-lg text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/30"
                style={{ fontWeight: 700 }}
              >
                <Download className="h-6 w-6" />
                Descargar simulación en PDF
              </button>

              <a
                href={buildWhatsAppUrl({
                  currentAge: ageNow,
                  monthlyContribution,
                  savingYears,
                  endContribAge,
                  payoutAge,
                  totalContribution,
                  growthAtPayout,
                  amountAtPayout,
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackFbEvent("Lead", {
                    content_name: "Asesoría por WhatsApp - Simulador",
                  })
                }
                className="flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-5 text-lg text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  fontWeight: 700,
                  backgroundColor: "#25d366",
                  boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.35)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1fb958")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25d366")
                }
              >
                <MessageCircle className="h-6 w-6" />
                Pedir asesoría por WhatsApp
              </a>

              <p className="text-xs text-gray-500" style={{ fontWeight: 600 }}>
                * Esta es una proyección estimada. El rendimiento real puede
                variar.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
