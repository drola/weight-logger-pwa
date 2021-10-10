import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
/*import {
  generateAuthorizationLink,
  tryReceiveDropboxToken,
  tryToParseCodeFromUrl,
} from "../oauth";*/
import {
  clearDataAction as clearWeightLogRecordsDataAction,
  importDataAction,
  selectWeightLogRecords,
} from "../state/weightLogRecords";
import { clearDataAction as clearStorageConnectionsDataAction } from "../state/storageConnections";

import Screen from "./Screen";
import { useSnackbar } from "notistack";
import FileSaver from "file-saver";
import { serializeWeightLog } from "../weightLogDataFormat/serializer";
import { parseWeightLog } from "../weightLogDataFormat/parser";

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

  const weightLogRecords = useSelector(selectWeightLogRecords);

  const handleDownloadDataAsCSV = () => {
    const blob = new Blob(
      [serializeWeightLog(weightLogRecords.map((slot) => slot.record))],
      {
        type: "text/csv;charset=utf-8",
      }
    );
    FileSaver.saveAs(blob, "weight_log.csv");
  };

  const [clearedData, setClearedData] = useState(false);
  const [importedData, setImportedData] = useState(false);
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

  const importCSVInputFile = useRef<HTMLInputElement>(null);
  const handleImportCSVClicked = () => {
    if (!importCSVInputFile.current) {
      return;
    }
    importCSVInputFile.current.click();
  };
  const handleImportCSVFileInputChange = () => {
    if (!importCSVInputFile.current || !importCSVInputFile.current.files) {
      return;
    }
    for (const file of importCSVInputFile.current.files) {
      file.text().then((text) => {
        const records = parseWeightLog(text);
        if (records.length) {
          dispatch(importDataAction({ records }));
          enqueueSnackbar(`Imported ${records.length} log entries`, {
            variant: "success",
          });
          setImportedData(true);
        } else {
          enqueueSnackbar(`No records found in given file`, {
            variant: "warning",
          });
        }
      });
    }
  };

  if (clearedData || importedData) {
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
                Import data
              </Typography>
              <Typography variant="body1" component="p">
                Import data from a CSV file
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                aria-label="Import data from a CSV file"
                color="primary"
                onClick={handleImportCSVClicked}
              >
                Import CSV
              </Button>
              <input
                type="file"
                style={{ display: "none" }}
                ref={importCSVInputFile}
                onChange={handleImportCSVFileInputChange}
              />
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
