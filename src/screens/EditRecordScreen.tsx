import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import RecordForm from "../RecordForm";
import { appendAction } from "../state/weightLogRecords";
import Screen from "./Screen";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function EditRecordScreen() {
  let [record, setRecord] = useState({ datetime: new Date(), weight: 70 });
  let [saved, setSaved] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDelete = () => {
    console.log("Delete");
  };

  if (saved) {
    return <Redirect to="/" />;
  }

  return (
    <Screen
      appBarContents={
        <Container>
          <Toolbar>
            <Link to="/" style={{ color: "inherit" }}>
              <IconButton edge="start" color="inherit" aria-label="back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Edit record
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </Container>
      }
      mainContents={
        <Container>
          <RecordForm record={record} onRecordChange={setRecord} />
          <Box my={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={(e) => {
                dispatch(appendAction(record));
                setSaved(true);
                enqueueSnackbar("Saved", { variant: "success" });
              }}
            >
              Update
            </Button>
          </Box>
        </Container>
      }
    />
  );
}
