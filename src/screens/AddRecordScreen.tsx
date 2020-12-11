import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import RecordForm from "../RecordForm";
import { appendAction } from "../state/weightLogRecords";
import Screen from "./Screen";

export default function AddRecord() {
  let [record, setRecord] = useState({ datetime: new Date(), weight: 70 });
  let [saved, setSaved] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

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
            <Typography variant="h6">Add record</Typography>
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
              Save
            </Button>
          </Box>
        </Container>
      }
    />
  );
}
