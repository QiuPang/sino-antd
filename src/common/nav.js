import dynamic from 'dva/dynamic';
// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '基础数据管理',
        path: 'baseData',
        icon: 'check-circle-o',
        children: [
          {
            name: '考试数据管理',
            path: 'examData',
            component: dynamicWrapper(app, ['exam'], () => import('../routes/BaseData/ExamData')),
          },
          {
            name: '考试计划数据管理',
            path: 'examPlanData',
            component: dynamicWrapper(app, ['examPlan'], () => import('../routes/BaseData/ExamPlanData')),
          },
          {
            name: '准考证数据管理',
            path: 'licenseData',
            component: dynamicWrapper(app, ['license'], () => import('../routes/BaseData/LicensesData')),
          },
          {
            name: '工作人员数据管理',
            path: 'workManData',
            component: dynamicWrapper(app, ['workMan'], () => import('../routes/BaseData/WorkManData')),
          },
          {
            name: '考点数据管理',
            path: 'placeData',
            component: dynamicWrapper(app, ['place'], () => import('../routes/BaseData/PlaceData')),
          },
          {
            name: '数据包管理',
            path: 'examDataData',
            component: dynamicWrapper(app, ['examData'], () => import('../routes/BaseData/ExamDataData')),
          },
          {
            name: '科目数据管理',
            path: 'subjectData',
            component: dynamicWrapper(app, ['subject'], () => import('../routes/BaseData/SubjectData')),
          },
        ],
      },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(app, [''], () => import('../routes/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(app, [''], () => import('../routes/Exception/500')),
          },
        ],
      },
    ],
  }];
