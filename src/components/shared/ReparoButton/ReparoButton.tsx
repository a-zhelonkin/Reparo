import cn from "classnames";
import styles from "components/shared/ReparoInput/ReparoInput.scss";
import React from "react";

type ButtonProps = JSX.IntrinsicElements["button"];
type OmittedButtonProps = Omit<ButtonProps, "children">;

interface Props extends OmittedButtonProps {
  readonly children: React.ReactNode;
}

export const ReparoButton: React.FC<Props> = ({
  className,
  children,
  ...rest
}) => (
  <button {...rest} className={cn(styles.root, className)}>
    {children}
  </button>
);
