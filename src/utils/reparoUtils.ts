import { Point } from "domain/Point";

interface RepairSignalOptions {
  readonly signal: ReadonlyArray<Point>;
  readonly startIndex: number; // v
  readonly length: number; // m
  readonly crossing: number; // L
}

export function repairSignal({
  signal,
  startIndex,
  length,
  crossing,
}: RepairSignalOptions) {
  const result: Point[] = [];
  for (let j = 1; j <= length; j += 1) {
    let s1 = 0;
    let s2 = 0;

    for (let i = 0; i < crossing; i += 1) {
      const leftIndex = startIndex - i;
      const rightIndex = startIndex + i + length;

      s1 += signal[leftIndex].y - signal[leftIndex - 1].y;
      s2 += signal[rightIndex + 1].y - signal[rightIndex + 2].y;
    }

    const s =
      length % 2 === 0
        ? (s1 - s2) / (crossing + crossing)
        : (s1 + s2) / (crossing + crossing);

    const preY =
      (signal[startIndex + j - crossing].y +
        signal[startIndex + j + crossing].y) /
      2;

    result[startIndex + j] = {
      x: signal[startIndex + j].x,
      y: preY + (j % 2) === 0 ? s : -s,
    };
  }

  return result;
}
