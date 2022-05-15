import React from "react";

interface Props {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly onClick: () => void;
}

export const ReparoButton: React.FC<Props> = ({
  className,
  children,
  onClick,
}) => (
  <button className={className} children={children} onClick={() => onClick()} />
);
