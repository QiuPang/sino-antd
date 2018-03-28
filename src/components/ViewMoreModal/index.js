/* eslint-disable array-callback-return */

import React, { PureComponent } from 'react';
import { Modal, Row, Col, Button } from 'antd';

export default class ViewMoreModal extends PureComponent {
  renderModal() {
    const { viewData, viewColumns, viewLowData, viewLowColumns,
      viewPhotoData, viewPhotoColumns } = this.props;
    let photoWrapper = [];
    let photoRows = [];
    const wrapper = [];
    let rows = [];
    let lowRows = [];
    if (viewData) {
      rows = viewColumns.map((item) => {
        return (
          <Row key={Math.random()} type="flex" justify="start">
            <Col span={10}>{item.title}</Col>
            <Col span={14}>{viewData[item.dataIndex] === true ? '活动的' : viewData[item.dataIndex] === false ? '已删除' : viewData[item.dataIndex]}</Col>
          </Row>);
      });
    }
    if (viewLowData) {
      lowRows = viewLowColumns.map((item) => {
        return (
          <Row key={Math.random()} type="flex" justify="start">
            <Col span={10}>{item.title}</Col>
            <Col span={14}>{viewLowData[item.dataIndex] === true ? '活动的' : viewLowData[item.dataIndex] === false ? '已删除' : viewLowData[item.dataIndex]}</Col>
          </Row>);
      });
    }
    if (viewPhotoData) {
      const reg = /http:\/.*?(gif|png|jpg)/gi;
      photoRows = viewPhotoColumns.map((item) => {
        return (
          <Col span={11} offset={2}>
            <Row key={Math.random()} type="flex" justify="start">
              <Col span={7}>{item.title}</Col>
              <Col span={7}>{viewPhotoData[item.dataIndex] === true ? '活动的' : viewPhotoData[item.dataIndex] === false ? '已删除' : viewPhotoData[item.dataIndex]}</Col>
            </Row>
          </Col>
        );
      });
      photoWrapper = viewPhotoColumns.map((item) => {
        return (
          reg.test(viewPhotoData[item.dataIndex]) ?
            <Col span={24}>
              <Col span={11}>
                <img
                  alt="11"
                  style={{ width: 100, height: 300, display: 'block' }}
                  src={viewPhotoData[item.dataIndex]}
                />
              </Col>
              { photoRows }
            </Col> : null
        );
      });
    }
    wrapper.push(<Row key={Math.random()} type="flex" justify="center">
      <Col span={11}>
        <Row style={{ fontSize: 16, fontWeight: 700 }}>详情</Row>
        {rows}
      </Col>
      <Col span={11} offset={2}>
        <Row style={{ fontSize: 16, fontWeight: 700 }}>考生详情</Row>
        {lowRows}
      </Col>
      <Row key={Math.random()} type="flex" justify="start">
        <Row style={{ fontSize: 16, fontWeight: 700 }}>照片详情</Row>
        { photoWrapper }
      </Row>
    </Row>);
    return (
      <div style={{ lineHeight: 2 }}>
        {rows.length === 0 ? <div /> : wrapper }
      </div>
    );
  }
  render() {
    const { viewModalVisible, handleViewModalVisible } = this.props;
    return (
      <Modal
        title="查看详情"
        visible={viewModalVisible}
        closable={false}
        width="800px"
        footer={[
          <Button key="" onClick={() => handleViewModalVisible(false)}>关闭</Button>,
        ]}
      >
        { this.renderModal() }
      </Modal>
    );
  }
}
