import { MapPin, Award } from "lucide-react";
import { motion } from "motion/react";
import gnpLogo from "figma:asset/f5460379084f78e8337e334b15c21289f2bff3f0.png";
import allianzLogo from "figma:asset/312ef735d6105244b562ad8e3676aa3c2a12bf13.png";
import skandiaLogo from "figma:asset/7274277324aef98afaabd334368d86e4c0650375.png";
import qualitasLogo from "figma:asset/0d8cb45c25e7208e47bf9b9930fa0e0865cbede8.png";
import chubbLogo from "figma:asset/722dfe53e8e0cf0fcb8ab7ff045b28479c7457fb.png";
import zurichLogo from "figma:asset/b2ad269dcf18599ef7c13a77624b056ce69116ac.png";
import suraLogo from "figma:asset/0ee1f0ba34121c88f485389f27db02985ec85add.png";
import atlasLogo from "figma:asset/ae0f37507cdc7693c6a0ebee87b51f16aaa2fcd7.png";
import mapfreLogo from "figma:asset/79c232a00ae9b51afb635387d517b03c4ca69032.png";

export function AboutMe() {
  const insuranceCompanies = [
    { name: "GNP Seguros", logo: gnpLogo, featured: true },
    { name: "Allianz", logo: allianzLogo, featured: true },
    { name: "Skandia", logo: skandiaLogo, featured: true },
    { name: "Qualitas", logo: qualitasLogo, featured: true },
    { name: "Chubb", logo: chubbLogo, featured: true },
    { name: "Zurich", logo: zurichLogo, featured: true },
    { name: "Sura", logo: suraLogo, featured: true },
    { name: "Atlas", logo: atlasLogo, featured: true },
    { name: "Mapfre", logo: mapfreLogo, featured: true },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 md:py-28 bg-white relative"
    >
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff6b0c]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b0c]/5 rounded-full mb-4">
            <Award className="w-4 h-4 text-[#ff6b0c]" />
            <span
              className="text-sm text-[#ff6b0c]"
              style={{ fontWeight: 600 }}
            >
              Agente de seguros certificado
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl text-[#103595]"
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Walter Valdez
          </h2>

          <p className="text-lg text-gray-600" style={{ fontWeight: 500 }}>
            Soluciones personalizadas y eficientes
          </p>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              Mi mision es acompañar a personas y familias a construir seguridad
              y libertad financiera, protegiendo lo más valioso:{" "}
              <span className="text-[#ff6b0c]" style={{ fontWeight: 700 }}>
                su vida
              </span>
              ,{" "}
              <span className="text-[#ff6b0c]" style={{ fontWeight: 700 }}>
                su salud
              </span>{" "}
              y{" "}
              <span className="text-[#ff6b0c]" style={{ fontWeight: 700 }}>
                su futuro
              </span>
            </p>
          </div>
        </div>

        {/* Insurance Companies Section - Infinite Carousel */}
        <div className="pt-12 border-t border-gray-200">
          <p
            className="text-center text-sm uppercase tracking-wider text-gray-500 mb-10"
            style={{ fontWeight: 600 }}
          >
            Trabajo con las principales aseguradoras del país
          </p>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Scrolling content */}
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1800],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {/* Original logos */}
              {insuranceCompanies.map((company, index) => (
                <div
                  key={`original-${index}`}
                  className="flex-shrink-0 w-48 bg-white rounded-2xl border-2 border-gray-100 p-6
                    hover:border-[#103595]/20 hover:shadow-xl
                    transition-all duration-300
                    flex items-center justify-center h-32"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-16 object-contain"
                  />
                </div>
              ))}

              {/* Duplicated logos for seamless loop */}
              {insuranceCompanies.map((company, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-48 bg-white rounded-2xl border-2 border-gray-100 p-6
                    hover:border-[#103595]/20 hover:shadow-xl
                    transition-all duration-300
                    flex items-center justify-center h-32"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-16 object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
