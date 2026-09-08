import { trackFbEvent } from "./fbPixel";

const WHATSAPP_URL = `https://wa.me/526623957332?text=${encodeURIComponent(
  "Hola Walter, me gustaría recibir asesoría sobre seguros y planes de retiro."
)}`;

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wv-whatsapp-fab"
      aria-label="Escríbeme por WhatsApp"
      onClick={() =>
        trackFbEvent("Contact", { content_name: "Botón flotante WhatsApp" })
      }
    >
      <span className="wv-whatsapp-fab-label">¿Dudas? Escríbeme</span>
      <span className="wv-whatsapp-fab-icon">
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.36.69 4.66 2 6.64L4.1 28.5l7.11-1.86a12.1 12.1 0 0 0 4.83 1c6.63 0 12.03-5.36 12.03-11.96S22.67 3 16.04 3Zm0 21.85c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-4.22 1.1 1.13-4.1-.2-.32a9.84 9.84 0 0 1-1.53-5.23c0-5.47 4.47-9.92 9.98-9.92 5.5 0 9.97 4.45 9.97 9.92s-4.47 9.89-9.98 9.89Zm5.47-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.1 4.48.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
          />
        </svg>
      </span>
    </a>
  );
}
