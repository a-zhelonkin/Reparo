import { ReparoTable } from "components/shared/ReparoTable/ReparoTable";
import { SignalModel } from "domain/SignalModel";
import React from "react";
import styles from "./SignalsTable.scss";

interface Props {
  readonly className?: string;
  readonly items: ReadonlyArray<SignalModel>;
  readonly selectedItem: SignalModel;
  readonly onSelectItem: (item: SignalModel) => void;
}

export const SignalsTable: React.FC<Props> = ({
  className,
  items,
  selectedItem,
  onSelectItem,
}) => (
  <ReparoTable
    className={className}
    items={items}
    selectedItem={selectedItem}
    onSelectItem={onSelectItem}
    columns={[
      {
        colClassName: styles.type,
        title: "Тип",
        renderCell: (item) => item.type,
      },
      {
        colClassName: styles.amplitude,
        title: "Амплитуда",
        renderCell: (item) => item.amplitude,
      },
      {
        colClassName: styles.frequency,
        title: "Частота",
        renderCell: (item) => item.frequency,
      },
      {
        colClassName: styles.phase,
        title: "Фаза",
        renderCell: (item) => item.phase,
      },
    ]}
  />
);
