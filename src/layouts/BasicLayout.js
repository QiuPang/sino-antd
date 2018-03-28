import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Breadcrumb, Modal } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import App from '../App';


const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};
@App
class BasicLayout extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  /**
   * 一个包含所有菜单组件的对象
   * routeData 一级及以下所有子菜单 firstMenuData 一级菜单 menuData二级和以下的所有子菜单的name和path
   * @returns {{location, breadcrumbNameMap: {}}}
   */
  getChildContext() {
    const { location, navData, getRouteData, billComp } = this.props;
    const routeData = getRouteData('BasicLayout');
    const firstMenuData = navData.reduce((arr, current) => arr.concat(current.children), []);
    const menuData = this.getMenuData(firstMenuData, '');
    const breadcrumbNameMap = {};

    routeData.concat(menuData).forEach((item) => {
      breadcrumbNameMap[item.path] = {
        name: item.name,
        component: item.component,
      };
    });
    // 添加额外的面包屑
    breadcrumbNameMap['/machineData/billPlace/bill'] = {
      name: '设备清单',
      component: billComp,
    };
    return { location, breadcrumbNameMap };
  }
  componentDidMount() {
    const id = sessionStorage.getItem('surId');
    // this.props.dispatch({
    //   type: 'global/fetchRole',
    // });
    if (id) {
      this.props.dispatch({
        type: 'global/sessionUpdateAndFetch',
        payload: {
          surId: id,
        },
      });
    } else {
      this.props.dispatch({
        type: 'global/switch',
      });
    }
  }
  // componentDidMount() {
  //   const url = convertUrl('/sys/menu');
  //   const response = request(url, {});
  //   response.then((data) => {
  //     if (data && data.status === '1') {
  //       console.log('获取菜单返回值:', data);
  //       const dynamicWrapper = (app, models, component) => dynamic({
  //         app,
  //         models: () => models.map(m => import(`../models/${m}.js`)),
  //         component,
  //       });
  //       const { app } = this.props;
  //       const arr = data.dataMain.list.map((item) => {
  //         item.children.map((obj) => {
  //           obj.component = dynamicWrapper(app, [obj.model], () => import(obj.component));
  //           return obj;
  //         });
  //         return item;
  //       });
  //       const navData = [
  //         {
  //           component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
  //           layout: 'BasicLayout',
  //           name: '首页', // for breadcrumb
  //           path: '/',
  //           children: arr,
  //         }];
  //       this.setState({
  //         navData,
  //       });
  //     }
  //   });
  // }
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    getRouteData('BasicLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Ant Design Pro`;
      }
    });
    return title;
  }

  /**
   * 获取所有传入的数据中，所属子菜单的name和path
   * @param data
   * @param parentPath
   * @returns {Array}
   */
  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach((item) => {
      if (item.children) {
        arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
        arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
      }
    });
    return arr;
  }
  render() {
    const { currentUser, collapsed, fetchingNotices, notices, getRouteData, location,
      dispatch, navData, billComp, roleData, userSessionData, examPlanSelectData } = this.props;
    const layout = (
      <Layout>
        <SiderMenu
          collapsed={collapsed}
          navData={navData}
          location={location}
          dispatch={dispatch}
        />
        <Layout>
          <GlobalHeader
            roleData={roleData}
            examPlanSelectData={examPlanSelectData}
            userSessionData={userSessionData}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            dispatch={dispatch}
          />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
              <Switch>
                {
                  getRouteData('BasicLayout').map(item => (
                    (
                      <Route
                        exact={item.exact}
                        key={item.path}
                        path={item.path}
                        component={item.component}
                      />
                    ) : null)
                  )
                }
                {/* <Redirect exact from="/*" to="/user/role" /> */}
                <Route path="/machineData/billPlace/bill" component={billComp} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <GlobalFooter
              links={[{
                title: 'Pro 首页',
                href: 'http://pro.ant.design',
                blankTarget: true,
              }, {
                title: 'GitHub',
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
              }, {
                title: 'Ant Design',
                href: 'http://ant.design',
                blankTarget: true,
              }]}
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品
                </div>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => (<div className={classNames(params)}>{layout}</div>)}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

// export default connect(state => ({
//   currentUser: state.user.currentUser,
//   collapsed: state.global.collapsed,
//   fetchingNotices: state.global.fetchingNotices,
//   notices: state.global.notices,
// }))(BasicLayout);
export default BasicLayout;
