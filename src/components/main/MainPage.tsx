import styles from "components/main/MainPage.scss";
import { SignalsKeeper } from "components/main/signals/SignalsKeeper/SignalsKeeper";
import { SignalModel } from "domain/SignalModel";
import React from "react";

export const MainPage: React.FC = () => {
  const [signals, setSignals] = React.useState<ReadonlyArray<SignalModel>>([]);

  return (
    <div className={styles.root}>
      <SignalsKeeper items={signals} onChange={setSignals} />
    </div>
  );
};
