/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    muuId: `${i}`,
    muuPlanName: `考试计划${i}`,
    muuExamdataName: '2017年司法考试数据包V1',
    muuProgramName: '司法考试客户端程序V1',
    muuUkeyNumber: '12301203123',
    muuState: `${Math.floor(Math.random() * 10) % 4}`,
    muuGmtCreate: '2017-12-12 12:12:12',
    muuGmtModified: '2017-12-12 12:12:12',
    muuIsDeleted: false,
  });
}
export function postUkeyUseStateMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const body = (b && b.body) || req.body;
  const { muuId } = body;
  tableListDataSource = tableListDataSource.map(
    (item) => {
      if (item.muuId === muuId) {
        // item.deExamName = deExamName;
        // item.deExamRemark = deExamRemark;
        // item.deUnitName = deUnitName;
      }
      return item;
    }
  );

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
export function getUkeyUseMockData(req, res, u) {
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
export function getUkeyUseViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataUkeyUseVo: {
        muuId: '1',
        muuPlanId: 'dfdfsdfwerwer23423d4sdfdf1',
        muuExamdataId: '2017年司法考试数据包V1',
        muuProgramId: '司法考试客户端程序V1',
        muuUkeyId: '12301203123',
        muuState: `${Math.floor(Math.random() * 10) % 4}`,
        muuGmtCreate: '2017-12-12 12:12:12',
        muuGmtModified: '2017-12-12 12:12:12',
        muuIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function postUkeyUseMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, muuId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => muuId.indexOf(item.muuId) === -1);
      break;
    case 'add':
      // const i = Math.ceil(Math.random() * 10000);
      // tableListDataSource.unshift({
      //   dlId: `${i}`,
      //   dlExamineeName: body.dlExamineeName,
      //   dlIdentity: body.dlIdentity,
      //   dlUkeyUse: body.dlUkeyUse,
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
export function getUkeyProgramSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: 1,
    msg: '成功',
    dataMain: {
      arrayList: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '司法考试软件包1',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '司法考试软件包2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '司法考试软件包3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '司法考试软件包4',
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
export function getUkeyMachineSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const result = {
    status: 1,
    msg: '成功',
    dataMain: {
      arrayList: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '司法考试硬件包1',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '司法考试硬件包2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '司法考试硬件包3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '司法考试硬件包4',
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


export default {
  getUkeyUseViewData,
  getUkeyUseMockData,
  postUkeyUseMockData,
  getUkeyProgramSelectData,
  getUkeyMachineSelectData,
};
