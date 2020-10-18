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
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Chart from "../components/Chart";
import NoRecords from "../components/NoRecords";
import { selectWeightLogRecords } from "../state/weightLogRecords";
import Screen from "./Screen";

export default function RecordsScreen() {
  let weightLogRecords = useSelector(selectWeightLogRecords);
  return (
    <Screen
      appBarContents={
        <Container>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6">Weight History</Typography>
          </Toolbar>
        </Container>
      }
      mainContents={
        <Container>
          {weightLogRecords.length ? (
            <>
              <Chart data={weightLogRecords} />
              <TableContainer style={{ overflowX: "visible" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weightLogRecords.map(row => (
                      <TableRow key={row.datetime.toISOString()}>
                        <TableCell component="th" scope="row">
                          {format(row.datetime, "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          {row.weight.toFixed(1)} kg
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
          <Fab color="primary">
            <AddIcon />
          </Fab>
        </Link>
      }
    />
  );
}
