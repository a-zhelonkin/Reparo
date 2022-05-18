import { OriginalChart } from "components/main/charts/OriginalChart/OriginalChart";
import { ResolutionInput } from "components/main/charts/ResolutionInput/ResolutionInput";
import styles from "components/main/MainPage.scss";
import { SignalsKeeper } from "components/main/signals/SignalsKeeper/SignalsKeeper";
import {
  defaultResolutionModel,
  ResolutionModel,
} from "domain/ResolutionModel";
import { SignalModel } from "domain/SignalModel";
import { useCalculateSignal } from "hooks/useCalculateSignal";
import React from "react";

export const MainPage: React.FC = () => {
  const [signals, setSignals] = React.useState<ReadonlyArray<SignalModel>>([]);
  const [resolution, setResolution] = React.useState(defaultResolutionModel);

  const { status, points } = useCalculateSignal({ signals, resolution });

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

  return (
    <div className={styles.root}>
      <ResolutionInput
        className={styles.resolution}
        value={resolution}
        onChange={onChangeResolution}
      />

      <SignalsKeeper
        className={styles.signals}
        items={signals}
        onChange={setSignals}
      />

      <OriginalChart className={styles.charts} points={points} />
    </div>
  );
};
