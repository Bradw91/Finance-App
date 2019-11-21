import React, { Component } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import StockData from './stockdata'
import {StockContext, StockConsumer} from './context'
import {BASE_COMPANY_INFO_URL, FINANCIAL_STATEMENT_URL} from './sources'

//map company info

class Home extends Component {
  static contextType = StockContext

  render(){
    const {getStock,handleInput,companyInfo,input} = this.context
    return (
      <>
      <div>
        <TextField
          id="standard-full-width"
          label="Search"
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
        <Button onClick={() => getStock(BASE_COMPANY_INFO_URL,input)}>Search</Button>
        </div>
        
        <div>
          <ul>
            {companyInfo.map((item,index) => {
              return <li key={index}>{item}</li>
            })}
          </ul> 
        </div>
        </>
    )
  }
}
export default Home;