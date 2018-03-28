import React, { PureComponent } from 'react';
import { Modal, Row, Col, Icon } from 'antd';

const style = {
  iconOk: {
    fontSize: 16,
    color: '#2aa515',
  },
  iconWarn: {
    fontSize: 16,
    color: '#d81e06',
  },
  iconLoading: {
    fontSize: 16,
  },
};
export default class CheckModal extends PureComponent {
  // modal点击确定
  handleEnableOk=() => {
    const { handleCheckModalVisible, handleUpdateStatus, enableKey } = this.props;
    handleCheckModalVisible(false);
    handleUpdateStatus(enableKey, 1);
  }
  renderModal() {
    const { checkData } = this.props;
    return (
      <div style={{ lineHeight: 2 }}>
        <Row type="flex" justify="start">
          <Col span={8}>考试名称</Col>
          <Col span={12}>{checkData.examName}</Col>
          <Col span={4}>{checkData.examName ? <Icon style={style.iconOk} type="check-circle-o" /> : <Icon type="loading" style={style.iconLoading} />}</Col>
        </Row>
        <Row type="flex" justify="end">
          <Col span={8}>考试科目</Col>
          <Col span={12}>{checkData.examSubjects}</Col>
          <Col span={4}>{checkData.examSubjects ? <Icon style={style.iconOk} type="check-circle-o" /> : <Icon type="loading" style={style.iconLoading} />}</Col>
        </Row>
        <Row>
          <Col span={8}>考点数据</Col>
          <Col span={12}>{checkData.examPlaces}</Col>
          <Col span={4}>{checkData.examPlaces ? <Icon style={style.iconOk} type="check-circle-o" /> : <Icon type="loading" style={style.iconLoading} />}</Col>
        </Row>
        <Row>
          <Col span={8}>考生数据</Col>
          <Col span={12}>{checkData.examStudents}</Col>
          <Col span={4}>{checkData.examStudents ? <Icon style={style.iconOk} type="check-circle-o" /> : <Icon type="loading" style={style.iconLoading} />}</Col>
        </Row>
        <Row>
          <Col span={8}>准考证数据</Col>
          <Col span={12}>{checkData.examTicket}</Col>
          <Col span={4}>{checkData.examTicket ? <Icon style={style.iconOk} type="check-circle-o" /> : <Icon type="loading" style={style.iconLoading} />}</Col>
        </Row>
        <Row>
          <Col span={8}>照片数据</Col>
          <Col span={12}>{checkData.examPhotos}</Col>
          <Col span={4}>{checkData.examPhotos ? <Icon style={style.iconOk} type="check-circle-o" /> : <Icon type="loading" style={style.iconLoading} />}</Col>
        </Row>
      </div>
      // <dl>
      //   <dd>考试名称:{checkData.examName}</dd>
      //   <dd>考试科目:{checkData.examSubjects}</dd>
      //   <dd>考点数据:{checkData.examPlaces}</dd>
      //   <dd>考生数据:{checkData.examStudents}</dd>
      //   <dd>准考证数据:{checkData.examTicket}</dd>
      //   <dd>照片数据:{checkData.examPhotos}</dd>
      // </dl>
    );
  }
  render() {
    const { checkModalVisible, handleCheckModalVisible } = this.props;
    return (
      <Modal
        title="数据检测"
        visible={checkModalVisible}
        okText="启用"
        onOk={this.handleEnableOk}
        onCancel={() => handleCheckModalVisible(false)}
        width="600px"
      >
        { this.renderModal() }
      </Modal>
    );
  }
}
