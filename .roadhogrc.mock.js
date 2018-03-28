/**
 * 此文件管理所有模拟的路径
 */
import mockjs from 'mockjs';
import { getTable, postTable, getCheckData } from './mock/table';
import { getExamViewData, getExamMockData, postExamMockData, getUnitSelectData,postExamNameVerif } from './mock/exam';
import { getExamPlanViewData, getExamPlanMockData, getExamNameSelectData, postExamPlanMockData, postExamPlanNameVerif } from './mock/examPlan';
import { getLicenseViewData,getExamineeViewData, getPhotoViewData, getExamPlanNameSelectData, getSubjectSelectData, getAreaSelectData, getLicenseMockData, postLicenseMockData, postIdentityVerif } from './mock/license';
import { getWorkManViewData, getWorkManMockData, postWorkManMockData } from './mock/workMan';
import { getPlaceViewData, getPlaceMockData, postPlaceMockData } from './mock/Place';
import { getExamDataViewData, getExamDataMockData, postExamDataMockData, getExamDataSelectData } from './mock/examData';
import { getSubjectViewData, getSubjectMockData, postSubjectMockData } from './mock/subject';
import { getUkeyUseViewData, getUkeyUseMockData, postUkeyUseMockData, postUkeyUseStateMockData, getUkeyMachineSelectData } from './mock/ukeyUse';
import { getUkeyViewData, getUkeyMockData, postUkeyMockData, postUkeyIdVerif } from './mock/ukey';
import { getMachineViewData, getMachineMockData, postMachineMockData } from './mock/machine';
import { getTemplateViewData, getTemplateMockData, postTemplateMockData, postTemplateVerif } from './mock/template';
import { getSkinUseViewData, getSkinUseMockData, postSkinUseMockData } from './mock/skinUse';
import { getSkinViewData, getSkinMockData, postSkinMockData } from './mock/skin';
import { getSkinPageViewData, getSkinPageMockData, postSkinPageMockData } from './mock/skinPage';
import { getUkeyProgramViewData, getUkeyProgramMockData, postUkeyProgramMockData } from './mock/ukeyProgram';
import { getUnitViewData, getUnitMockData, postUnitMockData } from './mock/unitDataPage';
import { getBillPlaceMockData, getBillMockData } from './mock/bill';

