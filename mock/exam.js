/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    deId: `${i}`,
    deUnitId: 'dfdfsdfwerwer23423d4sdfdf2',
    deUnitName: `司法部 ${i}`,
    deExamName: `司法考试${i}`,
    deExamRemark: '国家司法考试',
    deGmtCreate: '2017-12-12 12:12:12',
    deGmtModified: '2017-12-12 12:12:12',
    deDeleted: false,
  });
}
export function getExamViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataExamVo: {
        deId: 'dfdfsdfwerwer23423d4sdfdf',
        deExamName: '司法考试',
        deExamRemark: '国家司法考试',
        deUnitId: 'df123123werwer234234sdfdf1',
        deUnitName: '司法部',
        deGmtCreate: '2017-12-12 12:12:12',
        deGmtModified: '2017-12-12 12:12:12',
        deDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getUnitSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const unitData = {
    status: '1',
    msg: '成功',
    dataMain: {
      list: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '司法部1',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '司法部2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '司法部3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '不是司法部4',
        },
      ],
    },
  };
  const result = unitData;
  if (params.suUnitName) {
    result.dataMain.list =
      unitData.dataMain.list.filter(data => data.val.indexOf(params.suUnitName) > -1);
  }
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getExamMockData(req, res, u) {
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
  if (params.deExamName) {
    dataSource = dataSource.filter(data => data.deExamName.trim() === params.deExamName.trim());
  }
  if (params.deUnitId) {
    dataSource = dataSource.filter(data => data.deUnitId === params.deUnitId);
  }

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

export function postExamMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, deId, deExamName, deExamRemark, deUnitName } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => deId.indexOf(item.deId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.deId === deId) {
            item.deExamName = deExamName;
            item.deExamRemark = deExamRemark;
            item.deUnitName = deUnitName;
          }
          return item;
        }
      );
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        deId: `${i}`,
        deExamName: body.deExamName,
        deExamRemark: body.deExamRemark,
        deUnitName: body.deUnitName,
        deGmtCreate: '2017-12-12 12:12:12',
        deGmtModified: '2017-12-12 12:12:12',
        deDeleted: false,
      });
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
export function postExamNameVerif(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  // const { method, deId, deExamName, deExamRemark, deUnitName } = body;

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
  getExamMockData,
  getUnitSelectData,
  postExamMockData,
  postExamNameVerif,
};
