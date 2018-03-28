/* eslint-disable linebreak-style */
import request from '../utils/request';
import { convertUrl } from '../utils/utils';

// Template 增删改查
export async function viewTemplate(params) {
  const url = convertUrl('/skin/templateView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryTemplate(params) {
  const url = convertUrl('/skin/templatePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeTemplate(params) {
  const url = convertUrl('/skin/template', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addTemplate(params) {
  const url = convertUrl('/skin/template', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateTemplate(params) {
  const url = convertUrl('/skin/template', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// SkinUse 增删改查
export async function viewSkinUse(params) {
  const url = convertUrl('/skin/skinUseView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function querySkinUse(params) {
  const url = convertUrl('/skin/skinUsePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeSkinUse(params) {
  const url = convertUrl('/skin/skinUse', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addSkinUse(params) {
  const url = convertUrl('/skin/skinUse', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateSkinUse(params) {
  const url = convertUrl('/skin/skinUse', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// Skin 增删改查
export async function viewSkin(params) {
  const url = convertUrl('/skin/skinView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function querySkin(params) {
  const url = convertUrl('/skin/skinPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeSkin(params) {
  const url = convertUrl('skin/skin', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addSkin(params) {
  const url = convertUrl('skin/skin', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateSkin(params) {
  const url = convertUrl('skin/skin', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// SkinPage 增删改查
export async function viewSkinPage(params) {
  const url = convertUrl('/skin/pageView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function querySkinPage(params) {
  const url = convertUrl('skin/pagePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeSkinPage(params) {
  const url = convertUrl('skin/page', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addSkinPage(params) {
  const url = convertUrl('skin/page', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateSkinPage(params) {
  const url = convertUrl('skin/page', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
