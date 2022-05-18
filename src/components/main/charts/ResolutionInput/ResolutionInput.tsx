import cn from "classnames";
import { ReparoNumberInput } from "components/shared/ReparoInput/ReparoNumberInput";
import { ResolutionModel } from "domain/ResolutionModel";
import React from "react";
import styles from "./ResolutionInput.scss";

interface Props {
  readonly className?: string;
  readonly value: ResolutionModel;
  readonly onChange: (value: Partial<ResolutionModel>) => void;
}

export const ResolutionInput: React.FC<Props> = ({
  className,
  value,
  onChange,
}) => (
  <div className={cn(styles.root, className)}>
    <label>
      Минимум
      <ReparoNumberInput
        value={value.min}
        onChange={(min) => onChange({ min })}
      />
    </label>

    <label>
      Максимум
      <ReparoNumberInput
        value={value.max}
        onChange={(max) => onChange({ max })}
      />
    </label>

    <label>
      Шаг
      <ReparoNumberInput
        value={value.step}
        onChange={(step) => onChange({ step })}
      />
    </label>
  </div>
);
