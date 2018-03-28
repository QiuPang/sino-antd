/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    dwId: `${i}`,
    dwWorkmanName: `白晨星${i}`,
    dwRole: '考点技术支持',
    dwUnit: '信诺',
    dwRemark: '技术支持',
    dwPhone: '1352323123123',
    dwPlanName: '2017年司法考试',
    dwAreaName: '北京市',
    dwGmtCreate: '2017-12-12 12:12:12',
    dwGmtModified: '2017-12-12 12:12:12',
    dwDeleted: false,
  });
}
export function getWorkManMockData(req, res, u) {
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
export function getWorkManViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataWorkmanVo: {
        dwId: 'dfdfsdfwerwer234234sdfdf',
        dwWorkmanName: '白晨星',
        dwRole: '考点技术支持',
        dwUnit: '信诺',
        dwRemark: '技术支持',
        dwPhone: '1352323123123',
        dwPlanId: 'dfdfsdfwerwer23423d4sdfdf1',
        dwPlanName: '2017年司法考试',
        dwAreaId: '110000',
        dwAreaName: '北京市',
        dwGmtCreate: '2017-12-12 12:12:12',
        dwGmtModified: '2017-12-12 12:12:12',
        dwDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postWorkManMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, dwId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => dwId.indexOf(item.dwId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.dwId === dwId) {
            // item.deExamName = deExamName;
            // item.deExamRemark = deExamRemark;
            // item.deUnitName = deUnitName;
          }
          return item;
        }
      );
      break;
    case 'add':
      // const i = Math.ceil(Math.random() * 10000);
      // tableListDataSource.unshift({
      //   dlId: `${i}`,
      //   dlExamineeName: body.dlExamineeName,
      //   dlIdentity: body.dlIdentity,
      //   dlWorkMan: body.dlWorkMan,
      //   dlAreaName: body.dlAreaName,
      //   dlPlanName: body.dlPlanName,
      //   dlSubjectName: body.dlSubjectName,
      //   dlGmtCreate: body.dlGmtCreate,
      //   dlGmtModified: body.dlGmtModified,
      //   deDeleted: false,
      // });
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
  getWorkManViewData,
  getWorkManMockData,
  postWorkManMockData,
};
