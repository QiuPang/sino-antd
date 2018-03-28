import request from '../utils/request';
import { stringify } from 'qs';
import { convertUrl } from '../utils/utils';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryRole(params) {
  const url = convertUrl('/login/userRoleListByUserId');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
