import request from '../utils/request';
import { convertUrl } from '../utils/utils';
// exam 增删改查
export async function viewUnitData(params) {
  const url = convertUrl('/sys/unitView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryUnitData(params) {
  const url = convertUrl('/sys/unitPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeUnitData(params) {
  const url = convertUrl('/sys/unit', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addUnitData(params) {
  const url = convertUrl('/sys/unit', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateUnitData(params) {
  const url = convertUrl('/sys/unit', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
