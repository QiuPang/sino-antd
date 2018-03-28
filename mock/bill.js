/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
const tableListDataSource = [];
const tableListDataSource1 = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    dpId: `${i}`,
    dpPlanName: '2017司法考试',
    dpAreaName: '北京市',
    dpPlaceName: '北京市第11中学考点',
    dpMachineSum: 100,
  });
}
for (let i = 0; i < 46; i += 1) {
  tableListDataSource1.push({
    mbId: 'dfdfsdfwerwer234234sdfdf',
    mbMachineName: '二代证读卡器',
    mbCount: 12,
    mbPlanName: `2017司法考试计划${i}`,
    mbAreaName: '北京市',
    mbPlaceName: '北京市第11中学考点',
    mbState: 2,
    mbGmtCreate: '2017-12-12 12:12:12',
    mbGmtModified: '2017-12-12 12:12:12',
    mbIsDeleted: false,
  });
}
export function getBillPlaceMockData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      list: tableListDataSource,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getBillMockData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      list: tableListDataSource1,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export default {
  getBillPlaceMockData,
};
