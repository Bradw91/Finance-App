import React, { Component } from 'react'
import axios from 'axios'
const StockContext = React.createContext();
//create API calls inside of context, call functions inside of other component

// const getData = async () => {
//   try{
//     const res = await axios.get(`${BASE_COMPANY_INFO_URL}/AAPL`);

//     const data = res.data;

//     console.log(data);
//     return data
//   } catch (e) {
//     console.error(e);
//   }
// }

//data.profile.price, mktCap, beta, image, website
export default class StockProvider extends Component {
  state = {
    companyInfo: [],
    financialInfo: [],
    wacc: '',
    stockPV: '',
    enterpriseVal: '',
    loading: false,
    input: '',
  }
  getStock = async (url,ticker) => {
    try {
      const res = await axios.get(`${url}${ticker}`);
      const data = res.data;
      this.setState({
        companyInfo: [data.profile.price,data.profile.mktCap,data.profile.beta,data.profile.image,data.profile.website]
      })
      //console.log(this.state.companyInfo)
      return data
    } catch (e) {
      console.log(e)
    }
  }
  handleInput = (e) => {
    this.setState({
      input: e.target.value
    }) 
  } 
  getFinancials = async (url,ticker) => {
    try {
      const res = await axios.get(`${url}/${ticker}`);
      const data = res.data;
      console.log(data)
      return data
    } catch (e){
      alert.error(e)
    }
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
  DCF = () => {

  }
  render() {
    return (
      <StockContext.Provider value={{...this.state,getStock: this.getStock,getFinancials: this.getFinancials, handleInput: this.handleInput}}>
        {this.props.children}
      </StockContext.Provider>
    )
  }
}

const StockConsumer = StockContext.Consumer;

export { StockProvider, StockConsumer, StockContext };
