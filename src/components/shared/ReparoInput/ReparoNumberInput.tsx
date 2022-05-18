import React from "react";
import styles from "./ReparoInput.scss";

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const ReparoNumberInput: React.FC<Props> = ({ value, onChange }) => (
  <input
    className={styles.root}
    type={"number"}
    value={value}
    onChange={(e) => onChange(+e.target.value)}
  />
);
