/* eslint-disable no-param-reassign,no-underscore-dangle,react/no-unused-state,no-case-declarations */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, DatePicker, Badge, Modal, Divider, message } from 'antd';
import moment from 'moment';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import CheckModal from '../BaseData/CheckModal';
import styles from './TableList.less';
import { request } from '../../utils/request';

const FormItem = Form.Item;
// es6对象的的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  table: state.table,
}))
@Form.create()
export default class Table1 extends PureComponent {
  state = {
    addModalVisible: false,
    checkModalVisible: false,
    expandForm: false,
    selectedRows: [],
    searchFormValues: {},
    examName: {},
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
        searchFormValues: values,
      });
      dispatch({
        type: 'table/fetch',
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
    const { searchFormValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...searchFormValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'table/fetch',
      payload: params,
    });
  }
  // 表单重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      searchFormValues: {},
    });
    dispatch({
      type: 'table/fetch',
      payload: {},
    });
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
          type: 'table/remove',
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
      if (fieldsValue.examDate) {
        fieldsValue.examDate = (fieldsValue.examDate._d).Format('yy/MM/dd hh:mm');
      }
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        searchFormValues: values,
      });

      dispatch({
        type: 'table/fetch',
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
  // checkModal隐藏显示
  handleCheckModalVisible = (flag) => {
    this.setState({
      checkModalVisible: !!flag,
    });
  };
  // 修改状态
  handleUpdateStatus = (key, status) => {
    const { dispatch } = this.props;
    const values = {
      key,
      status,
    };
    dispatch({
      type: 'table/update',
      payload: values,
    });
  };
  // 列表单项操作
  handleSingleDoneClick = (key, flag) => {
    const { dispatch } = this.props;
    switch (flag) {
    // 启用
      case 'enable':
        confirm({
          title: '确定启用此次考试吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            this.setState({
              checkModalVisible: true,
              enableKey: key,
            });
            dispatch({
              type: 'table/check',
              payload: { key },
            });
          },
          onCancel() {
          },
        });
        break;
      // 停用
      case 'disable':
        confirm({
          title: '确定停用此次考试吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            this.handleUpdateStatus(key, 0);
          },
          onCancel() {
          },
        });
        break;
        // 修改
      case 'update':
        const values = {
          key,
        };
        dispatch({
          type: 'table/fetch',
          payload: values,
        });
        break;
      // 注销
      case 'cancellation':
        confirm({
          title: '确定注销此次考试吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            this.handleUpdateStatus(key, 2);
          },
          onCancel() {
          },
        });
        break;
      default:
        break;
    }
  }
  // addForm校验
  handleExamNameChange = (rule, value, callback) => {
    request(url.option);
    callback('崇明');
  }
  // addForm提交
  handleSubmitAddForm = (form) => {
    const { dispatch } = this.props;
    // validateFields 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        examDate: fieldsValue.examDate.format('YY/MM/DD hh:mm'),
      };
      const callback = () => {
        message.success('添加成功');
        this.handleAddModalVisible(false);
      };
      dispatch({
        type: 'table/add',
        payload: values,
        callback,
      });
    });
  }
  // 渲染简单查询
  renderSimpleQueryForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="年度">
              {getFieldDecorator('year')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="考试名称">
              {getFieldDecorator('examName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status', { initialValue: '1' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">未启用</Option>
                  <Option value="1">已启用</Option>
                  <Option value="2">已注销</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons} style={{ float: 'right', marginBottom: 24 }}>
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="考试名称">
              {getFieldDecorator('examName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="考试时间">
              {getFieldDecorator('examDate')(
                <DatePicker showTime style={{ width: '100%' }} placeholder="请输入考试时间" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status', { initialValue: '1' })(
                <Select style={{ width: '100%' }}>
                  <Option value="0">未启用</Option>
                  <Option value="1">已启用</Option>
                  <Option value="2">已注销</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="客户名称">
              {getFieldDecorator('clientName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createDate')(
                <DatePicker showTime style={{ width: '100%' }} placeholder="请输入创建时间" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建人">
              {getFieldDecorator('creator')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }
  // 渲染查询面板
  renderQueryForm() {
    return this.state.expandForm ? this.renderAdvancedQueryForm() : this.renderSimpleQueryForm();
  }

  render() {
    const { table: { loading: tableLoading, data, checkData } } = this.props;
    const { selectedRows, addModalVisible, checkModalVisible, enableKey } = this.state;
    // table的columns
    const statusMap = ['error', 'success', 'default'];
    const status = ['未启用', '已启用', '已注销'];
    const columns = [
      {
        title: '年度',
        dataIndex: 'year',
        sorter: true,
      },
      {
        title: '考试名称',
        dataIndex: 'examName',
      },
      {
        title: '客户名称',
        dataIndex: 'clientName',
      },
      {
        title: '考试时间',
        dataIndex: 'examDate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '创建人',
        dataIndex: 'creator',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        render: (val, record) => (
          <div>
            <a onClick={() => this.handleSingleDoneClick(record.key, 'enable')}>{record.status === 0 ? '启用' : ''}</a>
            <a onClick={() => this.handleSingleDoneClick(record.key, 'disable')}>{record.status === 1 ? '停用' : ''}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleSingleDoneClick(record.key, 'update')}>{record.status === 2 ? '' : '修改'}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleSingleDoneClick(record.key, 'cancellation')}>{record.status === 2 ? '' : '注销'}</a>
          </div>
        ),
      },
    ];
    const addColumns = [
      {
        title: '年度',
        dataIndex: 'year',
        type: 'input',
        required: true,
      },
      {
        title: '考试名称',
        dataIndex: 'examName',
        type: 'input',
        validator: this.handleExamNameChange,
        required: true,
      },
      {
        title: '客户名称',
        dataIndex: 'clientName',
        type: 'input',
        required: true,
      },
      {
        title: '考试时间',
        dataIndex: 'examDate',
        type: 'date',
        required: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        type: 'input',
        required: true,
      },
    ];
    const menu = (
      <Menu onClick={this.handleBatchClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderQueryForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAddModalVisible(true)}>
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
              loading={tableLoading}
              data={data}
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
        />
        <CheckModal
          checkData={checkData}
          enableKey={enableKey}
          checkModalVisible={checkModalVisible}
          handleCheckModalVisible={this.handleCheckModalVisible}
          handleUpdateStatus={this.handleUpdateStatus}
        />
      </div>
    );
  }
}
