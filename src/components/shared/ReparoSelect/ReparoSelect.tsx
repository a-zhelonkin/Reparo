import cn from "classnames";
import React from "react";
import { as } from "utils/typeUtils";
import styles from "./ReparoSelect.scss";

type SelectProps = JSX.IntrinsicElements["button"];
type OmittedSelectProps = Omit<SelectProps, "value" | "onChange">;

interface Props<T> extends OmittedSelectProps {
  readonly value: T;
  readonly onChange: (item: T) => void;
  readonly items: ReadonlyArray<T>;
  readonly itemToString: (item: T) => string;
}

export function ReparoSelect<T>({
  className,
  value,
  onChange,
  items,
  itemToString,
}: Props<T>) {
  return (
    <select
      className={cn(styles.root, className)}
      value={as<string>(value)}
      onChange={(x) => onChange(as<T>(x.target.value))}
    >
      {items.map((x) => (
        <option value={as<string>(x)}>{itemToString(x)}</option>
      ))}
    </select>
  );
}
