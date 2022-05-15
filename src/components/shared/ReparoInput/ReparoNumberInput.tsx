import React from "react";

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const ReparoNumberInput: React.FC<Props> = ({ value, onChange }) => (
  <input
    type={"number"}
    value={value}
    onChange={(e) => onChange(+e.target.value)}
  />
);
