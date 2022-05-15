import styles from "components/main/signals/SignalEditor/SignalEditor.scss";
import { ReparoNumberInput } from "components/shared/ReparoInput/ReparoNumberInput";
import { SignalModel } from "domain/SignalModel";
import React from "react";

interface Props {
  readonly value: SignalModel;
  readonly onChange: (changes: Partial<SignalModel>) => void;
}

export const SignalEditor: React.FC<Props> = ({ value, onChange }) => (
  <div className={styles.root}>
    <label>Амплитуда</label>
    <ReparoNumberInput
      value={value.amplitude}
      onChange={(amplitude) => onChange({ amplitude })}
    />

    <label>Частота</label>
    <ReparoNumberInput
      value={value.frequency}
      onChange={(frequency) => onChange({ frequency })}
    />

    <label>Фаза</label>
    <ReparoNumberInput
      value={value.phase}
      onChange={(phase) => onChange({ phase })}
    />
  </div>
);
