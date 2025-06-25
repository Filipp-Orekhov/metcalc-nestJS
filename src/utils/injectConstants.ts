const FORMULA_CONSTANTS: Record<string, number> = {
  pi: Math.PI,
};

export function injectConstants(formula: string): string {
  return Object.entries(FORMULA_CONSTANTS).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(key, 'g'), value.toString()),
    formula,
  );
}
