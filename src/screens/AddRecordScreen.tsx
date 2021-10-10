import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
            <Link to="/" style={{ color: "inherit" }} aria-label="back">
              <IconButton edge="start" color="inherit" aria-label="back" size="large">
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
              aria-label="append weight to the log"
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
