import React, { RefObject } from "react";
import { Card, makeStyles, CardContent, useTheme } from "@material-ui/core";
import useResizeObserver from "use-resize-observer/polyfilled";
import { WeightLogRecord } from "../WeightLogRecord";
import { weightLogDataToXY } from "../charts/weightLogDataToXY";
import { xyToSvgPathData } from "../charts/xyToSvgPathData";

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
