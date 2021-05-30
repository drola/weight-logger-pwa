import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
/*import {
  generateAuthorizationLink,
  tryReceiveDropboxToken,
  tryToParseCodeFromUrl,
} from "../oauth";*/
import { clearDataAction as clearWeightLogRecordsDataAction, selectWeightLogRecords } from "../state/weightLogRecords";
import { clearDataAction as clearStorageConnectionsDataAction } from "../state/storageConnections";

import Screen from "./Screen";
import { useSnackbar } from "notistack";
import FileSaver from "file-saver";
import { serializeWeightLog } from "../weightLogDataFormat/serializer";

const useStyles = makeStyles({
  redButton: {
    color: "red",
  },
});

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   const code = tryToParseCodeFromUrl();
  //   if (code) {
  //     tryReceiveDropboxToken("http://localhost:3000/settings");
  //   }
  // }, []);

  const handleConnectToDropbox = () => {
    // window.location.href = generateAuthorizationLink(
    //   "http://localhost:3000/settings"
    // );
  };

  const weightLogRecords = useSelector(selectWeightLogRecords)

  const handleDownloadDataAsCSV = () => {
    const blob = new Blob([serializeWeightLog(weightLogRecords.map(slot => slot.record))], {
      type: "text/csv;charset=utf-8",
    });
    FileSaver.saveAs(blob, "weight_log.csv");
  };

  const [clearedData, setClearedData] = useState(false);
  const [clearDataConfirmationDialogOpen, setClearDataConfirmationDialogOpen] =
    useState(false);
  const handleClearDataConfirmationDialogClose = () => {
    setClearDataConfirmationDialogOpen(false);
  };
  const handleClearDataConfirmed = () => {
    dispatch(clearWeightLogRecordsDataAction({}));
    dispatch(clearStorageConnectionsDataAction({}));
    setClearDataConfirmationDialogOpen(false);
    enqueueSnackbar("Data Cleared", { variant: "success" });
    setClearedData(true);
  };
  const handleClearData = () => {
    setClearDataConfirmationDialogOpen(true);
  };

  const classes = useStyles();

  if (clearedData) {
    return <Redirect to="/" />;
  }

  return (
    <Screen
      appBarContents={
        <Container>
          <Toolbar>
            <Link to="/" style={{ color: "inherit" }} aria-label="back">
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
          <Dialog
            open={clearDataConfirmationDialogOpen}
            onClose={handleClearDataConfirmationDialogClose}
          >
            <DialogContent>
              <DialogContentText>
                Are you sure you want to clear all data from this app, including
                the settings?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                aria-label="cancel clearing the data"
                onClick={handleClearDataConfirmationDialogClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                aria-label="confirm clearing the data"
                onClick={handleClearDataConfirmed}
                className={classes.redButton}
              >
                Clear Data
              </Button>
            </DialogActions>
          </Dialog>
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
              <Button
                aria-label="connect to Dropbox"
                color="primary"
                onClick={handleConnectToDropbox}
              >
                Connect to Dropbox
              </Button>
            </CardActions>
          </Card>
          <br />
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Download data
              </Typography>
              <Typography variant="body1" component="p">
                Download all your data as a CSV file
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                aria-label="Download data as CSV"
                color="primary"
                onClick={handleDownloadDataAsCSV}
              >
                Download CSV
              </Button>
            </CardActions>
          </Card>
          <br />
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Clear Data
              </Typography>
              <Typography variant="body1" component="p">
                Remove all data, including settings.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                aria-label="clear all weight logger data"
                onClick={handleClearData}
                className={classes.redButton}
              >
                Clear Data
              </Button>
            </CardActions>
          </Card>
        </Container>
      }
    />
  );
}
