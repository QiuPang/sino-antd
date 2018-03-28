import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { mapModelAndComponent } from './common/mapModelAndComponent';
import { getPlainNode } from './utils/utils';

const App = (WrappedComponent) => {
  @connect(state => ({
    menuData: state.global.menuData,
    // currentUser: state.global.currentUser,
    userSessionData: state.global.userSessionData,
    examPlanSelectData: state.global.examPlanSelectData,
    // userData: state.global.userData,
    collapsed: state.global.collapsed,
    // fetchingNotices: state.global.fetchingNotices,
    // notices: state.global.notices,
  }))
  class App extends React.Component {
    componentDidMount() {
      this.props.dispatch({
        type: 'global/fetchSessionAndRole',
      });
    }
    render() {
      const { collapsed, fetchingNotices, notices, location, dispatch,
        app, menuData, history, userSessionData, examPlanSelectData } = this.props;
      const dynamicWrapper = (app, models, component) => dynamic({
        app,
        models: () => models.map(m => import(`./models/${m}.js`)),
        component,
      });
      function getRouteData(navData, path) {
        if (!navData.some(item => item.layout === path) ||
          !(navData.filter(item => item.layout === path)[0].children)) {
          return null;
        }
        const route = cloneDeep(navData.filter(item => item.layout === path || item.hide === true)[0]);
        const nodeList = getPlainNode(route.children);
        return nodeList;
      }
      const navData = [
        {
          component: dynamicWrapper(app, ['user', 'login'], () => import('./layouts/BasicLayout')),
          layout: 'BasicLayout',
          name: '首页', // for breadcrumb
          path: '/',
          children: menuData || [],
        },
        {
          hide: true,
          component: dynamicWrapper(app, [], () => import('./layouts/UserLayout')),
          path: '/user',
          layout: 'UserLayout',
          children: [
            {
              hide: true,
              name: '帐户',
              icon: 'user',
              path: 'user',
              children: [
                {
                  hide: true,
                  name: '登录',
                  path: 'login',
                  component: dynamicWrapper(app, ['login'], () => import('./routes/User/Login')),
                },
                {
                  hide: true,
                  name: '角色',
                  path: 'role',
                  component: dynamicWrapper(app, ['login'], () => import('./routes/User/Role')),
                },
                {
                  hide: true,
                  name: '注册',
                  path: 'register',
                  component: dynamicWrapper(app, ['register'], () => import('./routes/User/Register')),
                },
                {
                  hide: true,
                  name: '注册结果',
                  path: 'register-result',
                  component: dynamicWrapper(app, [], () => import('./routes/User/RegisterResult')),
                },
              ],
            },
          ],
        }];
      if (menuData) {
        menuData.map((item) => {
          item.name = item.smMenuName;
          item.icon = item.smIcon;
          item.path = item.smUrl;
          item.children.map((childItem) => {
            childItem.name = childItem.smMenuName;
            childItem.path = childItem.smUrl;
            childItem.component = dynamicWrapper(app,
              [mapModelAndComponent[childItem.path].modelArry],
              mapModelAndComponent[childItem.path].init);
            return childItem;
          });
          return item;
        });
        console.log(menuData)
      }

      const passProps = {
        app,
        navData,
        history,
        examPlanSelectData,
        userSessionData,
        getRouteData: (path) => {
          return getRouteData(navData, path);
        },
        billComp: dynamicWrapper(app, ['machine/bill'], () => import('./routes/Machine/Bill')),
        collapsed,
        fetchingNotices,
        notices,
        location,
        dispatch,
      };
      return (
        navData.length === 0 ? <Spin spinning /> :
          <WrappedComponent {...this.props} {...passProps} />
      );
    }
  }

  return App;
};
export default App;
