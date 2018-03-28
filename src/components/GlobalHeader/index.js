import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar, Select, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import HeaderSearch from '../../components/HeaderSearch';
import styles from './index.less';

const { Header } = Layout;
const Option = Select.Option;
export default class GlobalHeader extends PureComponent {
  componentDidMount() {
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
    handleNoticeClear = (type) => {
      message.success(`清空了${type}`);
      this.props.dispatch({
        type: 'global/clearNotices',
        payload: type,
      });
    }
    handleNoticeVisibleChange = (visible) => {
      if (visible) {
        this.props.dispatch({
          type: 'global/fetchNotices',
        });
      }
    }
    handleMenuClick = ({ key }) => {
      if (key === 'logout') {
        window.location.href = 'login.html';
        // this.props.dispatch({
        //   type: 'global/logout',
        // });
      } else if (key === 'switch') {
        this.props.dispatch({
          type: 'global/switch',
        });
      }
    }
    toggle = () => {
      const { collapsed } = this.props;
      this.props.dispatch({
        type: 'global/changeLayoutCollapsed',
        payload: !collapsed,
      });
      this.triggerResizeEvent();
    }
    @Debounce(600)
    triggerResizeEvent() { // eslint-disable-line
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    }
   handleChange = (value) => {
     const values = {
       dpId: value,
     };
     this.props.dispatch({
       type: 'global/examPlanSessionUpdate',
       payload: values,
     });
   }
   render() {
     const {
       collapsed, fetchingNotices, userSessionData, examPlanSelectData, roleData,
     } = this.props;
     console.log(userSessionData);
     const menu = (
       <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
         <Menu.Item key="switch" disabled={roleData && roleData.length === 1}><Icon type="switch" />切换角色</Menu.Item>
         <Menu.Divider />
         <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
       </Menu>
     );
     const noticeData = this.getNoticeData();
     const options = [];
     if (examPlanSelectData) {
       examPlanSelectData.map((item) => {
         options.push(<Option value={item.key}>{item.val}</Option>);
       });
     }
     return (
       <Header className={styles.header}>
         <Icon
           className={styles.trigger}
           type={collapsed ? 'menu-unfold' : 'menu-fold'}
           onClick={this.toggle}
         />
         {examPlanSelectData ? (<Select
           defaultValue={userSessionData.sesPlanId || examPlanSelectData[0].key}
           style={{ width: 200 }}
           onChange={this.handleChange}
         >
           { options }
         </Select>) : <Spin />}
         <div className={styles.right}>
           <HeaderSearch
             className={`${styles.action} ${styles.search}`}
             placeholder="站内搜索"
             dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
             onSearch={(value) => {
                console.log('input', value); // eslint-disable-line
              }}
             onPressEnter={(value) => {
                console.log('enter', value); // eslint-disable-line
              }}
           />
           {userSessionData ? (
             <Dropdown overlay={menu}>
               <span className={`${styles.action} ${styles.account}`}>
                 <Avatar size="small" className={styles.avatar} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                 {userSessionData.sesUserName}
               </span>
             </Dropdown>
            ) : <Spin size="small" style={{ marginLeft: 8 }} />}
         </div>
       </Header>
     );
   }
}
