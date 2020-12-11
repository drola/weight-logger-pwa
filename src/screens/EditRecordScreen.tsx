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
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";

import RecordForm from "../RecordForm";
import {
  deleteAction,
  makeGetWeightLogRecordSlot,
  updateAction,
} from "../state/weightLogRecords";
import { WeightLogRecord } from "../WeightLogRecord";
import Screen from "./Screen";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const useRecordSlot = (uid: string) =>
  useSelector(useCallback(makeGetWeightLogRecordSlot(uid), [uid]));

export default function EditRecordScreen() {
  const { uid } = useParams<{ uid: string }>();
  const slot = useRecordSlot(uid);
  let [record, setRecord] = useState<null | WeightLogRecord>(null);
  if (!record && slot) {
    setRecord(slot.record);
  }

  let [saved, setSaved] = useState(false);
  let [deleted, setDeleted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDelete = useCallback(() => {
    if (slot) {
      dispatch(deleteAction(slot));
      setDeleted(true);
      enqueueSnackbar("Deleted", { variant: "success" });
    }
  }, [slot]);

  const handleSave = useCallback(() => {
    if (record && slot) {
      dispatch(updateAction({ slot, updated: record }));
      setSaved(true);
      enqueueSnackbar("Saved", { variant: "success" });
    }
  }, [slot, record]);

  if (saved || deleted) {
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
          {record ? (
            <>
              <RecordForm record={record} onRecordChange={setRecord} />
              <Box my={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleSave}
                >
                  Update
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Container>
      }
    />
  );
}
