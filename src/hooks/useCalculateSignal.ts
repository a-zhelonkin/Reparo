import { Point } from "domain/Point";
import { QueryStatus } from "domain/QueryStatus";
import { ResolutionModel } from "domain/ResolutionModel";
import { SignalModel } from "domain/SignalModel";
import React from "react";
import { calculateSignal } from "utils/signalUtils";

interface UseCalculateSignalOptions {
  readonly signals: ReadonlyArray<SignalModel>;
  readonly resolution: ResolutionModel;
}

interface UseCalculateSignalState {
  readonly status: QueryStatus;
  readonly points: Point[];
}

export function useCalculateSignal({
  signals,
  resolution,
}: UseCalculateSignalOptions): UseCalculateSignalState {
  const [status, setStatus] = React.useState(QueryStatus.Initial);
  const [points, setPoints] = React.useState([]);

  React.useEffect(() => {
    setStatus(QueryStatus.Requesting);
    calculateSignal({ signals, resolution })
      .then((newSignal) => {
        setPoints(newSignal);
        setStatus(QueryStatus.Success);
      })
      .catch(() => {
        setStatus(QueryStatus.Error);
      });
  }, [signals, resolution]);

  return { status, points };
}
