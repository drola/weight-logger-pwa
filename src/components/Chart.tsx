import React, { RefObject } from "react";
import { Card, makeStyles, CardContent, useTheme } from "@material-ui/core";
import useResizeObserver from "use-resize-observer/polyfilled";
import { WeightLogRecord } from "../WeightLogRecord";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "1rem",
    minHeight: "max(20vh, 20vw)",
  },
  cardContent: {
    flex: 1,
    display: "flex",
    padding: `${theme.spacing(2)}px !important`,
  },
  svg: { flex: 1 },
}));

function weightLogDataToXY(
  data: Array<WeightLogRecord>,
  chartWidth: number,
  chartHeight: number
): Array<[number, number]> {
  let records = data.map((record) => ({
    timestamp: record.datetime.getTime(),
    weight: record.weight,
  }));

  let timeMin = 0;
  let timeMax = 1;
  let weightMin = 0;
  let weightMax = 1;
  let x1 = 0;
  let x2 = chartWidth;
  let y1 = chartHeight;
  let y2 = 0;

  records.sort((a, b) => a.timestamp - b.timestamp);
  if (records.length > 0) {
    timeMin = records[0].timestamp;
    timeMax = records[records.length - 1].timestamp;
    let weights = records.map((record) => record.weight);
    weightMin = Math.min(...weights);
    weightMax = Math.max(...weights);
  }

  let kTime = (x2 - x1) / (timeMax - timeMin);
  let kWeight = (y2 - y1) / (weightMax - weightMin);

  return records.map((record) => [
    (record.timestamp - timeMin) * kTime + x1,
    (record.weight - weightMin) * kWeight + y1,
  ]);
}

function xyToSvgPathData(xy: Array<[number, number]>) {
  return "M " + xy.map((xy) => `${xy[0]} ${xy[1]}`).join(" L ");
}

export default function Chart(props: { data: Array<WeightLogRecord> }) {
  const classes = useStyles();
  const theme = useTheme();

  const { ref, width = 300, height = 100 } = useResizeObserver();
  let d = xyToSvgPathData(weightLogDataToXY(props.data, width, height));

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent
        className={classes.cardContent}
        ref={(ref as unknown) as RefObject<HTMLDivElement>}
      >
        <svg preserveAspectRatio="none" className={classes.svg}>
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
