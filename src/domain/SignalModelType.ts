export enum SignalModelType {
  Sin = "sin",
  Cos = "cos",
}

const functions = {
  [SignalModelType.Sin]: Math.sin,
  [SignalModelType.Cos]: Math.cos,
} as const;

export function calculateSignalModelType(
  type: SignalModelType,
  value: number
): number {
  return functions[type](value);
}
