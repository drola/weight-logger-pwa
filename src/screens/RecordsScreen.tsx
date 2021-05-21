import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Chart from "../components/Chart";
import NoRecords from "../components/NoRecords";
import {
  selectWeightLogRecords,
  WeightLogRecordSlot,
} from "../state/weightLogRecords";
import Screen from "./Screen";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  tableRow: {
    cursor: "pointer",
  },
}));
export default withRouter(function RecordsScreen(props) {
  const classes = useStyles();

  let weightLogRecords = useSelector(selectWeightLogRecords);

  const handleClickRecord = (weightLogRecordSlot: WeightLogRecordSlot) => {
    props.history.push(`/edit/${weightLogRecordSlot.uid}`);
  };

  return (
    <Screen
      appBarContents={
        <Container>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Weight History
            </Typography>
            <Link to="/settings" style={{ color: "inherit" }}>
              <IconButton edge="end" color="inherit" aria-label="back">
                <SettingsIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </Container>
      }
      mainContents={
        <Container>
          {weightLogRecords.length ? (
            <>
              <Chart data={weightLogRecords.map((s) => s.record)} />
              <TableContainer style={{ overflowX: "visible" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weightLogRecords.map((row, i) => (
                      <TableRow
                        key={row.uid}
                        hover
                        className={classes.tableRow}
                        onClick={(e) => handleClickRecord(row)}
                      >
                        <TableCell component="th" scope="row">
                          {format(row.record.datetime, "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          {row.record.weight.toFixed(1)} kg
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <NoRecords />
          )}
        </Container>
      }
      fastActionButton={
        <Link to="/add">
          <Fab color="secondary">
            <AddIcon />
          </Fab>
        </Link>
      }
    />
  );
});
