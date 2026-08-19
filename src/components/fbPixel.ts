// Eventos del píxel de Facebook. El código base se carga en index.html;
// aquí solo se disparan eventos, con guarda por si un bloqueador impidió
// que fbq exista.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackFbEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

export function trackFbCustomEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, params);
}
