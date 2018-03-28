/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    ssId: `${i}`,
    ssName: '司法考试皮肤',
    ssRemark: '国家司法考试皮肤',
    ssDomainName: 'www.baidu.com',
    ssSkinId: '010232',
    ssState: 1,
    ssResourceId: 'asd4q65w46asdas',
    ssGmtCreate: '2017-12-12 12:12:12',
    ssGmtModified: '2017-12-12 12:12:12',
    ssIsDeleted: false,
  });
}
export function getSkinMockData(req, res, u) {
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
export function getSkinViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      skinSkinVo: {
        ssId: 'dfdfsdfwerwer234234sdfdf',
        ssName: '司法考试皮肤',
        ssRemark: '国家司法考试皮肤',
        ssDomainName: 'www.baidu.com',
        ssSkinId: '010232',
        ssState: 1,
        ssResourceId: '554as65as4dqwdasdsdas',
        ssGmtCreate: '2017-12-12 12:12:12',
        ssGmtModified: '2017-12-12 12:12:12',
        ssIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postSkinMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, ssId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => ssId.indexOf(item.ssId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.ssId === ssId) {
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
  getSkinViewData,
  getSkinMockData,
  postSkinMockData,
};
