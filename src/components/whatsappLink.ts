const WHATSAPP_NUMBER = "526623957332";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export interface WhatsAppScenario {
  nombre: string;
  edadActual: number;
  aportacion: number;
  aniosAportando: number;
}

export function buildWhatsAppUrl(s: WhatsAppScenario): string {
  const nombre = s.nombre.trim() || "cliente";
  const message = `Hola, soy ${nombre}, tengo ${s.edadActual} años y quiero ahorrar ${currency.format(s.aportacion)} mensuales durante ${s.aniosAportando} años y quiero más información.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
