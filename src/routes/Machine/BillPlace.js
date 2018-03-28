/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ExamTable from '../../components/ExamTable';
import styles from './Common.less';

// 表主键
const tableId = 'dpId';
const tableDelete = 'dpDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  bill: state.bill,
}))
@Form.create()
export default class BillPlace extends PureComponent {
  state = {
    selectedRows: [],
    queryFormValues: {},
    key: '',
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
    // 考试计划下拉菜单数据
    dispatch({
      type: 'bill/examPlanNameSelect',
      payload: { depExamPlanName: '' },
    });
    // 行政区下拉菜单数据
    dispatch({
      type: 'bill/areaSelect',
      payload: { daAreaPid: '' },
    });
    // 查询数据
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      this.setState({
        queryFormValues: values,
      });
      dispatch({
        type: 'bill/fetchBillPlace',
        payload: values,
      });
    });
  }
  /**
   * 最后传递给table组件作为他的onchange属性
   * onChange 分页、排序、筛选变化时触发
   * Function(pagination, filters, sorter)
   * @param pagination
   * @param filtersArg
   * @param sorter
   */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { queryFormValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...queryFormValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'bill/fetchBillPlace',
      payload: params,
    });
  }
  // 表单重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }
  // 列表批量操作
  handleBatchClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'bill/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }
  // 用于传递给子组件
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }
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
        type: 'bill/fetchBillPlace',
        payload: values,
      });
    });
  }
  // 列表单项操作
  handleSingleDoneClick = (key, flag) => {
    const { dispatch } = this.props;
    const values = {};
    values[tableId] = key;
    switch (flag) {
      // 详情
      case 'view':
        this.props.history.push(`/machineData/billPlace/bill?placeId=${key}`);
        // this.setState({
        // });
        // dispatch({
        //   type: 'billPlace/view',
        //   payload: values,
        // });
        break;
      default:
        break;
    }
  }
  // 渲染简单查询
  renderSimpleQueryForm() {
    const { bill: { areaSelectData, examPlanNameSelectData } } = this.props;
    const areaOptions = [];
    const examPlanNameOptions = [];
    if (areaSelectData) {
      areaSelectData.dataMain.list.map(item =>
        areaOptions.push(<Option key={item.key} value={item.key}>{item.val}</Option>)
      );
    }
    if (examPlanNameSelectData) {
      examPlanNameSelectData.dataMain.list.map(item =>
        examPlanNameOptions.push(<Option key={item.key} value={item.key}>{item.val}</Option>)
      );
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="考试计划名称">
              {getFieldDecorator('mbPlanId')(
                <Select
                  style={{ width: '100%' }}
                  billPlaceholder="--请选择--"
                >
                  {examPlanNameOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="行政区">
              {getFieldDecorator('mbAreaId')(
                <Select
                  style={{ width: '100%' }}
                  billPlaceholder="--请选择--"
                >
                  {areaOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="考点名称">
              {getFieldDecorator('mbPlaceName')(
                <Select
                  style={{ width: '100%' }}
                  billPlaceholder="--请选择--"
                >
                  {areaOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否删除">
              {getFieldDecorator('mbIsDeleted', { initialValue: 'false' })(
                <Select billPlaceholder="请选择" style={{ width: '100%' }}>
                  <Option value="false">活动的</Option>
                  <Option value="true">已删除</Option>
                </Select>
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
    const { bill: { loading: billPlaceLoading, billPlaceData: data } } = this.props;
    console.log(data)
    const { selectedRows, key } = this.state;
    // billPlace的columns
    const columns = [
      {
        title: '考试计划名称',
        dataIndex: 'dpPlanName',
      },
      {
        title: '行政区名称',
        dataIndex: 'dpAreaName',
      },
      {
        title: '考点名称',
        dataIndex: 'dpPlaceName',
      },
      {
        title: '设备总数',
        dataIndex: 'dpMachineSum',
      },
      {
        title: '操作',
        render: (val, record) => (
          <div>
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'view')}>{record[tableDelete] ? '' : '详情'}</a>
          </div>
        ),
      },
    ];
    const menu = (
      <Menu onClick={this.handleBatchClick} selectedKeys={[]} />
    );
    return (
      <PageHeaderLayout >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleQueryForm()}
            </div>
            {/*<div className={styles.tableListOperator}>*/}
              {/*<Button icon="plus" type="primary" onClick={this.handleAddClick}>*/}
                {/*新建*/}
              {/*</Button>*/}
              {/*{*/}
                {/*selectedRows.length > 0 && (*/}
                  {/*<span>*/}
                    {/*<Dropdown overlay={menu}>*/}
                      {/*<Button>*/}
                        {/*更多操作 <Icon type="down" />*/}
                      {/*</Button>*/}
                    {/*</Dropdown>*/}
                  {/*</span>*/}
                {/*)*/}
              {/*}*/}
            {/*</div>*/}
            <ExamTable
              selectedRows={selectedRows}
              loading={billPlaceLoading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
