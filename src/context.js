import React, { Component } from 'react'
import axios from 'axios'
const StockContext = React.createContext();

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function roundToTwo(num) {    
  return +(Math.round(num + "e+2")  + "e-2");
}

//store data into financialInfo data frame
export default class StockProvider extends Component {
  state = {
    companyInfo: [],
    financialInfo: [],
    wacc: '',
    stockPV: '',
    enterpriseVal: '',
    loading: true,
    input: '',
  }
  //Free limit reached, need to switch API
  getStock = (url,ticker,host,apikey) => {
    try {
      const res1 = axios({
        "method":"GET",
        "url":`${url}`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":`${host}`,
        "x-rapidapi-key":`${apikey}`,
        "useQueryString":true
        },"params":{
        "id":`${ticker}%3Aus`
        }
      })
      .then((response => {
        let data = response.data.result[0].table;
        let companyStatistics = {
          'P/E': data[0].value,
          'EPS': data[2].value,
        }
        //console.log(companyStatistics)
        this.setState({
          companyInfo: [companyStatistics],
          loading: false,
        })
      }))
      .catch((error) => {
        console.log(error)
      })
      
    } catch (e) {
      console.log(e)
    }
  }
  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      input: e.target.value
    }) 
  } 
  calcPE = (price,eps) => {
    let PE = price / eps;
    return PE
  }
  //Weighted average cost of capital
  calcWACC = (marketValueOfEquity, marketValueOfDebt, costOfEquity, costOfDebt, taxRate) => {
    let E = marketValueOfEquity;
    let D = marketValueOfDebt;
    let V = E + D;
    let Re = costOfEquity;
    let Rd = costOfDebt;
    let T = taxRate;

    let WACC = ((E / V) * Re/100) + (((D / V) * Rd/100) * (1 - T/100));
    return Math.round(WACC * 1000) / 10;
  }
  //Dividend growth rate to perp model
  stockPV = (g, ke, D) => {
    let stockValue = (D * (1 + g/100))/((ke/100) - (g/100))
    return Math.round(stockValue)
  }
  //Discounted cash flow model
  DCF = (wacc,cf,period) => {
    
  }
  costEquity = (beta,rf,rm) => {
    let costOfEquity = rf + (beta * (rm-rf))
    return Math.round(costOfEquity)
  }
  render() {
    return (
      <StockContext.Provider value={{...this.state,getStock: this.getStock, handleInput: this.handleInput}}>
        {this.props.children}
      </StockContext.Provider>
    )
  }
}

const StockConsumer = StockContext.Consumer;

export { StockProvider, StockConsumer, StockContext };
