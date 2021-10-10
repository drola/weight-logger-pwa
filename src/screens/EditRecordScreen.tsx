import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import React, { useMemo, useState } from "react";
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
  useSelector(useMemo(() => makeGetWeightLogRecordSlot(uid), [uid]));

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

  const handleDelete = () => {
    if (slot) {
      dispatch(deleteAction(slot));
      setDeleted(true);
      enqueueSnackbar("Deleted", { variant: "success" });
    }
  };

  const handleSave = () => {
    if (record && slot) {
      dispatch(updateAction({ slot, updated: record }));
      setSaved(true);
      enqueueSnackbar("Saved", { variant: "success" });
    }
  };

  if (saved || deleted) {
    return <Redirect to="/" />;
  }

  return (
    <Screen
      appBarContents={
        <Container>
          <Toolbar>
            <Link to="/" style={{ color: "inherit" }} aria-label="back">
              <IconButton edge="start" color="inherit" aria-label="back" size="large">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Edit record
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDelete}
              aria-label="delete this record"
              size="large">
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
                  aria-label="save changes"
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
