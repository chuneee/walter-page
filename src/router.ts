import { useEffect, useState } from "react";

// Router mínimo basado en la ruta del navegador. Solo hay dos vistas:
// el landing ("/") y la calculadora ("/calculadora").

const ROUTE_EVENT = "app:navigate";

export function getCurrentPath(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function navigateTo(path: string) {
  if (getCurrentPath() === path) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  window.scrollTo({ top: 0 });
}

export function useRoute(): string {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const update = () => setPath(getCurrentPath());
    window.addEventListener("popstate", update);
    window.addEventListener(ROUTE_EVENT, update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(ROUTE_EVENT, update);
    };
  }, []);

  return path;
}

const HEADER_OFFSET = 80;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;
  const top =
    element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

// Navega a una sección del landing desde cualquier vista. Si estamos en
// otra ruta, primero regresa al landing y luego hace scroll.
export function goToLandingSection(id: string) {
  if (getCurrentPath() !== "/") {
    navigateTo("/");
    setTimeout(() => scrollToSection(id), 80);
    return;
  }
  scrollToSection(id);
}
