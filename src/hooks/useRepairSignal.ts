import { Point } from "domain/Point";
import { QueryStatus } from "domain/QueryStatus";
import { RestorationModel } from "domain/RestorationModel";
import React from "react";
import { repairSignal } from "utils/reparoUtils";

interface UseRepairSignalOptions {
  readonly signal: ReadonlyArray<Point>;
  readonly restoration: RestorationModel;
}

interface UseRepairSignalState {
  readonly status: QueryStatus;
  readonly points: Point[];
}

export function useRepairSignal({
  signal,
  restoration,
}: UseRepairSignalOptions): UseRepairSignalState {
  const [status, setStatus] = React.useState(QueryStatus.Initial);
  const [points, setPoints] = React.useState([]);

  React.useEffect(() => {
    setStatus(QueryStatus.Requesting);
    repairSignal({
      signal,
      restoration,
    })
      .then((newPoints) => {
        setPoints(newPoints);
        setStatus(QueryStatus.Success);
      })
      .catch(() => {
        setStatus(QueryStatus.Error);
      });
  }, [signal, restoration]);

  return { status, points };
}
