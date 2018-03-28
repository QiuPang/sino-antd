import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Table } from 'antd';
import styles from './Login.less';
import { Modal } from 'antd/lib/index';

@connect(state => ({
  roleData: state.global.roleData,
}))
export default class Role extends Component {
  handleSelectClick = (id) => {
    const { dispatch } = this.props;
    const values = {
      surId: id,
    };
    // dispatch({
    //   type: 'global/sessionUpdateAndFetch',
    //   payload: values,
    // });
    dispatch({
      type: 'global/toIndex',
      payload: values,
    });
    sessionStorage.setItem('surId', id);
  };
  render() {
    const { roleData } = this.props;
    const columns = [{
      title: '用户角色名',
      dataIndex: 'surRoleName',
      key: 'surUserName',
    }, {
      title: '行政区名称',
      dataIndex: 'surAreaName',
      key: 'surAreaName',
    }, {
      title: '单位名称',
      dataIndex: 'surUnitName',
      key: 'address',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleSelectClick(record.surId)}>选择</a>
        </span>
      ),
    }];
    if (roleData && roleData.length === 1) {
      this.handleSelectClick(roleData[0].surId);
      return null;
    } else if (roleData && roleData.length === 0) {
      Modal.info({
        title: '当前用户无角色信息',
        onOk() {
          window.location.href = 'login.html';
        },
      });
      return null;
    } else {
      return <Table style={{ width: 600, margin: 'auto', background: '#fff' }} columns={columns} pagination={false} dataSource={roleData} />;
    }
  }
}
