import { ReparoTable } from "components/shared/ReparoTable/ReparoTable";
import { ErrorModel } from "domain/ErrorModel";
import { Point } from "domain/Point";
import { RestorationModel } from "domain/RestorationModel";
import React from "react";
import styles from "./ErrorsTable.scss";

interface Props {
  readonly className?: string;
  readonly signal: ReadonlyArray<Point>;
  readonly restoredSignal: ReadonlyArray<Point>;
  readonly restoration: RestorationModel;
}

export const ErrorsTable: React.FC<Props> = ({
  className,
  signal,
  restoredSignal,
  restoration,
}) => {
  const items = React.useMemo(() => {
    const result: ErrorModel[] = [];
    for (let index = 0; index < restoration.length; index += 1) {
      const movedIndex = index + restoration.startIndex;
      const value = signal[movedIndex]?.y || 0;
      const restoredValue = restoredSignal[index]?.y || 0;

      result.push({
        index,
        movedIndex,
        value,
        restoredValue,
        deltaValue: restoredValue - value,
        errorValue: (restoredValue - value) / value,
      });
    }

    return result;
  }, [signal, restoredSignal, restoration]);

  return (
    <ReparoTable
      className={className}
      items={items}
      columns={[
        {
          colClassName: styles.index,
          title: "j",
          renderCell: (item) => item.index,
        },
        {
          colClassName: styles.movedIndex,
          title: "j + ν",
          renderCell: (item) => item.movedIndex,
        },
        {
          colClassName: styles.value,
          title: "x",
          renderCell: (item) => item.value,
        },
        {
          colClassName: styles.restoredValue,
          title: "x̅",
          renderCell: (item) => item.restoredValue,
        },
        {
          colClassName: styles.deltaValue,
          title: "Δ",
          renderCell: (item) => item.deltaValue,
        },
        {
          colClassName: styles.errorValue,
          title: "δ",
          renderCell: (item) => item.errorValue,
        },
      ]}
    />
  );
};
