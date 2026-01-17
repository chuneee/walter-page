# Simulador de Plan de Retiro

## 📋 Descripción

Componente React autocontenido para simular planes de retiro con cálculos financieros completos. Incluye motor de cálculo determinista, validaciones robustas y UI responsive.

## 🚀 Integración

### Instalación rápida

El componente ya está listo para usar. Solo necesitas importarlo:

```tsx
import { RetirementSimulatorSection } from "./components/RetirementSimulatorSection";

// En tu página/layout
<RetirementSimulatorSection />;
```

### Uso básico

```tsx
// Sin props (valores por defecto)
<RetirementSimulatorSection />
```

### Uso avanzado con personalización

```tsx
<RetirementSimulatorSection
  title="Planea tu futuro financiero"
  subtitle="Simula tu plan de retiro personalizado"
  compact={false}
  defaults={{
    currentAge: 25,
    targetAge: 60,
    contributionAmount: 10000,
    annualReturn: 10,
  }}
  onResult={(result) => {
    console.log("Saldo proyectado:", result.projectedBalance);
    // Enviar a analytics, guardar en DB, etc.
  }}
/>
```

## 🎯 Props disponibles

```typescript
interface RetirementSimulatorSectionProps {
  // Personalización de textos
  title?: string; // Default: "Simulador de plan de retiro"
  subtitle?: string; // Default: texto descriptivo

  // Valores iniciales del formulario
  defaults?: Partial<SimulatorInput>; // Sobrescribe valores por defecto

  // Layout
  compact?: boolean; // true = UI más compacta (1 columna)

  // Callback para capturar resultados
  onResult?: (result: SimulatorResult) => void;
}
```

## 📁 Estructura de archivos

```
src/
├── lib/
│   ├── simulatorTypes.ts       # Tipos TypeScript
│   ├── simulatorEngine.ts      # Motor de cálculo
│   └── simulatorEngine.test.ts # Tests
└── components/
    └── RetirementSimulatorSection.tsx # Componente UI
```

## 🧪 Tests

Ejecutar tests:

```bash
npm test
```

Ejecutar tests en modo watch:

```bash
npm test -- --watch
```

Ver cobertura:

```bash
npm test -- --coverage
```

### Cobertura de tests

- ✅ Casos básicos (sin rendimiento, sin cargos)
- ✅ Rendimiento compuesto mensual
- ✅ Conversión de frecuencia (anual → mensual)
- ✅ Incrementos anuales de aportación
- ✅ Cargos administrativos (mensual, trimestral)
- ✅ Cargos especiales (prima inicial, mes 42)
- ✅ Aplicación de bonos (mes 1 vs mes 12)
- ✅ Validaciones de entrada
- ✅ Manejo de errores
- ✅ Timeline mensual

## 🎨 Estilos

El componente usa **Tailwind CSS** con shadcn/ui components. Si necesitas personalizar:

1. **Colores de la sección**: Edita `className` en el `<section>` principal
2. **Cards de resultados**: Modifica los `bg-*` y `border-*` classes
3. **Responsive**: Ya está optimizado para mobile/tablet/desktop

## 🔧 Motor de cálculo

### Características principales

- **Simulación mensual**: Precisión al mes
- **Rendimiento compuesto**: `(1 + r_anual)^(1/12) - 1`
- **Incrementos automáticos**: Aportación crece cada año
- **Múltiples cargos**:
  - Administrativo mensual (%)
  - Gestión trimestral (%)
  - Prima inicial (cargo fijo mes 1)
  - Cargo especial mes 42 (UDI-based)
- **Sistema de bonos**: Aplicable en mes 1 o mes 12
- **Timeline completa**: Historial mes a mes

### Ejemplo de cálculo

```typescript
import { calculateRetirement } from "./lib/simulatorEngine";

const resultado = calculateRetirement({
  currentAge: 30,
  targetAge: 65,
  contributionAmount: 5000,
  contributionFrequency: "Mensual",
  annualReturn: 8,
  // ... otros parámetros
});

console.log(resultado);
// {
//   targetAge: 65,
//   totalContributions: 2100000,
//   projectedBalance: 11734000.52,
//   bonusAmount: 3000,
//   feesEstimated: 15200.45,
//   yearsRemaining: 35,
//   timeline: [...]
// }
```

## 📊 Validaciones implementadas

- Edad actual: 18-70 años
- Edad objetivo: Mayor que edad actual, máximo 80
- ISR: 0-35%
- Incremento anual: 0-20%
- Aportación: > 0
- Rendimiento y inflación: ≥ 0

Los errores se muestran en un `Alert` en tiempo real.

## 🎯 Casos de uso

### Integrar en una landing page

```tsx
function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection />

      {/* Insertar simulador */}
      <RetirementSimulatorSection />

      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
```

### Capturar resultados para analytics

```tsx
<RetirementSimulatorSection
  onResult={(result) => {
    // Enviar a Google Analytics
    gtag("event", "simulador_completado", {
      saldo_proyectado: result.projectedBalance,
      años: result.yearsRemaining,
    });

    // O guardar en base de datos
    saveSimulationResult(result);
  }}
/>
```

### Modo compacto para sidebar

```tsx
<aside className="w-96">
  <RetirementSimulatorSection compact={true} title="Calcula tu retiro" />
</aside>
```

## 🔄 Recalculación automática

El simulador recalcula automáticamente con **debounce de 300ms** cuando cambias cualquier input. No necesitas botón "Calcular".

## 🌐 Formato de números

- **Moneda**: `Intl.NumberFormat('es-MX')` → $1,234,567.89
- **Porcentajes**: 2 decimales → 8.00%

## 🚨 Manejo de errores

El motor lanza excepciones claras:

```typescript
try {
  const result = calculateRetirement(input);
} catch (error) {
  // "La edad objetivo debe ser mayor que la edad actual"
  // "La edad actual debe estar entre 18 y 70 años"
  // etc.
}
```

El componente UI captura estos errores y los muestra en un `Alert`.

## 📝 Notas importantes

1. **Sin dependencias externas**: No usa librerías financieras de terceros
2. **Determinista**: Mismos inputs = mismos outputs
3. **Testeable**: Lógica separada del UI
4. **Type-safe**: TypeScript estricto
5. **Responsive**: Funciona en mobile, tablet y desktop
6. **Accesible**: Labels, IDs y ARIA cuando es necesario

## 🛠️ Personalización avanzada

### Cambiar valores por defecto globalmente

Edita `DEFAULT_INPUT` en `src/lib/simulatorTypes.ts`:

```typescript
export const DEFAULT_INPUT: SimulatorInput = {
  currentAge: 25, // Cambia aquí
  targetAge: 60,
  contributionAmount: 10000,
  // ...
};
```

### Agregar nuevos cargos

1. Añade el parámetro en `SimulatorInput` (types)
2. Implementa la lógica en `calculateRetirement` (engine)
3. Agrega el input en el UI (component)
4. Escribe tests para el nuevo cargo

## 📞 Soporte

Para preguntas o issues relacionados con el simulador:

- Revisa los tests para ver ejemplos de uso
- Consulta el motor de cálculo para entender la lógica
- El componente es autocontenido y no requiere configuración adicional

---

**Versión**: 1.0.0
**Última actualización**: Enero 2026
**Compatibilidad**: React 18+, TypeScript 5+
