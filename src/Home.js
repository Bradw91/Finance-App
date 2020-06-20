import React, { Component } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StockData from './stockdata'
import {StockContext, StockConsumer} from './context'
import {BASE_COMPANY_INFO_URL, FINANCIAL_STATEMENT_URL, API_KEY } from './sources'

//map company info

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function roundToTwo(num) {    
  return +(Math.round(num + "e+2")  + "e-2");
}

class Home extends Component {
  static contextType = StockContext
  render(){
    const {getStock,handleInput,companyInfo,input} = this.context
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
        <Button onClick={() => getStock(BASE_COMPANY_INFO_URL,FINANCIAL_STATEMENT_URL,input, API_KEY)}>Search</Button>
        </div>
        <div>
        {companyInfo.map((item,index) => {
            if (companyInfo.indexOf(item) === 0) {
              return <img key={Math.random()} src={item} className='company-logo' alt='Company Logo'/>
            } else if (companyInfo.indexOf(item) === 1) {
              return <p className='stock-price'>{`Price: ${currencyFormat(item)}`}</p>
            } else if (companyInfo.indexOf(item) === 2){
              return <p className='market-cap'>{`Market Capitalization: ${currencyFormat(item)}`}</p>
            } else if (companyInfo.indexOf(item) === 3) {
              return <p className='beta'>{`Beta: ${item}`}</p>
            } else if (companyInfo.indexOf(item) === 4) {
              return <p className='revenue'>{`Revenue: ${currencyFormat(item)}`}</p>
            } else if (companyInfo.indexOf(item) === 5){
              return <p className='net-revenue'>{`Net Revenue: ${currencyFormat(item)}`}</p>
            } else if (companyInfo.indexOf(item) === 6) {
              return <p className='eps'>{`EPS: $${item}`}</p>
            } else if (companyInfo.indexOf(item) === 7) {
              return <p className='pe-ratio'>{`P/E Ratio: ${roundToTwo(item)}`}</p>
            }
          })} 
        </div>
        </>
    )
  }
}
export default Home;


