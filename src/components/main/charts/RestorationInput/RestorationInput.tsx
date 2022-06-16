import cn from "classnames";
import { ReparoNumberInput } from "components/shared/ReparoInput/ReparoNumberInput";
import { ReparoSelect } from "components/shared/ReparoSelect/ReparoSelect";
import {
  RestorationModel,
  RestorationType,
  restorationTypeToString,
  restorationTypeValues,
} from "domain/RestorationModel";
import React from "react";
import styles from "./RestorationInput.scss";

interface Props {
  readonly className?: string;
  readonly value: RestorationModel;
  readonly onChange: (value: Partial<RestorationModel>) => void;
}

export const RestorationInput: React.FC<Props> = ({
  className,
  value,
  onChange,
}) => (
  <form className={cn(styles.root, className)}>
    <label>
      Начало
      <ReparoNumberInput
        value={value.startIndex}
        onChange={(startIndex) => onChange({ startIndex })}
      />
    </label>

    <label>
      Количество
      <ReparoNumberInput
        value={value.length}
        onChange={(length) => onChange({ length })}
      />
    </label>

    <label>
      Пересечение
      <ReparoNumberInput
        value={value.crossing}
        onChange={(crossing) => onChange({ crossing })}
      />
    </label>

    <label>
      Порядок
      <ReparoNumberInput
        value={value.order}
        onChange={(order) => onChange({ order })}
        disabled={value.type === RestorationType.v1}
      />
    </label>

    <label>
      Порядок
      <ReparoSelect<RestorationType>
        value={value.type}
        onChange={(type) => onChange({ type })}
        items={restorationTypeValues}
        itemToString={restorationTypeToString}
      />
    </label>
  </form>
);
