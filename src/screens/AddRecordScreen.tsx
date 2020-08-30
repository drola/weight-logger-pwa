import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";

import RecordForm from "../RecordForm";
import Screen from "./Screen";
import { Link } from "react-router-dom";

export default function AddRecord() {
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
          <RecordForm />
        </Container>
      }
    />
  );
}
