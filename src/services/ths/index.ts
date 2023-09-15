import axios from 'axios';

const baseUrl = 'http://localhost:3000/ths';

//获取组合信息
export async function getCombinationData(params?: { [key: string]: any }) {
  return axios(baseUrl + '/combination', {
    method: 'GET',
    params: params,
  });
}

//获取子组合信息
export async function getSubcombinationData(params?: { [key: string]: any }) {
  return axios(baseUrl + '/subCombination', {
    method: 'GET',
    params: params,
  });
}

//获取股票信息
export async function getStockData(params?: { [key: string]: any }) {
  return axios(baseUrl + '/stocks', {
    method: 'GET',
    params: params,
  });
}
