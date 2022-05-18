import { Point } from "domain/Point";
import { ResolutionModel } from "domain/ResolutionModel";
import { calculateSignalModel, SignalModel } from "domain/SignalModel";

interface CalculateSignalOptions {
  readonly signals: ReadonlyArray<SignalModel>;
  readonly resolution: ResolutionModel;
}

export function calculateSignal({
  signals,
  resolution,
}: CalculateSignalOptions): Promise<Point[]> {
  return new Promise((resolve) => {
    const points: Point[] = [];
    if (signals.length) {
      for (let t = resolution.min; t < resolution.max; t += resolution.step) {
        points.push({
          x: t,
          y: signals.reduce((a, e) => a + calculateSignalModel(e, t), 0),
        });
      }
    }

    resolve(points);
  });
}
