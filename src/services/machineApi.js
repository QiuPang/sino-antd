import { stringify } from 'qs';
import request from '../utils/request';
import { convertUrl } from '../utils/utils';

// UkeyUse 增删改查
export async function viewUkeyUse(params) {
  const url = convertUrl('/machine/ukeyUseView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryUkeyUse(params) {
  const url = convertUrl('/machine/ukeyUsePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeUkeyUse(params) {
  const url = convertUrl('/machine/ukeyUse', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addUkeyUse(params) {
  const url = convertUrl('/machine/ukeyUse', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateUkeyUse(params) {
  const url = convertUrl('/machine/ukeyUseState', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// Ukey 增删改查
export async function viewUkey(params) {
  const url = convertUrl('/machine/ukeyView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryUkey(params) {
  const url = convertUrl('/machine/ukeyPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeUkey(params) {
  const url = convertUrl('/machine/ukey', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addUkey(params) {
  const url = convertUrl('/machine/ukey', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateUkey(params) {
  const url = convertUrl('/machine/ukey', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// UkeyProgram 增删改查
export async function viewUkeyProgram(params) {
  const url = convertUrl('machine/ukeyProgramView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryUkeyProgram(params) {
  const url = convertUrl('/machine/ukeyProgramPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeUkeyProgram(params) {
  const url = convertUrl('/machine/ukeyProgram', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addUkeyProgram(params) {
  const url = convertUrl('/machine/ukeyProgram', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateUkeyProgram(params) {
  const url = convertUrl('/machine/ukeyProgram', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// BIllPlace 增删改查
export async function queryBillPlace(params) {
  const url = convertUrl('/machine/billPlacePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryBill(params) {
  const url = convertUrl('/machine/billPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
// Machine 增删改查
export async function viewMachine(params) {
  const url = convertUrl('machine/machineView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryMachine(params) {
  const url = convertUrl('/machine/machinePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeMachine(params) {
  const url = convertUrl('/machine/machine', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addMachine(params) {
  const url = convertUrl('/machine/machine', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateMachine(params) {
  const url = convertUrl('/machine/machine', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
