import { Card, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    padding: `${theme.spacing(2)}px !important`,
  },
}));
export default function NoRecords() {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <Typography align="center">No records yet</Typography>
    </Card>
  );
}
