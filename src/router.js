import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

/**
 * 用于获取一级及以下所有子菜单数据的集合
 * 其中getPlainNode函数：用于遍历component不为空的子菜单
 * @param navData
 * @param path
 * @returns {*}
 */
function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

/**
 * 获取零级菜单（layout）中各种属性
 * @param navData 菜单数据
 * @param path 路径
 * @returns {*} 返回 包含零级菜单中各种属性的对象
 */
function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

/**
 * UserLayout BasicLayout 菜单数据navdata中的component，传递给路由配置项
 * passProps
 * @param history
 * @param app
 * @returns {*}
 */
function RouterConfig({ history, app }) {
  // const navData = getNavData(app);
  // const BasicLayout = getLayout(navData, 'BasicLayout').component;

  const passProps = {
    app,
    history,
    // navData,
    // getRouteData: (path) => {
    //   return getRouteData(navData, path);
    // },
  };


  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
