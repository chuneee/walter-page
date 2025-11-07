import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import advisorPhoto from "figma:asset/ec4ae3d8b2f89a24ae5c5aa7cb5dec88acd34da0.png";
import { Shield, Clock, Award, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#103595] via-[#0d2a6e] to-[#103595] overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Subtle orange accent - top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ff6b0c]/20 via-transparent to-transparent blur-3xl"></div>
      
      {/* Subtle orange accent - bottom left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#ffa400]/10 via-transparent to-transparent blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-white space-y-6 md:space-y-8">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 px-3 py-1">
                <Award className="w-3 h-3 mr-1.5" />
                Certificado
              </Badge>
              <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 px-3 py-1">
                <Shield className="w-3 h-3 mr-1.5" />
                +10 Aseguradoras
              </Badge>
              <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 px-3 py-1">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                100% Personalizado
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>
              Te acompaño paso a paso para <span style={{ fontWeight: 800 }}>proteger lo que más valoras</span> y planear tu futuro con <span style={{ fontWeight: 800 }}>claridad</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
              Asesoría personalizada en seguros de gastos médicos mayores, retiro y ahorro, e inversiones, diseñada para darte tranquilidad y claridad financiera en cada etapa de tu vida.
            </p>
            
            <div className="pt-4">
              <a href="https://calendly.com/waltervaldezconsultor/asesoria-personalizada-1" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#ff6b0c] to-[#ff4513] hover:from-[#ff4513] hover:to-[#ff6b0c] text-white px-10 py-6 text-lg rounded-full shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50"
                >
                  Agenda tu asesoría gratuita
                </Button>
              </a>
            </div>

            {/* Quick benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#ffa400]" />
                </div>
                <p className="text-xs text-white/80">Respuesta en 24hrs</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#ffa400]" />
                </div>
                <p className="text-xs text-white/80">Sin costo de asesoría</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#ffa400]" />
                </div>
                <p className="text-xs text-white/80">Seguimiento continuo</p>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Elegant shadow backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ffa400]/30 to-[#ff4513]/30 rounded-3xl blur-2xl"></div>
              
              {/* Photo container */}
              <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                <img 
                  src={advisorPhoto} 
                  alt="Walter Valdez - Asesor Profesional" 
                  className="rounded-2xl w-full max-w-md object-cover"
                />
              </div>

              {/* Floating card - credibility */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#103595] to-[#ff6b0c] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[#103595] text-xs">Familias protegidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
