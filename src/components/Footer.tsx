import { Instagram, Mail, MapPin, Phone, Shield } from "lucide-react";
import { motion } from "motion/react";
import logo from "figma:asset/b78ac8ff2ad6bc40cbd2d4ea1f4f26ef70ca0e9b.png";

export function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/waltervaldez.consultor",
      label: "Instagram"
    },
    {
      icon: Mail,
      href: "mailto:waltervaldez.consultor@gmail.com",
      label: "Email"
    },
    {
      icon: Phone,
      href: "https://wa.me/526228559245",
      label: "WhatsApp"
    }
  ];

  const quickLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Por Qué Elegirme", href: "#beneficios" },
    { label: "Contacto", href: "#contacto" }
  ];

  return (
    <footer className="bg-[#0a1f5c] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b0c]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffa400]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <img src={logo} alt="Walter Valdez Logo" className="h-14 w-auto" />
            <p className="text-white/80 text-sm leading-relaxed">
              Asesoría profesional en seguros y protección financiera. Tu tranquilidad es mi prioridad.
            </p>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#ffa400]" />
              <span className="text-white/70 text-sm">Protegiendo tu futuro</span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-white text-lg" style={{ fontWeight: 700 }}>Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffa400] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ffa400] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-white text-lg" style={{ fontWeight: 700 }}>Conecta Conmigo</h3>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:waltervaldez.consultor@gmail.com"
                className="text-white/70 hover:text-[#ffa400] transition-colors duration-300 text-sm block"
              >
                waltervaldez.consultor@gmail.com
              </a>
              <a
                href="https://wa.me/526228559245"
                className="text-white/70 hover:text-[#ffa400] transition-colors duration-300 text-sm block"
              >
                +52 622 855 9245
              </a>
              <a
                href="https://maps.app.goo.gl/5md3eb91C4WedFRj8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#ffa400] transition-all duration-300 text-sm flex items-start gap-2 group -mx-2 px-2 py-1.5 rounded-lg hover:bg-white/5"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#ffa400] group-hover:scale-110 transition-transform" />
                <span style={{ fontWeight: 500 }}>Negoplaza, Boulevard Solidaridad y Colosio Edificio B, Piso 3, 83200 Hermosillo, Son.</span>
              </a>
              <p className="text-white/70 text-sm">
                Atención remota en toda la República
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#ff6b0c] backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 group"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center items-center"
        >
          <p className="text-white/60 text-sm text-center">
            © 2025 Walter Valdez - Consultor Patrimonial. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
