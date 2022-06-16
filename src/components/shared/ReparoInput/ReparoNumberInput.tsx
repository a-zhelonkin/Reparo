import cn from "classnames";
import React from "react";
import styles from "./ReparoInput.scss";

type InputProps = JSX.IntrinsicElements["input"];
type OmittedInputProps = Omit<InputProps, "type" | "value" | "onChange">;

interface Props extends OmittedInputProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const ReparoNumberInput: React.FC<Props> = ({
  className,
  value,
  onChange,
  ...rest
}) => (
  <input
    {...rest}
    className={cn(styles.root, className)}
    type={"number"}
    value={value}
    onChange={(e) => onChange(+e.target.value)}
  />
);
