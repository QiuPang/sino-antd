/* eslint-disable linebreak-style */
import { getUrlParams } from './utils';

export function getMenuMockData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  const dataSource = [
    {
      smMenuName: '基础数据管理',
      smUrl: 'baseData',
      smIcon: 'database',
      children: [
        {
          smMenuName: '考试数据管理',
          smUrl: 'examData',
        },
        {
          smMenuName: '考试计划数据管理',
          smUrl: 'examPlanData',
        },
        {
          smMenuName: '准考证数据管理',
          smUrl: 'licenseData',
        },
        {
          smMenuName: '工作人员数据管理',
          smUrl: 'workManData',
        },
        {
          smMenuName: '考点数据管理',
          smUrl: 'placeData',
        },
        {
          smMenuName: '数据包管理',
          smUrl: 'examDataData',
        },
        {
          smMenuName: '科目数据管理',
          smUrl: 'subjectData',
        },
      ],
    },
    {
      smMenuName: '硬件设备管理',
      smUrl: 'machineData',
      smIcon: 'usb',
      children: [
        {
          smMenuName: 'U盾使用管理',
          smUrl: 'ukeyUse',
        },
        {
          smMenuName: 'U盾管理',
          smUrl: 'ukey',
        },
        {
          smMenuName: 'U盾软件包管理',
          smUrl: 'ukeyProgram',
        },
        {
          smMenuName: '硬件设备清单管理',
          smUrl: 'billPlace',
        },
        {
          smMenuName: '硬件设备管理',
          smUrl: 'machine',
        },
      ],
    }, {
      smMenuName: '皮肤管理',
      smUrl: 'skinData',
      smIcon: 'skin',
      children: [
        {
          smMenuName: '模板管理',
          smUrl: 'template',
        },
        {
          smMenuName: '模板使用管理',
          smUrl: 'skinUse',
        },
        {
          smMenuName: '皮肤管理',
          smUrl: 'skinPage',
        },
      ],
    },
    {
      smMenuName: '消息管理',
      smUrl: 'msgData',
      smIcon: 'message',
      children: [
        {
          smMenuName: '短信模板管理',
          smUrl: 'templatePage',
        },
        {
          smMenuName: '短信发送任务',
          smUrl: 'taskPage',
        },
        {
          smMenuName: '短信发送记录',
          smUrl: 'sendRecordPage',
        },
      ],
    },
    {
      smMenuName: '人像识别管理',
      smUrl: 'faceData',
      smIcon: 'safety',
      children: [
        {
          smMenuName: '人像数据识别管理',
          smUrl: 'dataPage',
        },
        {
          smMenuName: '人像识别终端数据管理',
          smUrl: 'clientInfoPage',
        },
      ],
    },
    {
      smMenuName: '系统权限管理',
      smUrl: 'permission',
      smIcon: 'safety',
      children: [
        {
          smMenuName: '单位数据管理',
          smUrl: 'unitData',
        },
      ],
    }];

  const result =
    {
      status: '1',
      msg: '成功',
      dataMain: {
        list: dataSource,
      },
    };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
