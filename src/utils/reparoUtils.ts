import { Point } from "domain/Point";
import { RestorationModel, RestorationType } from "domain/RestorationModel";

interface RepairSignalOptions {
  readonly signal: ReadonlyArray<Point>;
  readonly restoration: RestorationModel;
}

/**
 * @param signal      -> x
 * @param startIndex  -> v
 * @param length      -> m
 * @param crossing    -> L
 * @param order       -> p
 */
function v2({
  signal,
  restoration: { startIndex, length, crossing, order },
}: RepairSignalOptions): Promise<Point[]> {
  return new Promise((resolve) => {
    const A = ((2 * order - 1) * Math.PI) / crossing;
    const B = Math.PI / crossing;
    const D = [];
    for (let i = 1; i < crossing; i += 1) {
      D[i] = Math.sin(A * i) / Math.sin(B * i);
    }

    const points: Point[] = [];
    for (let j = 1; j <= length; j += 1) {
      let y =
        (2 * order - 1) *
        (signal[startIndex + j - crossing].y +
          signal[startIndex + j + crossing].y);

      let i = j;
      while (i < crossing) {
        y += D[i] * signal[startIndex + j - i].y;
        i += 1;
      }

      i = 1;
      while (i < j) {
        y += D[i] * signal[startIndex + j - i - crossing].y;
        i += 1;
      }

      i = length + 1 - j;
      while (i < crossing) {
        y += D[i] * signal[startIndex + j + i].y;
        i += 1;
      }

      i = 1;
      while (i <= length - j) {
        y += D[i] * signal[startIndex + j + i + crossing].y;
        i += 1;
      }

      y /= 2 * crossing;

      points.push({
        x: signal[startIndex + j].x,
        y,
      });
    }

    resolve(points);
  });
}

/**
 * @param signal      -> x
 * @param startIndex  -> v
 * @param length      -> m
 * @param crossing    -> L
 */
function v1({
  signal,
  restoration: { startIndex, length, crossing },
}: RepairSignalOptions): Promise<Point[]> {
  return new Promise((resolve) => {
    const points: Point[] = [];

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

    for (let j = 1; j <= length; j += 1) {
      const preY =
        (signal[startIndex + j - crossing].y +
          signal[startIndex + j + crossing].y) /
        2;

      points.push({
        x: signal[startIndex + j].x,
        y: preY + (j % 2 === 0 ? s : -s),
      });
    }

    resolve(points);
  });
}

export function repairSignal(options: RepairSignalOptions): Promise<Point[]> {
  switch (options.restoration.type) {
    case RestorationType.v1:
      return v1(options);
    case RestorationType.v2:
      return v2(options);
    default:
      return Promise.resolve([]);
  }
}
