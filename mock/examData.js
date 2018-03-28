/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    dedId: `${i}`,
    dedName: `2017年司法考试数据包${i}`,
    dedRemark: '包含4000名考生',
    dedMd5: 'sdfsdfsdfsdfsdrwer234234',
    dedSize: 400,
    dedPlanName: '2017年司法考试',
    dedAreaName: '北京市',
    dedGmtCreate: '2017-12-12 12:12:12',
    dedGmtModified: '2017-12-12 12:12:12',
    dedIsDeleted: false,
  });
}
export function getExamDataSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);
  // 模拟根据查询条件过滤

  const result = {
    status: 1,
    msg: '成功',
    dataMain: {
      list: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '2017司法考试数据包1',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '2017司法考试数据包2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '2017司法考试数据包3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '2017司法考试数据包4',
        },
      ],
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getExamDataMockData(req, res, u) {
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
export function getExamDataViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataExamDataVo: {
        dedId: 'dfdfsdfwerwer234234sdfdf',
        dedName: '2017年司法考试数据包V1',
        dedRemark: '包含4000名考生',
        dedMd5: 'sdfsdfsdfsdfsdrwer234234',
        dedSize: 400,
        dedPlanId: 'dfdfsdfwerwer23423d4sdfdf2',
        dedPlanName: '2017年司法考试',
        dedAreaId: '110000',
        dedAreaName: '北京市',
        dedGmtCreate: '2017-12-12 12:12:12',
        dedGmtModified: '2017-12-12 12:12:12',
        dedIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postExamDataMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, dedId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => dedId.indexOf(item.dedId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.dedId === dedId) {
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
      //   dlExamData: body.dlExamData,
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
  getExamDataViewData,
  getExamDataMockData,
  postExamDataMockData,
  getExamDataSelectData,
};
