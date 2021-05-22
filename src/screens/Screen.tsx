import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  fabContainer: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 3,
  },
  fabPlaceholder: {
    padding: theme.spacing(2),
    opacity: 0,
    pointerEvents: "none",
  },
  grid: {
    height: "100%",
  },
  gridItemStretch: {
    flex: 1,
    overflow: "auto",
  },
}));

export default function Screen(props: {
  appBarContents: React.ReactNode;
  mainContents: React.ReactNode;
  fastActionButton?: React.ReactNode;
}) {
  const { appBarContents, mainContents, fastActionButton } = props;
  const classes = useStyle();

  return (
    <Grid className={classes.grid} container direction="column">
      <AppBar position="static">{appBarContents}</AppBar>
      <Grid item className={classes.gridItemStretch}>
        {mainContents}
        {fastActionButton ? (
          <>
            <div className={classes.fabPlaceholder}>{fastActionButton}</div>
            <div className={classes.fabContainer}>{fastActionButton}</div>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
}
