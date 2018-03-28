/* eslint-disable linebreak-style,no-param-reassign */
import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    dlId: `${i}`,
    dlExamineeName: `白晨星${i}`,
    dlIdentity: `${Math.floor(Math.random() * 10000)}`,
    dlLicense: `${Math.floor(Math.random() * 10000)}`,
    dlAreaName: '北京市',
    dlPlanName: '2017年司法考试',
    dlSubjectName: '科目一',
    dlGmtCreate: '2017-12-12 12:12:12',
    dlGmtModified: '2017-12-12 12:12:12',
    dlDeleted: false,
  });
}
export function getExamPlanNameSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const examPlanNameSelectData = {
    status: '1',
    msg: '成功',
    dataMain: {
      list: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '司法考试计划1',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '司法考试计划2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '司法考试计划3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '司法考试计划4',
        },
      ],
    },
  };
  const result = examPlanNameSelectData;
  // if (params.deExamName) {
  //   result.dataMain.list =
  //     examNameData.dataMain.list.filter(data => data.val.indexOf(params.deExamName) > -1);
  // }
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getSubjectSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  const subjectSelectData = {
    status: 1,
    msg: '成功',
    dataMain: {
      list: [
        {
          key: 'dfdfsdfwerwer23423d4sdfdf1',
          val: '科目一',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf2',
          val: '科目2',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf3',
          val: '科目3',
        },
        {
          key: 'dfdfsdfwerwer23423d4sdfdf4',
          val: '科目4',
        },
      ],
    },
  };
  const result = subjectSelectData;
  // if (params.deExamName) {
  //   result.dataMain.list =
  //     examNameData.dataMain.list.filter(data => data.val.indexOf(params.deExamName) > -1);
  // }
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getAreaSelectData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const areaSelectData = {
    status: 1,
    msg: '成功',
    dataMain: {
      list: [
        {
          key: '110000',
          val: '北京市',
        },
        {
          key: '110001',
          val: '上海市',
        },
        {
          key: '110002',
          val: '深圳市',
        },
        {
          key: '110003',
          val: '广州市',
        },
      ],
    },
  };
  const result = areaSelectData;
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getLicenseMockData(req, res, u) {
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
export function getLicenseViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataLicenseVo: {
        dlId: 'dfdfsdfwerwer234234sdfdf',
        dlExamineeName: '白晨星',
        dlIdentity: '2323423434234234234',
        dlLicense: '34234234234',
        dlAreaName: '北京市',
        dlAreaId: '110000',
        dlPlanName: '2017年司法考试',
        dlPlanId: 'dfdfsdfwerwer23423d4sdfdf1',
        dlSubjectName: '科目一',
        dlSubjectId: 'dfdfsdfwerwer23423d4sdfdf1',
        dlPhotoPath: 'http://123123d/123.jpg',
        dlGmtCreate: '2017-12-12 12:12:12',
        dlGmtModified: '2017-12-12 12:12:12',
        dlIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getExamineeViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataExamineeVo: {
        dexId: 'dfdfsdfwerwer234234sdfdf',
        dexAge: '20',
        dexSex: '男',
        dexLearn: '本科',
        dexPhone: '13522273491',
        dexParty: '党员',
        dexNation: '汉族',
        dexUnit: '信诺',
        dexExamineeName: '白晨星',
        dexIdentity: '2342341232312321',
        dexGmtCreate: '2017-12-12 12:12:12',
        dexGmtModified: '2017-12-12 12:12:12',
        dexDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function getPhotoViewData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const result = {
    status: '1',
    msg: '成功',
    dataMain: {
      dataPhotoVo: {
        dpId: 'dfdfsdfwerwer234234sdfdf',
        dpPhotoPath: 'http:/123123/dfdfsa.jpg',
        dpSize: '290',
        dpHeight: '1000',
        dpWidth: '300',
        dpFormat: 'jpg',
        dpFeaturePath: 'http:/123123/dfdfsa',
        dpQuality1: '500',
        dpQuality2: '500',
        dpEyp: '300',
        dpGmtCreate: '2017-12-12 12:12:12',
        dpGmtModified: '2017-12-12 12:12:12',
        dpIsDeleted: false,
      },
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}


export function postLicenseMockData(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, dlId } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'remove':
      tableListDataSource = tableListDataSource.filter(item => dlId.indexOf(item.dlId) === -1);
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(
        (item) => {
          if (item.dlId === dlId) {
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
        dlId: `${i}`,
        dlExamineeName: body.dlExamineeName,
        dlIdentity: body.dlIdentity,
        dlLicense: body.dlLicense,
        dlAreaName: body.dlAreaName,
        dlPlanName: body.dlPlanName,
        dlSubjectName: body.dlSubjectName,
        dlGmtCreate: body.dlGmtCreate,
        dlGmtModified: body.dlGmtModified,
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
export function postIdentityVerif(req, res, u, b) {
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
  getExamineeViewData,
  getPhotoViewData,
  postIdentityVerif,
  getLicenseViewData,
  getLicenseMockData,
  postLicenseMockData,
  getExamPlanNameSelectData,
  getSubjectSelectData,
  getAreaSelectData,
};
