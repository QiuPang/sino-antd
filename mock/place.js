/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    dpId: `${i}`,
    dpPlanName: `北京市第${i}中学`,
    dpAreaName: '北京市',
    dpPlaceId: '010010101',
    dpPlaceName: `北京市第${i}中学考点`,
    dpPlaceAddr: '北京市丰台区总部基地12区',
    dpPlacePname: '北京市第11中学考点',
    dpRemark: '无',
    dpGmtCreate: '2017-12-12 12:12:12',
    dpGmtModified: '2017-12-12 12:12:12',
    dpDeleted: false,
  });
}
export function getPlaceMockData(req, res, u) {
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
export function getPlaceViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dpPlaceVo: {
        dpId: 'dfdfsdfwerwer234234sdfdf',
        dpPlanId: 'dfdfsdfwerwer23423d4sdfdf1',
        dpPlanName: '2017司法考试',
        dpAreaId: 'dfdfsdfwerwer23423d4sdfdf1',
        dpAreaName: '北京市',
        dpPlaceId: '010010101',
        dpPlaceName: '北京市第11中学考点',
        dpPlaceAddr: '北京市丰台区总部基地12区',
        dpPlacePname: '北京市第11中学考点',
        dpRemark: '无',
        dpIsDeleted: false,
        dpGmtCreate: '2017-12-12 12:12:12',
        dpGmtModified: '2017-12-12 12:12:12',
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postPlaceMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, dpId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => dpId.indexOf(item.dpId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.dpId === dpId) {
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
      //   dlPlace: body.dlPlace,
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
  getPlaceViewData,
  getPlaceMockData,
  postPlaceMockData,
};
