import { UserCheck, Building2, Award, Star, Shield, Heart } from "lucide-react";
import { motion } from "motion/react";

export function WhyChooseMe() {
  const reasons = [
    {
      icon: UserCheck,
      title: "Asesoría personalizada con seguimiento real",
      description: "Te acompaño en cada paso del proceso, desde asesoría personalizada, hasta el seguimiento posventa",
      gradient: "from-[#103595] to-[#1a4ab8]"
    },
    {
      icon: Building2,
      title: "Trabajo con las principales aseguradoras del país",
      description: "Acceso a múltiples opciones para encontrar la mejor solución para ti",
      gradient: "from-[#ff6b0c] to-[#ff4513]"
    },
    {
      icon: Award,
      title: "Experiencia protegiendo familias",
      description: "Gracias a tu confianza, trabajamos con más de 300 familias a quienes les apoyamos con una correcta administración de sus pólizas de seguro",
      gradient: "from-[#ffa400] to-[#ff8c00]"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Claridad desde el principio",
      description: "Te explico todo con calma y sin letras chiquitas. Quiero que te sientas seguro de lo que estás contratando."
    },
    {
      icon: Heart,
      title: "Comunicación cercana",
      description: "No importa si es una duda pequeña o grande, me puedes escribir. Estoy aquí para ayudarte."
    },
    {
      icon: Star,
      title: "Opciones pensadas para ti",
      description: "Trabajo con varias aseguradoras para encontrar lo que mejor se adapte a ti y a tu momento de vida."
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6b0c]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#103595]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b0c]/5 rounded-full mb-4">
            <Star className="w-4 h-4 text-[#ff6b0c]" />
            <span className="text-sm text-[#ff6b0c]" style={{ fontWeight: 600 }}>Beneficios</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl text-[#103595] max-w-3xl mx-auto" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
            Tu tranquilidad y seguridad son mi <span style={{ fontWeight: 800, color: '#ff6b0c' }}>prioridad</span>
          </h2>
        </div>

        {/* Main Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100 hover:border-[#103595]/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center space-y-5">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-[#103595] leading-tight" style={{ fontWeight: 700 }}>
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontWeight: 500 }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats/Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-[#103595] to-[#1a4ab8] rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b0c]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl text-white mb-3" style={{ fontWeight: 700 }}>
                Mi compromiso contigo
              </h3>
              <p className="text-white/90 text-lg" style={{ fontWeight: 500 }}>
                Valores que guían mi trabajo cada día
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-center space-y-4"
                  >
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <Icon className="w-8 h-8 text-[#ffa400]" />
                      </div>
                    </div>
                    <h4 className="text-xl text-white" style={{ fontWeight: 700 }}>
                      {item.title}
                    </h4>
                    <p className="text-white/90 leading-relaxed" style={{ fontWeight: 400 }}>
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg mb-6" style={{ fontWeight: 500 }}>
            ¿Listo para proteger tu futuro?
          </p>
          <a 
            href="https://calendly.com/waltervaldezconsultor/asesoria-personalizada-1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b0c] to-[#ff4513] text-white rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30"
            style={{ fontWeight: 600 }}
          >
            <UserCheck className="w-5 h-5" />
            <span>Comienza ahora</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
