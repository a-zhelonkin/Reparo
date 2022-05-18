import cn from "classnames";
import { SignalModel } from "domain/SignalModel";
import React from "react";
import styles from "./SignalsTable.scss";

interface Props {
  readonly items: ReadonlyArray<SignalModel>;
  readonly selectedItem: SignalModel;
  readonly onSelectItem: (item: SignalModel) => void;
}

export const SignalsTable: React.FC<Props> = ({
  items,
  selectedItem,
  onSelectItem,
}) => (
  <div className={styles.root}>
    <table>
      <colgroup>
        <col className={styles.type} />
        <col className={styles.amplitude} />
        <col className={styles.frequency} />
        <col className={styles.phase} />
      </colgroup>
      <thead>
        <tr>
          <th>Тип</th>
          <th>Амплитуда</th>
          <th>Частота</th>
          <th>Фаза</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={cn({
              [styles.selected]: selectedItem && selectedItem.id === item.id,
            })}
            onClick={() => onSelectItem(item)}
          >
            <td>{item.type}</td>
            <td>{item.amplitude}</td>
            <td>{item.frequency}</td>
            <td>{item.phase}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
