/* eslint-disable no-prototype-builtins,prefer-destructuring */
import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, DatePicker, Modal, Select } from 'antd';

const moment = require('moment');

const FormItem = Form.Item;
// noinspection JSAnnotator
const mapPropsToFields = (props) => {
  const { viewData, addOrUpdate } = props;
  const result = {};
  if (addOrUpdate === 'update' && viewData) {
    for (const item in viewData) {
      if (viewData.hasOwnProperty(item)) {
        if (item.indexOf('Gmt') > -1) {
          result[item] = Form.createFormField({
            value: moment(viewData[item]),
          });
        } else {
          result[item] = Form.createFormField({
            value: viewData[item],
          });
        }
      }
    }
    return result;
  }
};
@Form.create({ mapPropsToFields })
export default class AddOrUpdateModal extends PureComponent {
  // 添加表单提交
  handleSubmitAdd = () => {
    const { handleSubmitAddForm, form, addOrUpdate } = this.props;
    handleSubmitAddForm(form, addOrUpdate);
  };
  renderForm =() => {
    const { addColumns, addOrUpdate } = this.props;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const items = [];
    // 渲染表单项控件
    const renderFormItemControls = (type, title, selectData, disabled) => {
      const options = [];
      let selectCrol = (<Select style={{ width: '100%' }} />);
      if (selectData && selectData.dataMain.list && addOrUpdate === 'update') {
        selectData.dataMain.list.map(item =>
          options.push(<Option key={item.key}>{ item.val }</Option>)
        );
        selectCrol = (<Select disabled={disabled || false} style={{ width: '100%' }} placeholder={`请选择${title}`}>{options}</Select>);
      } else if (selectData && selectData.dataMain.list && addOrUpdate === 'add') {
        selectData.dataMain.list.map(item =>
          options.push(<Option key={item.key}>{ item.val }</Option>)
        );
        selectCrol = (<Select style={{ width: '100%' }} placeholder={`请选择${title}`}>{options}</Select>);
      }
      switch (type) {
        case 'date':
          return (<DatePicker showTime format="YY-MM-DD hh:mm:ss" style={{ width: '100%' }} />);
          break;
        case 'select':
          return selectCrol;
        default:
          return <Input disabled={disabled || false} placeholder={`请输入${title}`} />;
      }
    };

    for (const item of addColumns) {
      items.push(
        <Row>
          <Col md={24} sm={24}>
            <FormItem label={item.title} {...formItemLayout}>
              {getFieldDecorator(item.dataIndex, {
                      rules: item.validator ? [{ required: item.required, message: `请输入${item.title}!` },
                        { validator: item.validator }] : [{ required: item.required, message: `请输入${item.title}!` }],
                    })(renderFormItemControls(item.type, item.title, item.selectData || null,
                item.disabled || null))}
            </FormItem>
          </Col>
        </Row>
      );
    }
    return (<Form onSubmit={this.handleSubmitAdd} layout="horizontal">{items}</Form>);
  };
  render() {
    const { addModalVisible, handleAddModalVisible } = this.props;
    return (
      <Modal
        title="新建考试"
        visible={addModalVisible}
        onOk={this.handleSubmitAdd}
        onCancel={() => handleAddModalVisible(false)}
        width="600px"
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

