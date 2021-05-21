import { Box, Chip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  generateAuthorizationLink,
  tryReceiveDropboxToken,
  tryToParseCodeFromUrl,
} from "../oauth";

import Screen from "./Screen";

export default function SettingsScreen() {
  useEffect(() => {
    const code = tryToParseCodeFromUrl();
    if (code) {
      tryReceiveDropboxToken("http://localhost:3000/settings");
    }
  }, []);

  const handleConnectToDropbox = useCallback(() => {
    window.location.href = generateAuthorizationLink(
      "http://localhost:3000/settings"
    );
  }, []);

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
            <Typography variant="h6">Settings</Typography>
          </Toolbar>
        </Container>
      }
      mainContents={
        <Container>
          <br />
          <Card variant="outlined">
            <CardContent>
              <Box
                flexDirection="row"
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h5" component="h2">
                    Dropbox
                  </Typography>
                </Box>
                <Box>
                  <Chip color="secondary" label="Coming Soon" />
                </Box>
              </Box>
              <Typography variant="body1" component="p">
                Use your Dropbox account to save and sync the log across
                devices.
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={handleConnectToDropbox}>
                Connect to Dropbox
              </Button>
            </CardActions>
          </Card>
        </Container>
      }
    />
  );
}
