import { Point } from "domain/Point";
import { RestorationModel } from "domain/RestorationModel";

interface RepairSignalOptions {
  readonly signal: ReadonlyArray<Point>;
  readonly restoration: RestorationModel;
}

/**
 *
 * @param signal
 * @param startIndex  -> v
 * @param length      -> m
 * @param crossing    -> L
 */
export function repairSignal({
  signal,
  restoration: { startIndex, length, crossing },
}: RepairSignalOptions): Promise<Point[]> {
  return new Promise((resolve) => {
    const points: Point[] = [];
    for (let j = 1; j <= length; j += 1) {
      let s1 = 0;
      let s2 = 0;

      for (let i = 0; i < crossing; i += 2) {
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

      points.push({
        x: signal[startIndex + j].x,
        y: preY + (j % 2) === 0 ? s : -s,
      });
    }

    resolve(points);
  });
}
