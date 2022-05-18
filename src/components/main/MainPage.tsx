import { ErrorsTable } from "components/main/charts/ErrorsTable/ErrorsTable";
import { OriginalChart } from "components/main/charts/OriginalChart/OriginalChart";
import { ResolutionInput } from "components/main/charts/ResolutionInput/ResolutionInput";
import { RestorationInput } from "components/main/charts/RestorationInput/RestorationInput";
import styles from "components/main/MainPage.scss";
import { SignalsKeeper } from "components/main/signals/SignalsKeeper/SignalsKeeper";
import {
  defaultResolutionModel,
  ResolutionModel,
} from "domain/ResolutionModel";
import {
  defaultRestorationModel,
  RestorationModel,
} from "domain/RestorationModel";
import { SignalModel } from "domain/SignalModel";
import { useCalculateSignal } from "hooks/useCalculateSignal";
import { useRepairSignal } from "hooks/useRepairSignal";
import React from "react";

export const MainPage: React.FC = () => {
  const [signals, setSignals] = React.useState<ReadonlyArray<SignalModel>>([]);
  const [resolution, setResolution] = React.useState(defaultResolutionModel);
  const [restoration, setRestoraction] = React.useState(
    defaultRestorationModel
  );

  const { status: calculatingStatus, points: calculatingPoints } =
    useCalculateSignal({ signals, resolution });

  const { status: repairingStatus, points: repairingPoints } = useRepairSignal({
    signal: calculatingPoints,
    restoration,
  });

  const onChangeResolution = (changes: Partial<ResolutionModel>) => {
    const newResolution = { ...resolution, ...changes };
    if (newResolution.step < defaultResolutionModel.step) {
      newResolution.step = defaultResolutionModel.step;
    }

    if (newResolution.max <= newResolution.min) {
      const temp = newResolution.max;
      newResolution.max = newResolution.min;
      newResolution.min = temp;
    }

    setResolution(newResolution);
  };

  const onChangeRestoration = (changes: Partial<RestorationModel>) => {
    setRestoraction({ ...restoration, ...changes });
  };

  return (
    <div className={styles.root}>
      <ResolutionInput
        className={styles.resolution}
        value={resolution}
        onChange={onChangeResolution}
      />

      <RestorationInput
        className={styles.restoration}
        value={restoration}
        onChange={onChangeRestoration}
      />

      <SignalsKeeper
        className={styles.signals}
        items={signals}
        onChange={setSignals}
      />

      <OriginalChart
        className={styles.incomeChart}
        points={calculatingPoints}
      />
      <OriginalChart className={styles.outcomeChart} points={repairingPoints} />

      <ErrorsTable
        className={styles.errors}
        signal={calculatingPoints}
        restoredSignal={repairingPoints}
        restoration={restoration}
      />
    </div>
  );
};
