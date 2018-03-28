import { stringify } from 'qs';
import request from '../utils/request';
import { convertUrl } from '../utils/utils';

// TemplatePage 增删改查
export async function viewTemplatePage(params) {
  const url = convertUrl('/msg/templateView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryTemplatePage(params) {
  const url = convertUrl('/msg/templatePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeTemplatePage(params) {
  const url = convertUrl('/msg/template', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addTemplatePage(params) {
  const url = convertUrl('/msg/template', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateTemplatePage(params) {
  const url = convertUrl('/msg/template', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

// TaskPage 增删改查
export async function viewTaskPage(params) {
  const url = convertUrl('/msg/taskView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryTaskPage(params) {
  const url = convertUrl('/msg/taskPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeTaskPage(params) {
  const url = convertUrl('/msg/task', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addTaskPage(params) {
  const url = convertUrl('/msg/task', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateTaskPage(params) {
  const url = convertUrl('/msg/task', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

// sendRecordPage 增删改查
export async function viewSendRecordPage(params) {
  const url = convertUrl('/msg/sendRecordView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function querySendRecordPage(params) {
  const url = convertUrl('/msg/sendRecordPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeSendRecordPage(params) {
  const url = convertUrl('/msg/sendRecord', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addSendRecordPage(params) {
  const url = convertUrl('/msg/sendRecord', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateSendRecordPage(params) {
  const url = convertUrl('/msg/sendRecord', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
