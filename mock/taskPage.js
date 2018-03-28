/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    mtaId: `${i}`,
    mtaGmtCreate: '2017-12-12 12:12:12',
    mtaGmtModified: '2017-12-12 12:12:12',
    mtaMessage: '短信内容',
    mtaWordsSum: '100',
    mtaTotal: '200',
    mtaSuccessTotal: '200',
    mtaMoneyTotal: '200',
    mtaGmtPlan: '2017-12-12 12:12:12',
    mtaSize: '200',
    mtaState: '0',
    mtaPlanId: 'df123123werwer234234sdfdf',
    mtaSuerId: 'df123123werwer234234sdfdf',
    mtaAreaId: 'df123123werwer234234sdfdf',
    mtaUnitId: 'df123123werwer234234sdfdf',
    planName: '考试计划名称',
    areaName: '考区名称',
    userName: '用户名称',
    unitName: '用户单位名称',
    mtaType: '1',
    mtaRemark: '备注',
    mtaIsDeleted: false,
  });
}
export function getTaskPageMockData(req, res, u) {
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
export function getTaskPageViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      msgTaskVo: {
        mtaId: 'dfdfsdfwerwer234234sdfdf',
        mtaGmtCreate: '2017-12-12 12:12:12',
        mtaGmtModified: '2017-12-12 12:12:12',
        mtaMessage: '短信内容',
        mtaWordsSum: '100',
        mtaTotal: '200',
        mtaSuccessTotal: '200',
        mtaMoneyTotal: '200',
        mtaGmtPlan: '2017-12-12 12:12:12',
        mtaSize: '200',
        mtaState: '0',
        mtaPlanId: 'df123123werwer234234sdfdf',
        mtaSuerId: 'df123123werwer234234sdfdf',
        mtaAreaId: 'df123123werwer234234sdfdf',
        mtaUnitId: 'df123123werwer234234sdfdf',
        planName: '考试计划名称',
        areaName: '考区名称',
        userName: '用户名称',
        unitName: '用户单位名称',
        mtaType: '1',
        mtaRemark: '备注',
        mtaIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postTaskPageMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, mtaId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => mtaId.indexOf(item.mtaId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.mtaId === mtaId) {
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
  getTaskPageViewData,
  getTaskPageMockData,
  postTaskPageMockData,
};
