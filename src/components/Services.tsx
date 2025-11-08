import {
  Briefcase,
  PiggyBank,
  Heart,
  Car,
  PawPrint,
  CheckCircle2,
  TrendingUp,
  Home,
  GraduationCap,
  LineChart,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

export function Services() {
  const services = [
    {
      icon: Heart,
      title: "Gastos Médicos Mayores",
      description: "Tu salud, nuestra prioridad",
      features: [
        "Cobertura nacional e internacional",
        "Hospitalización, cirugías, maternidad y emergencias",
        "Acompañamiento personalizado en siniestros",
      ],
      gradient: "from-[#103595] to-[#1a4ab8]",
    },
    {
      icon: TrendingUp,
      title: "Fondos Indexados",
      description: "Aprende a invertir en el S&P500 y Nasdaq 100",
      features: [
        "Invierte en empresas como Nvidia, Apple, Tesla o Google",
        "Más de 19 portafolios de inversión",
        "Pasa de “adivinar” a invertir como lo hace la gente que gana en serio",
      ],
      gradient: "from-[#ff6b0c] to-[#ff4513]",
    },
    {
      icon: PiggyBank,
      title: "Planes Personales de Retiro (PPR)",
      description: "Libertad financiera para tu retiro",
      features: [
        "Deducibles de impuestos y con beneficios fiscales",
        "Planificación a largo plazo para un retiro con libertad financiera",
      ],
      gradient: "from-[#ffa400] to-[#ff8c00]",
    },
    {
      icon: Shield,
      title: "Seguros de Vida",
      description: "Protección y patrimonio para tu futuro",
      features: [
        "Planes personalizados para protección",
        "Planes personalizados para crear tu patrimonio",
        "Enfocados en metas de corto, mediano y largo plazo",
      ],
      gradient: "from-[#103595] to-[#0d2a6e]",
    },
    {
      icon: GraduationCap,
      title: "Planes Educativos",
      description:
        "Garantiza que tus hijos o nietos estudien en las mejores universidades",
      features: [
        "Oportunidad de estudiar en cualquier universidad",
        "Fondo 100% garantizado",
      ],
      gradient: "from-[#ff4513] to-[#ff6b0c]",
    },
    {
      icon: Car,
      iconAlt: Home,
      iconAlt2: PawPrint,
      title: "Seguros de Auto, Hogar y Mascotas",
      description: "Protege lo que más valoras",
      features: [
        "Protección integral ante robo, accidentes o daños",
        "Asistencia vial, legal y médica",
        "Cobertura para mascotas: accidentes, enfermedades y emergencias veterinarias",
      ],
      gradient: "from-[#103595] to-[#1a4ab8]",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#103595]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#ff6b0c]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#103595]/5 rounded-full mb-4">
            <Briefcase className="w-4 h-4 text-[#103595]" />
            <span className="text-sm text-[#103595]">
              Productos y Servicios
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl text-[#103595]"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Soluciones a{" "}
            <span style={{ fontWeight: 800, color: "#ff6b0c" }}>tu medida</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Protección integral para cada etapa de tu vida
          </p>
        </div>

        {/* Services Grid */}
        {/* Primera fila - 3 servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {services.slice(0, 3).map((service, index) => {
            const Icon = service.icon;
            const IconAlt = service.iconAlt;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-[#103595]/20 relative overflow-hidden"
              >
                {/* Gradient accent on hover */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {IconAlt && (
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} opacity-20 flex items-center justify-center`}
                      >
                        <IconAlt className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Title and description */}
                  <div className="space-y-2">
                    <h3
                      className="text-[#103595] leading-tight"
                      style={{ fontWeight: 700 }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-gray-500 text-sm"
                      style={{ fontWeight: 500 }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#ff6b0c] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Segunda fila - 3 servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(3).map((service, index) => {
            const Icon = service.icon;
            const IconAlt = service.iconAlt;
            const IconAlt2 = service.iconAlt2;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (index + 3) * 0.1,
                }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-[#103595]/20 relative overflow-hidden"
              >
                {/* Gradient accent on hover */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {IconAlt && (
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconAlt className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {IconAlt2 && (
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconAlt2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Title and description */}
                  <div className="space-y-2">
                    <h3
                      className="text-[#103595] leading-tight"
                      style={{ fontWeight: 700 }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-gray-500 text-sm"
                      style={{ fontWeight: 500 }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#ff6b0c] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            ¿No sabes cuál es el mejor plan para ti?
          </p>
          <a
            href="https://calendly.com/waltervaldezconsultor/asesoria-personalizada-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#103595] to-[#1a4ab8] text-white rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Briefcase className="w-5 h-5" />
            <span>Agenda una asesoría gratuita</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
