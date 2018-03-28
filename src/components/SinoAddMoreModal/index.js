/* eslint-disable prefer-destructuring */

import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, DatePicker, Modal, Select, Icon, Button } from 'antd';

const FormItem = Form.Item;
@Form.create()
export default class AddOrUpdateModal extends PureComponent {
  state = {
    count: 1,
  };
  componentDidMount() {}
  handlePlus = () => {
    const count = this.state.count + 1;
    this.setState({
      count,
    });
  }
  handleMinus = () => {
    const count = this.state.count - 1;
    this.setState({
      count,
    });
  }
  // 添加表单提交
  handleSubmitAdd = () => {
    const { handleSubmitAddForm, form, addOrUpdate } = this.props;
    handleSubmitAddForm(form, addOrUpdate);
  };
  // 取消
  handleCancel = () => {
    const { handleAddMoreModalVisible } = this.props;
    this.setState({
      count: 1,
    });
    handleAddMoreModalVisible(false);
  }

  renderForm =() => {
    const { addMoreColumnsList, addMoreColumnsSingle } = this.props;
    const { getFieldDecorator } = this.props.form;
    const width = 24 / (addMoreColumnsList.length + 1);
    const arr = [];
    // 渲染表单项控件
    const renderFormItemControls = (type, title, selectData) => {
      const Option = Select.Option;
      const options = [];
      let selectCrol = (<Select style={{ width: '100%' }} />);
      if (selectData && selectData.dataMain.list) {
        selectData.dataMain.list.map(item =>
          options.push(<Option key={item.key}>{ item.val }</Option>)
        );
        selectCrol = (<Select style={{ width: '100%' }}>{options}</Select>);
      }
      switch (type) {
        case 'date':
          return (<DatePicker showTime format="YY-MM-DD hh:mm:ss" style={{ width: '100%' }} />);
          break;
        case 'select':
          return selectCrol;
        default:
          return <Input placeholder={`请输入${title}`} onChange={null} />;
      }
    };
    let items = [];
    if (addMoreColumnsSingle) {
      // items位于上面的single 表单元素
      items = addMoreColumnsSingle.map((item) => {
        return (
          <Row key={Math.random()} gutter={{ sm: 16, md: 24 }} >
            <Col md={width} sm={width}>
              <FormItem label={item.title}>
                {getFieldDecorator(item.dataIndex, {
                  rules: [{ required: true, message: '请输入!' }],
                })((renderFormItemControls(item.type, item.title, item.selectData || null)))}
              </FormItem>
            </Col>
          </Row>
        );
      });
    }

    // cols 位于list 的第一排row里面的内容
    const cols = addMoreColumnsList.map((item) => {
      return (
        <Col md={width} sm={width}>
          <FormItem label={item.title}>
            {getFieldDecorator(`list[0].${item.dataIndex}`, {
                rules: [{ required: true, message: '请输入!' }],
              })(renderFormItemControls(item.type, item.title, item.selectData || null))}
          </FormItem>
        </Col>
      );
    });
    cols.push(
      <Col md={1} sm={1} style={{ textAlign: 'center', marginTop: 33 }}>
        <Button icon="plus" type="primary" onClick={() => this.handlePlus()}>增加</Button>
      </Col>
    );
    arr.push(<Row key={0} gutter={{ sm: 16, md: 24 }}>
      {cols}
    </Row>);
    // cols1位于list 的下面排
    for (let i = 1; i < this.state.count; i++) {
      const cols1 = addMoreColumnsList.map((item) => {
        return (
          <Col md={width} sm={width}>
            <FormItem label={item.title}>
              {getFieldDecorator(`list[${i}].${item.dataIndex}`, {
                rules: [{ required: true, message: '请输入!' }],
              })(renderFormItemControls(item.type, item.title, item.selectData || null))}
            </FormItem>
          </Col>
        );
      });
      cols1.push(
        <Col md={1} sm={1} style={{ textAlign: 'center', marginTop: 33 }}>
          <Button icon="minus" type="primary" onClick={() => this.handleMinus()}>删除</Button>
        </Col>
      );
      arr.push(<Row key={i} gutter={{ sm: 16, md: 24 }}>
        {cols1}
      </Row>);
    }
    items.push(
      <Row key={Math.random()} gutter={{ sm: 16, md: 24 }}>
        {arr}
      </Row>
    );
    return (<Form onSubmit={this.handleSubmitAdd} layout="vertical">{items}</Form>);
  }
  render() {
    const { addMoreModalVisible } = this.props;
    return (
      <Modal
        title="新建考试"
        visible={addMoreModalVisible}
        onOk={this.handleSubmitAdd}
        onCancel={this.handleCancel}
        width="1000px"
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

