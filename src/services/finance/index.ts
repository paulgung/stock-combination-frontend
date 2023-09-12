import axios from 'axios';

const baseUrl = 'http://localhost:3000/finance';

//获取page1的data
export async function getDataPage1(params?: { [key: string]: any }) {
  return axios(baseUrl + '/page1', {
    method: 'GET',
    params: params,
  });
}

//获取page2的data
export async function getDataPage2(params?: { [key: string]: any }) {
  return axios(baseUrl + '/page2', {
    method: 'GET',
    params: params,
  });
}

//获取page3的data
export async function getDataPage3(params?: { [key: string]: any }) {
  return axios(baseUrl + '/page3', {
    method: 'GET',
    params: params,
  });
}


//增加page1的data
export async function addDataPage1(params?: { [key: string]: any }) {
  return axios(baseUrl + '/page1', {
    method: 'POST',
    ...(params || {}),
  });
}

//增加page2的data
export async function addDataPage2(params?: { [key: string]: any }) {
  return axios(baseUrl + '/page2', {
    method: 'POST',
    ...(params || {}),
  });
}

//增加page3的data
export async function addDataPage3(params?: { [key: string]: any }) {
  return axios(baseUrl + '/page3', {
    method: 'POST',
    ...(params || {}),
  });
}

