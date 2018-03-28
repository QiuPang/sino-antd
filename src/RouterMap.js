import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'dva/router';
import BasicLayout from './layouts/BasicLayout';

// import { getNavData } from './common/nav';
import { convertUrl } from './utils/utils';
import request from './utils/request';
import dynamic from "dva/dynamic";


export default class RouterMap extends PureComponent {
  state = {
    list: [{
      name: '异常',
      path: 'exception',
      icon: 'warning',
      children: [
        {
          name: '403',
          path: '403',
          model: '',
          component: '../routes/Exception/403',
        },
        {
          name: '404',
          path: '404',
          model: '',
          component: '../routes/Exception/404',
        },
        {
          name: '500',
          path: '500',
          model: '',
          component: '../routes/Exception/500',
        },
      ],
    }],
  };
  componentWillMount() {
    const url = convertUrl('/sys/menu');
    const response = request(url, {});
    response.then((data) => {
      if (data && data.status === '1') {
        console.log('获取菜单返回值:', data);
        this.setState({
          list: data.dataMain.list,
        });
      }
    });
  }

  render() {
    const { app, history, getRouteData, getLayout } = this.props;
    const { list } = this.state;
    // const navData = getNavData(app, list);
    // const BasicLayout = getLayout(navData, 'BasicLayout').component;
    const dynamicWrapper = (app, models, component) => dynamic({
      app,
      models: () => models.map(m => import(`./models/${m}.js`)),
      component,
    });
    const arr = list.map((item) => {
      item.children.map((obj) => {
        obj.component = dynamicWrapper(app, [obj.model], () => import(obj.component));
        delete obj.model;
        return obj;
      });
      return item;
    });
    const navData = [{
      component: dynamicWrapper(app, ['user', 'login'], () => import('./layouts/BasicLayout')),
      layout: 'BasicLayout',
      name: '首页', // for breadcrumb
      path: '/',
      children: arr,
    }];
    const passProps = {
      app,
      navData,
      getRouteData: (path) => {
        return getRouteData(navData, path);
      },
    };
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" render={props => <BasicLayout app={app} {...props} {...passProps} />} />
        </Switch>
      </Router>
    );
  }
}
