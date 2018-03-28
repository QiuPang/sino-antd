/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    fdId: `${i}`,
    "fdLicenseId":"01247e1be8a8460b8cc1fecc24fb94d1",
    "fdUkeyNumber":"1001",
    "fdPlanId":"07964d529f0148ea8c82702b48da90d8",
    "fdSubjectId":"5a0c6a70d25c4aadb174ea5a1f810110",
    "fdPlaceId":"123123asdasdasdasda1",
    "fdSelectType":1,
    "fdType":1,
    "fdFaceType":3,
    "fdPrecision":500,
    "fdScore":85,
    "fdFaceReasult":1,
    "fdIdentityPrecision":550,
    "fdIdentityScore":86,
    "fdIdentityFaceReasult":1,
    "fdExamPrecision":450,
    "fdExamScore":86,
    "fdExamFaceReasult":1,
    "fdFacePhotoId":"4307d8d34e4a44d884aa4d4581b62ed5",
    "fdIdentityPhotoId":"5a52f53013094530b66d30a93880beb8",
    "fdIdentityNumber":"130633199201226813",
    "fdIdentityName":"张三",
    "fdIdentityValidity":"20",
    "fdGmtSelect":"2017-12-12 12:12:12",
    "fdFaceTimeLenght":5,
    "fdResultTimeLenght":8,
    "fdFaceTimes":2,
    "fdSyncState":2,
    "fdGmtCreate":"2017-12-12 12:12:12",
    "fdGmtModified":"2017-12-12 12:12:12",
    "fdIsDeleted":false,
    "fdLicense":"张晓晨",
    "fdPlanName":"2015年国家司法考试计划",
    "fdSubjectName":"科目9",
    "fdPlaceName":"石家庄市第一中学1",
  });
}
export function getDataPageMockData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);
  let dataSource = [...tableListDataSource];
  // 模拟根据查询条件过滤
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  // if (params.deExamName) {
  //   dataSource = dataSource.filter(data => data.deExamName.trim() === params.deExamName.trim());
  // }
  // if (params.deUnitId) {
  //   dataSource = dataSource.filter(data => data.deUnitId === params.deUnitId);
  // }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.current, 10) || 1,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getDataPageViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      faceDataVo: {
        "fdId":"dfdfsdfwerwer234234sdfdf",
        "fdLicenseId":"01247e1be8a8460b8cc1fecc24fb94d1",
        "fdUkeyNumber":"1001",
        "fdPlanId":"07964d529f0148ea8c82702b48da90d8",
        "fdSubjectId":"5a0c6a70d25c4aadb174ea5a1f810110",
        "fdPlaceId":"123123asdasdasdasda1",
        "fdSelectType":1,
        "fdType":1,
        "fdFaceType":1,
        "fdPrecision":500,
        "fdScore":85,
        "fdFaceReasult":1,
        "fdIdentityPrecision":550,
        "fdIdentityScore":86,
        "fdIdentityFaceReasult":1,
        "fdExamPrecision":450,
        "fdExamScore":86,
        "fdExamFaceReasult":1,
        "fdFacePhotoId":"4307d8d34e4a44d884aa4d4581b62ed5",
        "fdIdentityPhotoId":"5a52f53013094530b66d30a93880beb8",
        "fdIdentityNumber":"130633199201226813",
        "fdIdentityName":"张三",
        "fdIdentityValidity":"20",
        "fdGmtSelect":"2017-12-12 12:12:12",
        "fdFaceTimeLenght":5,
        "fdResultTimeLenght":8,
        "fdFaceTimes":2,
        "fdSyncState":2,
        "fdGmtCreate":"2017-12-12 12:12:12",
        "fdGmtModified":"2017-12-12 12:12:12",
        "fdIsDeleted":false,
        "fdLicense":"张晓晨",
        "fdPlanName":"2015年国家司法考试计划",
        "fdSubjectName":"科目9",
        "fdPlaceName":"石家庄市第一中学1",
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postDataPageMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, fdId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => fdId.indexOf(item.fdId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.fdId === fdId) {
            // item.deExamName = deExamName;
            // item.deExamRemark = deExamRemark;
            // item.deUnitName = deUnitName;
          }
          return item;
        }
      );
      break;
    case 'add':

      break;
    default:
      break;
  }

  const result = {
    status: '1',
    msg: '成功',
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getDataPageViewData,
  getDataPageMockData,
  postDataPageMockData,
};
