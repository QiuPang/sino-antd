/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import styles from './Common.less';
import request from '../../utils/request';
import { convertUrl } from '../../utils/utils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const tableId = 'msrId';
const tableDelete = 'msrIsDeleted';

@connect(state => ({
  sendRecordPage: state.sendRecordPage,
}))
@Form.create()
export default class SendRecordPage extends PureComponent {
  state = {
    addModalVisible: false,
    selectedRows: [],
    queryFormValues: {},
    addOrUpdate: '',
    key: '',
    expandForm: false,
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
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
        type: 'sendRecordPage/fetch',
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
      type: 'sendRecordPage/fetch',
      payload: params,
    });
  }
  // 表单重置
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }
  // 切换查询面板收放
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }
  // 列表批量操作
  handleBatchClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'sendRecordPage/remove',
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
        type: 'sendRecordPage/fetch',
        payload: values,
      });
    });
  }
  // addModal隐藏显示
  handleAddModalVisible = (flag) => {
    this.setState({
      addModalVisible: !!flag,
    });
  };
  // 点击新建
  handleAddClick = () => {
    this.setState({
      addOrUpdate: 'add',
      addModalVisible: true,
    });
  }
  // 列表单项操作
  handleSingleDoneClick = (key, flag) => {
    const { dispatch } = this.props;
    const values = {};
    values[tableId] = key;
    switch (flag) {
      // 修改
      case 'update':
        this.setState({
          addOrUpdate: 'update',
          addModalVisible: true,
          key,
        });
        dispatch({
          type: 'sendRecordPage/view',
          payload: values,
        });
        break;
      // 删除
      case 'remove':
        confirm({
          title: '确定删除此次考试吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            const callback = () => {
              this.handleAddModalVisible(false);
              dispatch({
                type: 'sendRecordPage/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'sendRecordPage/remove',
              payload: values,
              callback,
            });
          },
          onCancel() {
          },
        });
        break;
      default:
        break;
    }
  }
  // addForm提交
  handleSubmitAddForm = (form, addOrUpdate) => {
    const { dispatch } = this.props;
    const { key, queryFormValues } = this.state;
    // validateFields 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      const callback = () => {
        this.handleAddModalVisible(false);
        dispatch({
          type: 'sendRecordPage/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'sendRecordPage/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'sendRecordPage/update',
          payload: {
            ...values,
          },
          callback,
        });
      }
    });
  }
  // 渲染简单查询
  renderSimpleQueryForm() {
    const { sendRecordPage: { unitSelectData } } = this.props;
    const unitOptions = [];
    if (unitSelectData) {
      unitSelectData.dataMain.list.map(item =>
        unitOptions.push(<Option key={item.key} value={item.key}>{item.val}</Option>)
      );
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="发送任务外键">
              {getFieldDecorator('msrTaskId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="接收人姓名">
              {getFieldDecorator('msrReceiveName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24} style={{ float: 'right', marginBottom: 24, marginRight: -84 }}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              展开 <Icon type="down" />
            </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
// 渲染复杂查询
  renderAdvancedQueryForm() {
    const { sendRecordPage: { unitSelectData } } = this.props;
    const unitOptions = [];
    if (unitSelectData) {
      unitSelectData.dataMain.list.map(item =>
        unitOptions.push(<Option key={item.key} value={item.key}>{item.val}</Option>)
      );
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="发送任务外键">
              {getFieldDecorator('msrTaskId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="接收人姓名">
              {getFieldDecorator('msrReceiveName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="接收人电话">
              {getFieldDecorator('msrReceivePhone')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={15}>
            <FormItem label="发送状态">
              {getFieldDecorator('msrState', { initialValue: '1' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">成功</Option>
                  <Option value="2">失败</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={15}>
            <FormItem label="状态">
              {getFieldDecorator('msrIsdeDeleted', { initialValue: 'false' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  // 渲染查询面板
  renderQueryForm() {
    return this.state.expandForm ? this.renderAdvancedQueryForm() : this.renderSimpleQueryForm();
  }
  render() {
    const { sendRecordPage: { loading: sendRecordPageLoading, data, viewData } } = this.props;
    const { selectedRows, addModalVisible, addOrUpdate, key } = this.state;
    // sendRecordPage的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];
    const columns = [
      {
        title: '任务名称',
        dataIndex: 'taskName',
      },
      {
        title: '接收人姓名',
        dataIndex: 'msrReceiveName',
      },
      {
        title: '接收人电话',
        dataIndex: 'msrReceivePhone',
      },
      {
        title: '状态',
        dataIndex: 'msrIsDeleted',
        sorter: true,
        render(val) {
          return (<Badge
            status={
              val ? statusMap[1] : statusMap[0]}
            text={val ? status[1] : status[0]
            }
          />);
        },
      },
      {
        title: '操作',
        render: (val, record) => (
          <div>
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'update')}>{record[tableDelete] ? '' : '修改'}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'remove')}>{record[tableDelete] ? '' : '删除'}</a>
          </div>
        ),
      },
    ];
    const addColumns = [
      {
        title: '短信内容',
        dataIndex: 'msrMessage',
        type: 'input',
        required: true,
      },
      {
        title: '任务外键',
        dataIndex: 'msrTaskId',
        type: 'input',
        required: true,
      },
      {
        title: '接收人姓名',
        dataIndex: 'msrReceiveName',
        type: 'input',
        required: true,
      },
      {
        title: '接收人电话',
        dataIndex: 'msrReceivePhone',
        type: 'input',
        required: true,
      },
      {
        title: '发送状态',
        dataIndex: 'msrState',
        type: 'input',
        required: true,
      },
    ];
    const detailColumns = [
      {
        title: '创建时间',
        dataIndex: 'msrGmtCreate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '最后操作时间',
        dataIndex: 'msrGmtModified',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    const menu = (
      <Menu onClick={this.handleBatchClick} selectedKeys={[]} />
    );
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderQueryForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.handleAddClick}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <ExamTable
              selectedRows={selectedRows}
              loading={sendRecordPageLoading}
              data={data}
              detailColumns={detailColumns}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <AddOrUpdateModal
          addColumns={addColumns}
          addModalVisible={addModalVisible}
          handleSubmitAddForm={this.handleSubmitAddForm}
          handleAddModalVisible={this.handleAddModalVisible}
          viewData={viewData}
          addOrUpdate={addOrUpdate}
          key={key}
        />
      </PageHeaderLayout>
    );
  }
}
