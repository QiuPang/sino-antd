/* eslint-disable linebreak-style */
import { stringify } from 'qs';
import request from '../utils/request';
import { convertUrl } from '../utils/utils';

// dataPage
export async function viewDataPage(params) {
  const url = convertUrl('/face/dataView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryDataPage(params) {
  const url = convertUrl('/face/dataPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeDataPage(params) {
  const url = convertUrl('/face/data', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addDataPage(params) {
  const url = convertUrl('/face/data', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateDataPage(params) {
  const url = convertUrl('/face/data', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

// ClientInfo
export async function viewClientInfoPage(params) {
  const url = convertUrl('/face/clientInfoView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryClientInfoPage(params) {
  const url = convertUrl('/face/clientInfoPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeClientInfoPage(params) {
  const url = convertUrl('/face/clientInfo', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addClientInfoPage(params) {
  const url = convertUrl('/face/clientInfo', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateClientInfoPage(params) {
  const url = convertUrl('/face/clientInfo', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
