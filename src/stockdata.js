import React, { Component } from 'react'
import {BASE_COMPANY_INFO_URL, FINANCIAL_STATEMENT_URL} from './sources'
import {StockContext, StockConsumer} from './context'







export  default class StockData extends Component {
  static contextType = StockContext
  render(){
    let { loading, companyInfo, financialInfo, getStock, getFinancials } = this.context;
    return (
      console.log(companyInfo)
    )
  }
}



  



