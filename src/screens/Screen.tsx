import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import React from "react";

const useStyle = makeStyles({
  grid: {
    height: "100%",
  },
  gridItemStretch: {
    flex: 1,
    overflow: "auto",
  },
});

export default function Screen(props: {
  appBarContents: React.ReactNode;
  mainContents: React.ReactNode;
}) {
  const { appBarContents, mainContents } = props;
  const classes = useStyle();

  return (
    <Grid className={classes.grid} container direction="column">
      <AppBar position="static">{appBarContents}</AppBar>
      <Grid item className={classes.gridItemStretch}>
        {mainContents}
      </Grid>
    </Grid>
  );
}
