import React, { Component } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {StockContext, StockConsumer} from './context'
import {BASE_COMPANY_INFO_URL, HOST_URL, API_KEY } from './sources'

//map company info

class Home extends Component {
  static contextType = StockContext
  render(){
    const {getStock,handleInput,financialInfo,input,companyInfo} = this.context
    return (
      <>
      <div>
        <TextField
          id="standard-full-width"
          label="Company"
          style={{ margin: 8 }}
          placeholder="Search for a Stock Ticker"
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={input}
          onChange={handleInput}
        />
        <Button onClick={() => getStock(BASE_COMPANY_INFO_URL,input,HOST_URL, API_KEY)}>Search</Button>
        </div>
        <div>
        <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Financial Information for {input}</TableCell>
          </TableRow>
        </TableHead>
        <div>
        {companyInfo.map((item,index) => {
          console.log(item)
        })}
        </div>
        <TableBody>
        {financialInfo.map((item) => {
            if (financialInfo.indexOf(item) === 0) {
              console.log(item)
            } else if (financialInfo.indexOf(item) === 1) {
              console.log(item) 
            } else if (financialInfo.indexOf(item) === 2){
              console.log(item)
            } else if (financialInfo.indexOf(item) === 3) {
              console.log(item)
            } else if (financialInfo.indexOf(item) === 4) {
              console.log(item)
            } else if (financialInfo.indexOf(item) === 5){
              console.log(item)
            } 
          })} 
        </TableBody>
      </Table>
    </Paper>
        </div>
        </>
    )
  }
}
export default Home;


