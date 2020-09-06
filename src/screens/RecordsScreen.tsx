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
import React from "react";
import { Link } from "react-router-dom";

import Screen from "./Screen";
import Chart from "../components/Chart";
import { format } from "date-fns";

function createData(datetime: string, weight: number) {
  return { datetime: new Date(datetime), weight };
}

const rows = [
  createData("2020/08/13", 70.5),
  createData("2020/08/12", 71.0),
  createData("2020/08/11", 70.0),
  createData("2020/08/10", 70.5),
  createData("2020/08/09", 71.0),
  createData("2020/08/08", 70.0),
  createData("2020/08/07", 70.5),
  createData("2020/08/06", 70.2),
  createData("2020/08/05", 70.1),
  createData("2020/08/04", 71.0),
  createData("2020/08/03", 72.5),
  createData("2020/08/02", 72.5),
  createData("2020/08/01", 73.0),
];

export default function RecordsScreen() {
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
          <Chart data={rows} />
          <TableContainer style={{ overflowX: "visible" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Weight</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
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
