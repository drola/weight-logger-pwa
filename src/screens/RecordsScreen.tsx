import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Chart from '../components/Chart';
import NoRecords from '../components/NoRecords';
import { selectWeightLogRecords, WeightLogRecordSlot } from '../state/weightLogRecords';
import Screen from './Screen';

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
            <IconButton edge="start" color="inherit" aria-label="back" size="large">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Weight History
            </Typography>
            <Link to="/settings" style={{ color: "inherit" }} aria-label="settings">
              <IconButton edge="end" color="inherit" aria-label="settings" size="large">
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
        <Link to="/add" aria-label="add a record to the weight log">
          <Fab color="secondary" aria-label="add a record to the weight log">
            <AddIcon />
          </Fab>
        </Link>
      }
    />
  );
});
