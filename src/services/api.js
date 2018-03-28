import { stringify } from 'qs';
import request from '../utils/request';
import { convertUrl } from '../utils/utils';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}
// menu
export async function queryMenu(params) {
  const url = convertUrl('/login/menuListByRoleId');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
// select外键
export async function queryUnitSelect(params) {
  const url = convertUrl('/sys/unitSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryExamNameSelect(params) {
  const url = convertUrl('/data/examSelect');
  return request(url, {
    method: 'POST',
    body: {
      params,
    },
  });
}
export async function queryExamPlanNameSelect(params) {
  const url = convertUrl('/data/examPlanSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function querySubjectSelect(params) {
  const url = convertUrl('/data/subjectSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryAreaSelect(params) {
  const url = convertUrl('/data/areaSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryExamDataSelect(params) {
  const url = convertUrl('/data/examDataSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryMachineSelect(params) {
  const url = convertUrl('/machine/machineSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryUkeyProgramSelect(params) {
  const url = convertUrl('/machine/ukeyProgramSelect');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
// exam 增删改查
export async function viewExam(params) {
  const url = convertUrl('/data/examView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryExam(params) {
  const url = convertUrl('/data/examPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeExam(params) {
  const url = convertUrl('/data/exam', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addExam(params) {
  const url = convertUrl('/data/exam', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateExam(params) {
  const url = convertUrl('/data/exam', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// examPlan 增删改查
export async function viewExamPlan(params) {
  const url = convertUrl('/data/examPlanView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryExamPlan(params) {
  const url = convertUrl('/data/examPlanPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeExamPlan(params) {
  const url = convertUrl('/data/examPlan', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addExamPlan(params) {
  const url = convertUrl('/data/examPlan', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateExamPlan(params) {
  const url = convertUrl('/data/examPlan', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// License 增删改查
export async function viewLicense(params) {
  const url = convertUrl('/data/licenseView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function viewExaminee(params) {
  const url = convertUrl('/data/examineeView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function viewPhoto(params) {
  const url = convertUrl('/data/photoView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryLicense(params) {
  const url = convertUrl('/data/licensePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeLicense(params) {
  const url = convertUrl('/data/license', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addLicense(params) {
  const url = convertUrl('/data/license', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateLicense(params) {
  const url = convertUrl('/data/license', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// WorkMan 增删改查
export async function viewWorkMan(params) {
  const url = convertUrl('/data/workManView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryWorkMan(params) {
  const url = convertUrl('/data/workManPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeWorkMan(params) {
  const url = convertUrl('/data/workMan', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addWorkMan(params) {
  const url = convertUrl('/data/workMan', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateWorkMan(params) {
  const url = convertUrl('/data/workMan', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// place 增删改查
export async function viewPlace(params) {
  const url = convertUrl('/data/placeView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryPlace(params) {
  const url = convertUrl('/data/placePage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removePlace(params) {
  const url = convertUrl('/data/place', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addPlace(params) {
  const url = convertUrl('/data/place', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updatePlace(params) {
  const url = convertUrl('/data/place', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// examData 增删改查
export async function viewExamData(params) {
  const url = convertUrl('/data/examDataView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function queryExamData(params) {
  const url = convertUrl('/data/examDataPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeExamData(params) {
  const url = convertUrl('/data/examData', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addExamData(params) {
  const url = convertUrl('/data/examData', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateExamData(params) {
  const url = convertUrl('/data/examData', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
// subject 增删改查
export async function viewSubject(params) {
  const url = convertUrl('/data/subjectView');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function querySubject(params) {
  const url = convertUrl('/data/subjectPage');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
export async function removeSubject(params) {
  const url = convertUrl('/data/subject', 'Remove');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}
export async function addSubject(params) {
  const url = convertUrl('/data/subject', 'Save');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}
export async function updateSubject(params) {
  const url = convertUrl('/data/subject', 'Update');
  return request(url, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}


export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

// 登陆
export async function fakeAccountLogin(params) {
  return request('/login/userLogin', {
    method: 'POST',
    body: params,
  });
}
// 更新session
export async function postSessionUpdate(params) {
  const url = convertUrl('/login/userRoleSessionUpdate');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
// 更新session
export async function getUserBySession(params) {
  const url = convertUrl('/login/userViewBySession');
  return request(url, {
    method: 'POST',
    body: params,
  });
}
// 更新examPlanSession
export async function postExamPlanSessionUpdate(params) {
  const url = convertUrl('/login/examPlanSessionUpdate');
  return request(url, {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
// if (process.env.NODE_ENV === 'production') {
//
// }
