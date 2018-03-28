/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    mtId: `${i}`,
    mtName: '模板名称',
    mtMessage: '模板内容',
    mtWordsSum: '模板字数',
    mtState: '状态',
    mtPlanId: 'd1s2f3sd1f2sd31fd32sf',
    mtSuerId: 'd1s2f3sd1f2sd31fd32sf',
    mtAreaId: 'd1s2f3sd1f2sd31fd32sf',
    mtUnitId: 'd1s2f3sd1f2sd31fd32sf',
    planName: '司法考试',
    userName: '白晨星',
    areaName: '北京市',
    unitName: '信诺软通',
    mtGmtCreate: '2017-12-12 12:12:12',
    mtGmtModified: '2017-12-12 12:12:12',
    mtIsDeleted: false,
  });
}
export function getTemplatePageMockData(req, res, u) {
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
export function getTemplatePageViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      msgTemplateVo: {
        mtId: 'dfdfsdfwerwer234234sdfdf',
        mtName: '模板名称',
        mtMessage: '模板内容',
        mtWordsSum: '模板字数',
        mtState: '状态',
        mtPlanId: 'd1s2f3sd1f2sd31fd32sf',
        mtSuerId: 'd1s2f3sd1f2sd31fd32sf',
        mtAreaId: 'd1s2f3sd1f2sd31fd32sf',
        mtUnitId: 'd1s2f3sd1f2sd31fd32sf',
        planName: '司法考试',
        userName: '白晨星',
        areaName: '北京市',
        unitName: '信诺软通',
        mtGmtCreate: '2017-12-12 12:12:12',
        mtGmtModified: '2017-12-12 12:12:12',
        mtIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postTemplatePageMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, mtId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => mtId.indexOf(item.mtId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.mtId === mtId) {
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
  getTemplatePageViewData,
  getTemplatePageMockData,
  postTemplatePageMockData,
};
