import { Point } from "domain/Point";
import React from "react";
import { Chart } from "react-google-charts";

interface Props {
  readonly className?: string;
  readonly points: ReadonlyArray<Point>;
}

export const OriginalChart: React.FC<Props> = ({ className, points }) => {
  const data = React.useMemo(() => {
    const result: Array<string | number>[] = [["x", "y"]];
    points.forEach((point) => {
      result.push([point.x, point.y]);
    });

    if (result.length === 1) {
      result.push([0, 0]);
    }

    return result;
  }, [points]);

  return (
    <div className={className}>
      <Chart
        chartType={"LineChart"}
        width={"100%"}
        height={"100%"}
        data={data}
        options={{ legend: "none" }}
      />
    </div>
  );
};
