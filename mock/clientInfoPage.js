/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    fciId: `${i}`,
    "fciPlanId":"sdljklfkasdlkfjslkfdjalsdjf",
    "fciAreaId":"alkdsjflkajsdifwjeoijfwoiejf",
    "fciPlaceId":"asd4f65a4sd6fwe5v5d4va65s1dv65",
    "fciSubjectId":"as3d21vawe4va89s4d65f4",
    "fciUkeyNumber":"1001",
    "fciFaceType":1,
    "fciIdentityPrecision":500,
    "fciExamPrecision":450,
    "fciPcInfo":"Apple MacBookAir 15.5",
    "fciIpInfo":"112.113.45.369",
    "fciTimeInfo":"2017-12-12 12:12:12",
    "fciBatteryInfo":"72%",
    "fciState":1,
    "fciRemark":"司法考试终端设备电脑1",
    "fciIsLasted":false,
    "fciGmtCreate":"2017-12-12 12:12:12",
    "fciGmtModified":"2017-12-12 12:12:12",
    "fciIsDeleted":false,
  });
}
export function getClientInfoPageMockData(req, res, u) {
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
export function getClientInfoPageViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      faceClientInfoVo: {
        "fciId":"dfdfsdfwerwer234234sdfdf",
        "fciPlanId":"sdljklfkasdlkfjslkfdjalsdjf",
        "fciAreaId":"alkdsjflkajsdifwjeoijfwoiejf",
        "fciPlaceId":"asd4f65a4sd6fwe5v5d4va65s1dv65",
        "fciSubjectId":"as3d21vawe4va89s4d65f4",
        "fciUkeyNumber":"1001",
        "fciFaceType":1,
        "fciIdentityPrecision":500,
        "fciExamPrecision":450,
        "fciPcInfo":"Apple MacBookAir 15.5",
        "fciIpInfo":"112.113.45.369",
        "fciTimeInfo":"2017-12-12 12:12:12",
        "fciBatteryInfo":"72%",
        "fciState":1,
        "fciRemark":"司法考试终端设备电脑1",
        "fciIsLasted":false,
        "fciGmtCreate":"2017-12-12 12:12:12",
        "fciGmtModified":"2017-12-12 12:12:12",
        "fciIsDeleted":false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postClientInfoPageMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, fciId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => fciId.indexOf(item.fciId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.fciId === fciId) {
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
  getClientInfoPageViewData,
  getClientInfoPageMockData,
  postClientInfoPageMockData,
};
