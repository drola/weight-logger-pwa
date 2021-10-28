import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import makeStyles from "@mui/styles/makeStyles";
import { zip } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleTime } from "d3-scale";
import { select } from "d3-selection";
import isAfter from "date-fns/isAfter";
import max from "date-fns/max";
import sub from "date-fns/sub";
import React, { RefObject, useEffect, useRef, useState } from "react";
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
    justifyContent: "end",
  },
}));
export default function Chart(props: { data: Array<WeightLogRecord> }) {
  const classes = useStyles();
  const theme = useTheme();

  const { ref, width = 300, height = 100 } = useResizeObserver();
  const bottomAxisRef = useRef<SVGGElement>();
  const leftAxisRef = useRef<SVGGElement>();
  const [timeRange, setTimeRange] = useState(TimeRange.ALL);

  const showXScale = false;
  const showYScale = false;

  const padding = {
    left: showYScale ? 30 : 0,
    right: 0,
    top: 10,
    bottom: showXScale ? 55 : 0,
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

  useEffect(() => {
    if (showYScale) {
      const aLeft = axisLeft(yScale).ticks(5);
      aLeft(select(leftAxisRef.current as SVGGElement).html(""));
    }

    if (showXScale) {
      const aBottom = axisBottom(xScale).ticks(8);
      select(bottomAxisRef.current as SVGGElement)
        .html("")
        .call(aBottom)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "translate(3 12) rotate(-45)")
        .attr("y", 0)
        .attr("dy", 0)
        .attr("dx", 0);
    }
  });

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.cardContent}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={timeRange}
          onChange={(e, v) => setTimeRange(v)}
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
          <g
            ref={bottomAxisRef as unknown as RefObject<SVGGElement>}
            transform={`translate(0 ${height - padding.bottom})`}
          ></g>
          <g
            ref={leftAxisRef as unknown as RefObject<SVGGElement>}
            transform={`translate(${padding.left} 0)`}
          ></g>
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