import { getMenuMockData } from './mock/menu';
import { getActivities, getNotice, getFakeList, getRole, postLogin, getUserBySession } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'POST /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      "status":1,
      "msg":"成功",
      "dataMain":{
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 12,
        "deDeleted":false
      }
    }
  },
  // GET POST 可省略
  'POST /api/users':{
    "status":1,
    "msg":"成功",
    "dataMain":[{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }]
  },
  'POST /api/project/notice': getNotice,
  'POST /api/activities': getActivities,
  // 菜单数据
  'POST /login/menuListByRoleId.jspx':getMenuMockData,
  //select 外键数据
  'POST /sys/unitSelect.jspx': getUnitSelectData,
  'POST /data/examSelect.jspx': getExamNameSelectData,
  'POST /data/examPlanSelect.jspx': getExamPlanNameSelectData,
  'POST /data/examDataSelect.jspx': getExamDataSelectData,
  'POST /data/subjectSelect.jspx': getSubjectSelectData,
  'POST /data/areaSelect.jspx': getAreaSelectData,
  'POST /machine/machineSelect.jspx':getUkeyMachineSelectData,

  // exam 增删改查
  'POST /data/examView.jspx': getExamViewData,
  'POST /data/examPage.jspx': getExamMockData,
  'POST /data/exam.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postExamMockData,
  },
  'POST /data/examNameVerif.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postExamNameVerif,
  },
  // examPlan 增删改查
  'POST /data/examPlanView.jspx': getExamPlanViewData,
  'POST /data/examPlanPage.jspx': getExamPlanMockData,
  'POST /data/examPlan.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postExamPlanMockData,
  },
  'POST /data/examPlanNameVerify.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postExamPlanNameVerif,
  },
  // license 增删改查
  'POST /data/licenseView.jspx': getLicenseViewData,
  'POST /data/examineeView.jspx': getExamineeViewData,
  'POST /data/photoView.jspx': getPhotoViewData,
  'POST /data/licensePage.jspx': getLicenseMockData,
  'POST /data/license.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postLicenseMockData,
  },
  'POST /data/identityVerify.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postIdentityVerif,
  },
  // workMan 增删改查
  'POST /data/workManView.jspx': getWorkManViewData,
  'POST /data/workManPage.jspx': getWorkManMockData,
  'POST /data/workMan.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postWorkManMockData,
  },
  // place 增删改查
  'POST /data/placeView.jspx': getPlaceViewData,
  'POST /data/placePage.jspx': getPlaceMockData,
  'POST /data/place.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postPlaceMockData,
  },
  // ExamData 增删改查
  'POST /data/examDataView.jspx': getExamDataViewData,
  'POST /data/examDataPage.jspx': getExamDataMockData,
  'POST /data/examData.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postExamDataMockData,
  },
  // subject 增删改查
  'POST /data/subjectView.jspx': getSubjectViewData,
  'POST /data/subjectPage.jspx': getSubjectMockData,
  'POST /data/subject.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postSubjectMockData,
  },
  // UkeyUse 增删改查
  'POST /machine/ukeyUseView.jspx': getUkeyUseViewData,
  'POST /machine/ukeyUsePage.jspx': getUkeyUseMockData,
  'POST /machine/ukeyUse.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postUkeyUseMockData,
  },
  'POST /machine/ukeyUseState.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postUkeyUseStateMockData,
  },
  // Ukey 增删改查
  'POST /machine/ukeyIdVerify.jspx':{
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postUkeyIdVerif,
  },
  'POST /machine/ukeyView.jspx': getUkeyViewData,
  'POST /machine/ukeyPage.jspx': getUkeyMockData,
  'POST /machine/ukey.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postUkeyMockData,
  },
  // UkeyProgram 增删改查
  'POST /machine/ukeyProgramView.jspx': getUkeyProgramViewData,
  'POST /machine/ukeyProgramPage.jspx': getUkeyProgramMockData,
  'POST /machine/ukeyProgram.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postUkeyProgramMockData,
  },
  // billPlace 增删改查
  'POST /machine/billPlacePage.jspx': getBillPlaceMockData,
  // bill 增删改查
  'POST /machine/billPage.jspx': getBillMockData,
  // Machine 增删改查
  'POST /machine/machineView.jspx': getMachineViewData,
  'POST /machine/machinePage.jspx': getMachineMockData,
  'POST /machine/machine.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postMachineMockData,
  },
  // Template 增删改查
  'POST /skin/templateView.jspx': getTemplateViewData,
  'POST /skin/templatePage.jspx': getTemplateMockData,
  'POST /skin/template.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postTemplateMockData,
  },
  'POST /skin/templateNameVerif.jspx': postTemplateVerif,
  // SkinUse 增删改查
  'POST /skin/skinUseView.jspx': getSkinUseViewData,
  'POST /skin/skinUsePage.jspx': getSkinUseMockData,
  'POST /skin/skinUse.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postSkinUseMockData,
  },
  // Skin 增删改查
  'POST /skin/skinView.jspx': getSkinViewData,
  'POST /skin/skinPage.jspx': getSkinMockData,
  'POST /skin/skin.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postSkinMockData,
  },
  // SkinPage 增删改查
  'POST /skin/pageView.jspx': getSkinPageViewData,
  'POST /skin/pagePage.jspx': getSkinPageMockData,
  'POST /skin/page.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postSkinPageMockData,
  },
  // unitData 增删改查
  'POST /sys/unitView.jspx': getUnitViewData,
  'POST /sys/unitPage.jspx': getUnitMockData,
  'POST /sys/unit.jspx': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postUnitMockData,
  },

  'POST /login/userRoleListByUserId.jspx': getRole,
  'POST /api/table': getTable,
  'POST /api/check': getCheckData,
  'POST /api/table1': postTable,
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'POST /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'POST /api/fake_list': getFakeList,
  'POST /api/fake_chart_data': getFakeChartData,
  'POST /api/profile/basic': getProfileBasicData,
  'POST /api/profile/advanced': getProfileAdvancedData,
  // 登录页
  'POST /login/userLogin.jspx': postLogin,
  //更新session
  'POST /login/userRoleSessionUpdate.jspx':(req, res) => {
    res.send({
      "status":'1',
      "msg":"成功"
    });
  },
  //更新session
  'POST /login/examPlanSessionUpdate.jspx': (req, res) => {
    res.send({
      "status":'1',
      "msg":"成功"
    });
  },
  'POST /login/userViewBySession.jspx': getUserBySession,
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
  'POST /api/notices': getNotices,
};
// 如果开发环境，delay函数模拟延迟，如果是生产环境，则不启服务
export default noProxy ? {} : delay(proxy, 1000);
// export default {
//   'GET /(.*)': 'http://192.168.12.67:8080/safe/',
//   'POST /(.*)': 'http://192.168.12.67:8080/safe/',
// };
