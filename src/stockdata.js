import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, financialData) {
  id += 1;
  return { id, name, financialData};
}
const data = [
  createData('Market Capitalization', 123),
  createData('Beta', 123),
  createData('Revenue', 123),
  createData('Net Revenue', 123),
  createData('EPS', 123),
  createData('P/E Ratio', 123),
];

function FinancialTable(props) {
  const { classes } = props;
  //consider passing state through different component type (like in home.js) or passing through props
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Financial Information for INSERT COMPANY</TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell numeric>{n.financialData}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}


FinancialTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinancialTable);

