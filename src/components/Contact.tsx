import {
  Mail,
  Phone,
  Instagram,
  Calendar,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form@7.55.0";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  // Inicializar EmailJS
  useEffect(() => {
    // Reemplaza con tu Public Key de EmailJS
    emailjs.init("7ZMDfS9YQ6OoLEUUu");
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      text: "waltervaldez.consultor@gmail.com",
      href: "mailto:waltervaldez.consultor@gmail.com",
      label: "Email",
    },
    {
      icon: Phone,
      text: "+52 622 855 9245",
      href: "https://wa.me/526228559245",
      label: "WhatsApp",
    },
    {
      icon: Instagram,
      text: "@waltervaldez.consultor",
      href: "https://instagram.com/waltervaldez.consultor",
      label: "Instagram",
    },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Validación adicional
      if (
        !data.name.trim() ||
        !data.email.trim() ||
        !data.phone.trim() ||
        !data.message.trim()
      ) {
        throw new Error("Todos los campos son requeridos");
      }

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        "service_h4p32ws", // Reemplaza con tu Service ID
        "template_rgoxknn", // Reemplaza con tu Template ID
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          // Campos adicionales que puedes necesitar en tu template
          to_name: "Walter Valdez",
        }
      );

      console.log("Email enviado exitosamente:", result);

      toast.success("¡Mensaje enviado con éxito!", {
        description: "Te contactaré pronto para ayudarte.",
        duration: 5000,
      });

      // Resetear formulario después del éxito
      reset();
    } catch (error) {
      console.error("Error al enviar el email:", error);

      toast.error("Error al enviar el mensaje", {
        description:
          "Por favor, intenta nuevamente o contáctame directamente por WhatsApp.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 md:py-28 bg-gradient-to-br from-[#ff6b0c] via-[#ff8730] to-[#ff4513] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#ffa400] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#ff4513] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm text-white/90" style={{ fontWeight: 600 }}>
              Contáctame
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl mx-auto leading-tight"
            style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Da el primer paso hacia tu{" "}
            <span
              style={{
                fontWeight: 800,
                textDecoration: "underline",
                textDecorationColor: "rgba(255, 255, 255, 0.4)",
                textDecorationThickness: "3px",
                textUnderlineOffset: "8px",
              }}
            >
              tranquilidad financiera
            </span>
          </h2>

          <p
            className="text-lg text-white/90 max-w-2xl mx-auto"
            style={{ fontWeight: 500 }}
          >
            Programa una asesoría gratuita y descubre la mejor protección para
            ti y tu familia
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2"
          >
            <a
              href="https://calendly.com/waltervaldezconsultor/asesoria-personalizada-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white hover:bg-gray-50 text-[#ff6b0c] rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
              style={{ fontWeight: 700 }}
            >
              <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl">Agenda tu cita gratuita</span>
            </a>
          </motion.div>

          {/* Divider */}
          <div className="pt-8">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-white/30"></div>
              <span
                className="text-white/70 text-sm"
                style={{ fontWeight: 500 }}
              >
                o escríbeme directamente
              </span>
              <div className="h-px w-20 bg-white/30"></div>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout: Form + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="mb-6">
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontWeight: 700 }}
                >
                  Envíame un mensaje
                </h3>
                <p className="text-white/80" style={{ fontWeight: 500 }}>
                  Te responderé en menos de 24 horas
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-white"
                    style={{ fontWeight: 600 }}
                  >
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/25 focus:border-white/50 transition-all"
                    {...register("name", {
                      required: "El nombre es requerido",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres",
                      },
                    })}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p
                      className="text-white/90 text-sm"
                      style={{ fontWeight: 500 }}
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email y Teléfono en 2 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white"
                      style={{ fontWeight: 600 }}
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/25 focus:border-white/50 transition-all"
                      {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p
                        className="text-white/90 text-sm"
                        style={{ fontWeight: 500 }}
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-white"
                      style={{ fontWeight: 600 }}
                    >
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+52 622 123 4567"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/25 focus:border-white/50 transition-all"
                      {...register("phone", {
                        required: "El teléfono es requerido",
                        pattern: {
                          value: /^[0-9\s+()-]+$/,
                          message: "Teléfono inválido",
                        },
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p
                        className="text-white/90 text-sm"
                        style={{ fontWeight: 500 }}
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-white"
                    style={{ fontWeight: 600 }}
                  >
                    Mensaje *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntame cómo puedo ayudarte..."
                    rows={4}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/25 focus:border-white/50 transition-all resize-none"
                    {...register("message", {
                      required: "El mensaje es requerido",
                      minLength: {
                        value: 10,
                        message: "El mensaje debe tener al menos 10 caracteres",
                      },
                    })}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p
                      className="text-white/90 text-sm"
                      style={{ fontWeight: 500 }}
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-[#ff6b0c] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontWeight: 700 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#ff6b0c] border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h3
                className="text-2xl text-white mb-2"
                style={{ fontWeight: 700 }}
              >
                O contáctame por
              </h3>
              <p className="text-white/80" style={{ fontWeight: 500 }}>
                Tu canal favorito de comunicación
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                return (
                  <motion.a
                    key={info.text}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-4 block"
                  >
                    {/* Gradient accent on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b0c]/0 to-[#ffa400]/0 group-hover:from-[#ff6b0c]/10 group-hover:to-[#ffa400]/10 rounded-2xl transition-all duration-300"></div>

                    <div className="relative z-10 flex items-center gap-4 w-full">
                      <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p
                          className="text-white/70 text-sm mb-1"
                          style={{ fontWeight: 500 }}
                        >
                          {info.label}
                        </p>
                        <p
                          className="text-white break-words"
                          style={{ fontWeight: 600 }}
                        >
                          {info.text}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mt-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white mb-1" style={{ fontWeight: 700 }}>
                    Respuesta garantizada
                  </p>
                  <p
                    className="text-white/80 text-sm"
                    style={{ fontWeight: 500 }}
                  >
                    Te contactaré en menos de 24 horas para comenzar a trabajar
                    en tu protección financiera
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
