const WHATSAPP_NUMBER = "526623957332";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export interface WhatsAppScenario {
  currentAge: number;
  monthlyContribution: number;
  savingYears: number;
  endContribAge: number;
  payoutAge: number;
  totalContribution: number;
  growthAtPayout: number;
  amountAtPayout: number;
}

export function buildWhatsAppUrl(s: WhatsAppScenario): string {
  const message =
    `¡Hola Walter! Acabo de usar el simulador de ahorro de tu página y me gustaría recibir asesoría.\n\n` +
    `Mi escenario:\n` +
    `• Edad actual: ${s.currentAge} años\n` +
    `• Aporte mensual: ${currency.format(s.monthlyContribution)}\n` +
    `• Años de ahorro: ${s.savingYears} (hasta los ${s.endContribAge})\n` +
    `• Edad de entrega: ${s.payoutAge} años\n\n` +
    `Mi proyección:\n` +
    `• Aporte total: ${currency.format(s.totalContribution)}\n` +
    `• Rendimiento estimado: ${currency.format(s.growthAtPayout)}\n` +
    `• Capital proyectado a los ${s.payoutAge}: ${currency.format(s.amountAtPayout)}\n\n` +
    `¿Me ayudas a armar un plan?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
