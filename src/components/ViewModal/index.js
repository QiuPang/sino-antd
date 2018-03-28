/* eslint-disable react/jsx-closing-tag-location,array-callback-return */
import React, { PureComponent } from 'react';
import { Modal, Row, Col, Button } from 'antd';

export default class ViewModal extends PureComponent {
  renderModal() {
    const { viewData, viewColumns } = this.props;
    let rows = [];
    if (viewData) {
      rows = viewColumns.map((item) => {
        return (<Row key={Math.random()} type="flex" justify="start">
          <Col span={10}>{item.title}</Col>
          <Col span={14}>{viewData[item.dataIndex] === true ? '活动的' : viewData[item.dataIndex] === false ? '已删除' : viewData[item.dataIndex]}</Col>
        </Row>);
      });
    }
    return (
      <div style={{ lineHeight: 2 }}>
        {rows.length === 0 ? <div /> : rows }
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
        width="600px"
        footer={[
          <Button key="" onClick={() => handleViewModalVisible(false)}>关闭</Button>,
        ]}
      >
        { this.renderModal() }
      </Modal>
    );
  }
}
