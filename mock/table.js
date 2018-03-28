/* eslint-disable no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
let checkDataSource = {};
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    no: `${i}`,
    description: '这是一段描述',
    year: '2017',
    examName: `考试 ${i}`,
    clientName: `客户 ${i}`,
    examDate: new Date(`2017-06-${Math.floor(i / 2) + 1}`),
    createDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    creator: '创建人',
    remark: `备注 ${i}`,
    status: Math.floor(Math.random() * 10) % 3,
  });
}
checkDataSource = {
  examName: `考试${Math.random() * 10}`,
  examSubjects: `科目${Math.random() * 10}`,
  examPlaces: `考点${Math.random() * 10}`,
  examStudents: `考生${Math.random() * 10}`,
  examTicket: `准考证${Math.random() * 10}`,
  examPhotos: `照片${Math.random() * 10}`,
};

export function getTable(req, res, u) {
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

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }
  if (params.examName) {
    dataSource = dataSource.filter(data => data.examName.trim() === params.examName.trim());
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
// 模拟获取检测数据
export function getCheckData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  console.log(params);
  if (res && res.json) {
    res.json(checkDataSource);
  } else {
    return checkDataSource;
  }
}
export function postTable(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, key, description, status } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.key === key) {
            item.status = status;
          }
          // item.key === key ? item.status = 0 : item.status;
          return item;
        }
      );
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getTable,
  postTable,
  getCheckData,
};
