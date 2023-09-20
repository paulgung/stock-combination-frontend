import axios from 'axios';

const protocal = window.location.protocol;

const baseUrl =
  protocal === 'http:' ? `${protocal}//1.12.67.43/ths` : `${protocal}//www.paulgung.online/ths`;

// 获取组合信息
export async function getCombinationData(params?: { [key: string]: any }) {
  return axios(baseUrl + '/combination', {
    method: 'GET',
    params: params,
  });
}

// 获取子组合信息
export async function getSubcombinationData(params?: { [key: string]: any }) {
  return axios(baseUrl + '/subCombination', {
    method: 'GET',
    params: params,
  });
}

// 获取股票信息
export async function getStockData(params?: { [key: string]: any }) {
  return axios(baseUrl + '/stocks', {
    method: 'GET',
    params: params,
  });
}

// 新增组合信息
export async function addStockCombination(params?: { [key: string]: any }) {
  return axios(baseUrl + '/combination', {
    method: 'POST',
    params: params,
  });
}

// 新增子组合信息
export async function addSubStockCombination(params?: { [key: string]: any }) {
  return axios(baseUrl + '/subCombination', {
    method: 'POST',
    params: params,
  });
}

// 新增股票信息
export async function addStocks(params?: { [key: string]: any }) {
  return axios(baseUrl + '/stocks', {
    method: 'POST',
    params: params,
  });
}

// 修改组合信息
export async function updateStockCombination(params?: { [key: string]: any }) {
  return axios(baseUrl + '/combination', {
    method: 'PUT',
    params: params,
  });
}

// 修改子组合信息
export async function updateSubStockCombination(params?: { [key: string]: any }) {
  return axios(baseUrl + '/subCombination', {
    method: 'PUT',
    params: params,
  });
}

// 修改股票信息
export async function updateStocks(params?: { [key: string]: any }) {
  return axios(baseUrl + '/stocks', {
    method: 'PUT',
    params: params,
  });
}

// 删除组合信息
export async function deleteStockCombination(params?: { [key: string]: any }) {
  return axios(baseUrl + '/combination', {
    method: 'DELETE',
    params: params,
  });
}

// 删除子组合信息
export async function deleteSubStockCombination(params?: { [key: string]: any }) {
  return axios(baseUrl + '/subCombination', {
    method: 'DELETE',
    params: params,
  });
}

// 删除股票信息
export async function deleteStocks(params?: { [key: string]: any }) {
  return axios(baseUrl + '/stocks', {
    method: 'DELETE',
    params: params,
  });
}
