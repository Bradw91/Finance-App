import axios from 'axios'
export const BASE_COMPANY_INFO_URL = 'https://financialmodelingprep.com/api/v3/company/profile/'

export const FINANCIAL_STATEMENT_URL = 'https://financialmodelingprep.com/api/v3/financials/income-statement/'

const getData = async () => {
  try{
    const res = await axios.get(`${BASE_COMPANY_INFO_URL}/AAPL`);

    const data = res.data;

    console.log(data);
    return data
  } catch (e) {
    console.error(e);
  }
}

