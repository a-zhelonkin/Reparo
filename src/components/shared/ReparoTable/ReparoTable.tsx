import cn from "classnames";
import React from "react";
import styles from "./ReparoTable.scss";

interface ReparoTableColumnProps<TItem> {
  readonly colClassName: string;
  readonly title: string;
  readonly renderCell: (item: TItem) => React.ReactNode;
}

interface Props<TItem> {
  readonly className?: string;
  readonly items: ReadonlyArray<TItem>;
  readonly selectedItem?: TItem;
  readonly onSelectItem?: (item: TItem) => void;
  readonly columns: ReadonlyArray<ReparoTableColumnProps<TItem>>;
}

export function ReparoTable<TItem>({
  className,
  items,
  selectedItem,
  onSelectItem,
  columns,
}: Props<TItem>) {
  return (
    <div className={cn(styles.root, className)}>
      <table>
        <colgroup>
          {columns.map((column, columnIndex) => (
            <col key={columnIndex} className={column.colClassName} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th key={columnIndex}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, itemIndex) => (
            <tr
              key={itemIndex}
              className={cn({
                [styles.selected]: selectedItem === item,
              })}
              onClick={() => onSelectItem?.(item)}
            >
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{column.renderCell(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
