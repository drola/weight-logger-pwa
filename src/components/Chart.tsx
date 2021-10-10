import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React, { RefObject, useState } from "react";
import useResizeObserver from "use-resize-observer/polyfilled";

import { weightLogDataToXY } from "../charts/weightLogDataToXY";
import { xyToSvgPathData } from "../charts/xyToSvgPathData";
import { WeightLogRecord } from "../WeightLogRecord";
import max from "date-fns/max";
import sub from "date-fns/sub";
import isAfter from "date-fns/isAfter";

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
}));
export default function Chart(props: { data: Array<WeightLogRecord> }) {
  const classes = useStyles();
  const theme = useTheme();

  const { ref, width = 300, height = 100 } = useResizeObserver();
  const [timeRange, setTimeRange] = useState(TimeRange.ALL);

  let d = xyToSvgPathData(
    weightLogDataToXY(filterByTimeRange(props.data, timeRange), width, height)
  );

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.cardContent}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={timeRange}
          onChange={(e, v) => setTimeRange(v)}
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
