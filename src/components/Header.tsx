import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoWhite from "figma:asset/b78ac8ff2ad6bc40cbd2d4ea1f4f26ef70ca0e9b.png";
import logoColor from "figma:asset/0f2bacd61666436b2144d7fb5694974b05d285a1.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Servicios", href: "#servicios" },
    { label: "Por Qué Elegirme", href: "#beneficios" },
    { label: "Contacto", href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(16,53,149,0.08)] border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Smooth transition between white and color versions */}
            <a 
              href="#inicio" 
              onClick={(e) => handleNavClick(e, "#inicio")} 
              className="relative z-50 h-10 md:h-12"
            >
              <AnimatePresence mode="wait">
                {isScrolled ? (
                  <motion.img
                    key="logo-color"
                    src={logoColor}
                    alt="Walter Valdez Logo"
                    className="h-10 md:h-12 w-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.img
                    key="logo-white"
                    src={logoWhite}
                    alt="Walter Valdez Logo"
                    className="h-10 md:h-12 w-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm transition-colors duration-300 hover:text-[#ff6b0c] relative group ${
                    isScrolled ? "text-[#103595]" : "text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff6b0c] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <a
                href="https://calendly.com/waltervaldezconsultor/asesoria-personalizada-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#ff6b0c] to-[#ff4513] hover:from-[#ff4513] hover:to-[#ff6b0c] text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Agenda tu cita
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden relative z-50 p-2 rounded-lg transition-colors duration-300 ${
                isScrolled
                  ? "text-[#103595] hover:bg-[#103595]/10"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-40 lg:hidden"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-6">
                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-3 text-lg text-gray-700 hover:text-[#ff6b0c] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* CTA Button - Mobile */}
                <motion.a
                  href="https://calendly.com/waltervaldezconsultor/asesoria-personalizada-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#ff6b0c] to-[#ff4513] text-white text-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Agenda tu cita gratuita
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
