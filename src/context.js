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

  getStock = async (url,url2,ticker,apikey) => {
    try {
      const res1 = await axios.get(`${url}${ticker}?apikey=${apikey}`);
      const data1 = res1.data;
      const res2 = await axios.get(`${url2}${ticker}?apikey=${apikey}`)
      const data2 = res2.data;
      const PE = data1[0].price / data2[0].eps;
      console.log(data1)
      this.setState({
        companyInfo: [data1[0].companyName,data1[0].price],
        financialInfo: [currencyFormat(data1[0].mktCap),roundToTwo(data1[0].beta),currencyFormat(data2[0].revenue),currencyFormat(data2[0].netIncome),currencyFormat(data2[0].eps), roundToTwo(PE)],
        loading: false,
      })
      return data1
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
