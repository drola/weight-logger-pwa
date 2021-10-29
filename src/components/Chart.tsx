import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import makeStyles from "@mui/styles/makeStyles";
import { zip } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import isAfter from "date-fns/isAfter";
import max from "date-fns/max";
import sub from "date-fns/sub";
import React, { RefObject, useState } from "react";
import useResizeObserver from "use-resize-observer/polyfilled";

import { dateRange } from "../charts/dateRange";
import { weightsRange } from "../charts/weightsRange";
import { xyToSvgPathData } from "../charts/xyToSvgPathData";
import { WeightLogRecord } from "../WeightLogRecord";

enum TimeRange {
  ALL = "all",
  LAST_30_DAYS = "last_30_days",
}

function filterByTimeRange(
  data: WeightLogRecord[],
  timeRange: TimeRange
): WeightLogRecord[] {
  if (timeRange === TimeRange.ALL) {
    return data;
  } else if (timeRange === TimeRange.LAST_30_DAYS) {
    const last = max(data.map((v) => v.datetime));
    const threshold = sub(last, { days: 30 });
    return data.filter((v) => isAfter(v.datetime, threshold));
  } else {
    throw new Error("Unknown TimeRange");
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "1rem",
    minHeight: "max(20vh, 20vw)",
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(2)} !important`,
  },
  svg: { width: "100%", flex: 1 },
  timeRangeButtonGroup: {
    justifyContent: "flex-end",
  },
}));
export default function Chart(props: { data: Array<WeightLogRecord> }) {
  const classes = useStyles();
  const theme = useTheme();

  const { ref, width = 300, height = 100 } = useResizeObserver();
  const [timeRange, setTimeRange] = useState(TimeRange.ALL);

  const padding = {
    left: 30,
    right: 0,
    top: 10,
    bottom: 0,
  };

  const data = filterByTimeRange(props.data, timeRange);
  const dates = data.map((v) => v.datetime);
  const weights = data.map((v) => v.weight);
  const xScale = scaleTime(dateRange(dates), [
    padding.left,
    width - padding.right,
  ]);
  const yScale = scaleLinear(weightsRange(weights), [
    height - padding.bottom,
    padding.top,
  ]);
  const xs = dates.map(xScale);
  const ys = weights.map(yScale);
  let d = xyToSvgPathData(zip(xs, ys) as [number, number][]);

  const yTicks = yScale.ticks(5);

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.cardContent}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={timeRange}
          onChange={(e, v) => {
            if (v) {
              setTimeRange(v);
            }
          }}
          classes={{ root: classes.timeRangeButtonGroup }}
        >
          <ToggleButton value={TimeRange.ALL}>All</ToggleButton>
          <ToggleButton value={TimeRange.LAST_30_DAYS}>30 days</ToggleButton>
        </ToggleButtonGroup>
        <svg
          ref={ref as unknown as RefObject<SVGSVGElement>}
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          className={classes.svg}
        >
          <g>
            {yTicks.map((y) => (
              <line
                key={y}
                x1="0"
                x2={width - padding.right}
                y1={yScale(y)}
                y2={yScale(y)}
                strokeWidth="1"
                stroke={theme.palette.grey[300]}
              />
            ))}
          </g>
          <g>
            {yTicks.map((y) => (
              <text
                key={y}
                x="0"
                y={yScale(y) - 3}
                style={{ ...theme.typography.body1, fontSize: "0.7rem" }}
                fill={theme.palette.grey[500]}
              >
                {y.toFixed(1)}
              </text>
            ))}
          </g>
          <path
            d={d}
            stroke={theme.palette.primary.main}
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </CardContent>
    </Card>
  );
}
