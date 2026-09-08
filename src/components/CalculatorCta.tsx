import { motion } from "motion/react";
import { ArrowRight, Calculator, FileDown, Sparkles } from "lucide-react";
import { navigateTo } from "../router";

export function CalculatorCta() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{ backgroundColor: "#0d2a6e" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <Sparkles className="w-4 h-4 text-[#ffa400]" />
            <span className="text-sm text-white" style={{ fontWeight: 600 }}>
              Simulador
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl text-white"
            style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Calcula cuánto puedes acumular{" "}
            <span style={{ fontWeight: 800, color: "#ff6b0c" }}>
              para tu retiro
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-white/90 text-lg">
            Ingresa tu edad, cuánto puedes aportar al mes y a qué edad quieres
            retirarte. En segundos recibes tu proyección personalizada en PDF
            con tu capital estimado y tu pensión mensual.
          </p>

          <div
            className="flex items-center justify-center gap-4 text-white/80 text-sm"
            style={{ flexWrap: "wrap", fontWeight: 600 }}
          >
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#ffa400]" />
              Sin registro
            </span>
            <span className="flex items-center gap-2">
              <FileDown className="w-4 h-4 text-[#ffa400]" />
              PDF al instante
            </span>
          </div>

          <div className="pt-2">
            <a
              href="/calculadora"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/calculadora");
              }}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ff6b0c] to-[#ff4513] hover:from-[#ff4513] hover:to-[#ff6b0c] text-white px-10 py-5 text-lg shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50"
              style={{ fontWeight: 700 }}
            >
              Ir a la calculadora de retiro
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
