// Cálculo de la calculadora de retiro y pensión privada.
// Fase de acumulación: aportaciones mensuales con crecimiento compuesto
// hasta la edad de entrega. Fase de renta: retiro programado del capital
// durante el plazo elegido.

export const TASA_ACUMULACION = 10;
export const TASA_RENTA = 6.5;
export const PLAZOS_COMPARATIVA = [10, 15, 20, 25, 30];

export const LIMITES = {
  edadActual: { min: 20, max: 55, step: 1 },
  aportacion: { min: 2000, max: 20000, step: 500 },
  aniosAportando: { min: 10, max: 25, step: 1 },
  aniosRenta: { min: 10, max: 30, step: 5 },
  edadesEntrega: [60, 65] as const,
};

export interface RetirementInputs {
  nombre: string;
  edadActual: number;
  aportacion: number;
  aniosAportando: number;
  edadEntrega: number;
  aniosRenta: number;
}

export interface RetirementResults extends RetirementInputs {
  edadFinAportaciones: number;
  capitalFinAportaciones: number;
  capitalEntrega: number;
  totalAportado: number;
  rendimientoEstimado: number;
  pensionMensual: number;
  totalRetirado: number;
}

export interface GrowthSeries {
  edades: number[];
  aportado: number[];
  patrimonio: number[];
}

export interface ComparativaRow {
  plazo: number;
  pensionMensual: number;
  totalRetirado: number;
  seleccionado: boolean;
}

function tasaMensual(tasaAnualPct: number) {
  return Math.pow(1 + tasaAnualPct / 100, 1 / 12) - 1;
}

function fvAportaciones(aportacion: number, tasaPct: number, meses: number) {
  const i = tasaMensual(tasaPct);
  if (i === 0) return aportacion * meses;
  return aportacion * ((Math.pow(1 + i, meses) - 1) / i);
}

function fvCrecimiento(capital: number, tasaPct: number, meses: number) {
  return capital * Math.pow(1 + tasaMensual(tasaPct), meses);
}

export function pagoMensualRenta(
  capital: number,
  tasaPct: number,
  anios: number
) {
  const i = tasaMensual(tasaPct);
  const n = anios * 12;
  if (i === 0) return capital / n;
  return capital * (i / (1 - Math.pow(1 + i, -n)));
}

// El plazo máximo de aportación depende de la edad actual y la de entrega:
// nunca puede pasar de la edad de entrega, y se acota a [10, 25].
export function maxAniosAportando(edadActual: number, edadEntrega: number) {
  return Math.max(
    LIMITES.aniosAportando.min,
    Math.min(LIMITES.aniosAportando.max, edadEntrega - edadActual)
  );
}

export function normalizarInputs(inputs: RetirementInputs): RetirementInputs {
  let { edadEntrega, aniosAportando } = inputs;
  if (inputs.edadActual + LIMITES.aniosAportando.min > edadEntrega) {
    edadEntrega = 65;
  }
  const maxPlazo = maxAniosAportando(inputs.edadActual, edadEntrega);
  if (aniosAportando > maxPlazo) aniosAportando = maxPlazo;
  return { ...inputs, edadEntrega, aniosAportando };
}

export function calcularRetiro(rawInputs: RetirementInputs): RetirementResults {
  const inputs = normalizarInputs(rawInputs);
  const { edadActual, aportacion, aniosAportando, edadEntrega, aniosRenta } =
    inputs;

  const edadFinAportaciones = edadActual + aniosAportando;
  const mesesAportando = aniosAportando * 12;
  const mesesExtra = Math.max(0, (edadEntrega - edadFinAportaciones) * 12);

  const capitalFinAportaciones = fvAportaciones(
    aportacion,
    TASA_ACUMULACION,
    mesesAportando
  );
  const capitalEntrega = fvCrecimiento(
    capitalFinAportaciones,
    TASA_ACUMULACION,
    mesesExtra
  );
  const totalAportado = aportacion * mesesAportando;
  const rendimientoEstimado = capitalEntrega - totalAportado;
  const pensionMensual = pagoMensualRenta(
    capitalEntrega,
    TASA_RENTA,
    aniosRenta
  );
  const totalRetirado = pensionMensual * aniosRenta * 12;

  return {
    ...inputs,
    edadFinAportaciones,
    capitalFinAportaciones,
    capitalEntrega,
    totalAportado,
    rendimientoEstimado,
    pensionMensual,
    totalRetirado,
  };
}

export function serieCrecimiento(d: RetirementResults): GrowthSeries {
  const edades: number[] = [];
  const aportado: number[] = [];
  const patrimonio: number[] = [];

  let capital = 0;
  let totalAportado = 0;
  const i = tasaMensual(TASA_ACUMULACION);
  const totalMeses = (d.edadEntrega - d.edadActual) * 12;
  const mesesAportando = d.aniosAportando * 12;

  for (let m = 0; m <= totalMeses; m++) {
    if (m > 0) {
      capital *= 1 + i;
      if (m <= mesesAportando) {
        capital += d.aportacion;
        totalAportado += d.aportacion;
      }
    }
    if (m % 12 === 0 || m === totalMeses) {
      edades.push(d.edadActual + Math.round(m / 12));
      aportado.push(totalAportado);
      patrimonio.push(capital);
    }
  }
  return { edades, aportado, patrimonio };
}

export function comparativaPorPlazo(d: RetirementResults): ComparativaRow[] {
  return PLAZOS_COMPARATIVA.map((plazo) => {
    const pensionMensual = pagoMensualRenta(d.capitalEntrega, TASA_RENTA, plazo);
    return {
      plazo,
      pensionMensual,
      totalRetirado: pensionMensual * plazo * 12,
      seleccionado: plazo === d.aniosRenta,
    };
  });
}

export const formatoMoneda = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});
