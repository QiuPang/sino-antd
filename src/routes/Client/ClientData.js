import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Cascader, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';

import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Common.less';

// 表主键
const tableId = 'dpId';
const tableDelete = 'dpDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@Form.create()
export default class ClientData extends PureComponent {
  state = {
    data: [{
      daId: '2100',
      daAreaName: '河北省',
      daIevel: '1',
      daChildren: [{
        daId: '2101',
        daAreaName: '石家庄市',
        daLevel: '2',
        daPlaceList: [{
          dpId: '210134234234234234',
          dpPlaceName: '北京市第一中学',
        }],
      }],
    }],
  };

  componentDidMount() {
    // const GetAppPath = () => {
    //   const s = App.GetAppPath();
    // };
    // const ReadTextFile = () => {
    //   const s = App.ReadTextFile(`${App.GetAppPath()}ui\\aaa.txt`);
    // alert(s);
    // };
    const data = [{
      daId: '2100',
      daAreaName: '河北省',
      daIevel: '1',
      daChildren: [{
        daId: '2101',
        daAreaName: '石家庄市',
        daLevel: '2',
        daPlaceList: [{
          dpId: '210134234234234234',
          dpPlaceName: '北京市第一中学',
        }],
      }],
    }];
    // const prov = [];
    // const
    // data.map((item, index) => {
    //   prov.push(item);
    //   item.daChildren.map((item1, index1) => {
    //
    //   });
    // });
  }
  onChange = (value) => {
    console.log(value);
  };
  // 查询form表单提交
  handleSubmitQueryForm = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    /**
     * validateFields 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
     * Function([fieldNames: string[]], options: object, callback: Function(errors, values))
     */
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      this.setState({
        queryFormValues: values,
      });
      dispatch({
        type: 'clientData/fetch',
        payload: values,
      });
    });
  };
  // 切换查询面板收放
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }
  // 渲染复杂查询
  renderAdvancedQueryForm() {
    const { data } = this.state;
    const options = data.map((item) => {
      item.value = item.daId;
      item.label = item.daAreaName;
      item.children = item.daChildren;
      item.daChildren.map((item1) => {
        item1.value = item1.daId;
        item1.label = item1.daAreaName;
        item1.children = item1.daPlaceList;
        item1.daPlaceList.map((item2) => {
          item2.label = item2.dpPlaceName;
          item2.value = item2.dpId;
          return item2;
        });
        return item1;
      });
      return item;
    });
    console.log(options)
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={16} sm={24}>
            <FormItem label="省 / 市 / 考点">
              {getFieldDecorator('prov')(
                <Cascader options={options} onChange={this.onChange} placeholder="请依次选择省，市，考点" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} style={{ float: 'right', marginBottom: 24, marginRight: -84 }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedQueryForm()}
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
