/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    depId: `${i}`,
    depUnitId: 'dfdfsdfwerwer23423d4sdfdf1',
    depExamName: `司法考试${i}`,
    depPlanName: '2017年司法考试',
    depExamRemark: '国家司法考试',
    depExamYear: '2017',
    depGmtStart: '2017-12-12 12:12:12',
    depGmtEnd: '2017-12-12 12:12:12',
    depPlanRemark: '国家司法考试',
    depUnitName: `司法部 ${i}`,
    depPlanState: `${Math.floor(Math.random() * 10) % 3}`,
    depGmtCreate: '2017-12-12 12:12:12',
    depGmtModified: '2017-12-12 12:12:12',
    depDeleted: false,
  });
}
export function getExamPlanViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  // const params = getUrlParams(url);

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataExamPlanVo: {
        depId: 'dfdfsdfwerwer234234sdfdf',
        depExamId: 'dfdfsdfwerwer23423d4sdfdf2',
        depExamName: '司法考试',
        depPlanName: '2017年司法考试',
        depExamYear: '2017',
        depGmtStart: '2017-12-12 12:12:12',
        depGmtEnd: '2017-12-12 12:12:12',
        depUnitId: 'dfdfsdfwerwer23423d4sdfdf2',
        depUnitName: '司法部',
        depPlanRemark: '国家司法考试',
        depPlanState: 1,
        depGmtCreate: '2017-12-12 12:12:12',
        depGmtModified: '2017-12-12 12:12:12',
        depDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getExamNameSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const examNameData = {
    status: 1,
    msg: '成功',
    dataMain: {
      list: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '司法考试1',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '司法考试2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '司法考试3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '司法考试4',
        },
      ],
    },
  };
  const result = examNameData;
  if (params.deExamName) {
    result.dataMain.list =
      examNameData.dataMain.list.filter(data => data.val.indexOf(params.deExamName) > -1);
  }
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getExamPlanMockData(req, res, u) {
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

export function postExamPlanMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, depId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => depId.indexOf(item.depId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.depId === depId) {
            // item.deExamName = deExamName;
            // item.deExamRemark = deExamRemark;
            // item.deUnitName = deUnitName;
          }
          return item;
        }
      );
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        depId: `${i}`,
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
export function postExamPlanNameVerif(req, res, u, b) {
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
  getExamPlanMockData,
  getExamNameSelectData,
  postExamPlanNameVerif,
  postExamPlanMockData,
};
