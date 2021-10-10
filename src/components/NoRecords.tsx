import Card from '@mui/material/Card';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    padding: `${theme.spacing(2)} !important`,
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
