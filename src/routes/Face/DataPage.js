/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Common.less';
import request from '../../utils/request';
import { convertUrl } from '../../utils/utils';

const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const tableId = 'fdId';
const tableDelete = 'fdIsDeleted';

@connect(state => ({
  dataPage: state.dataPage,
}))
@Form.create()
export default class DataPage extends PureComponent {
  state = {
    addModalVisible: false,
    expandForm: false,
    selectedRows: [],
    queryFormValues: {},
    addOrUpdate: '',
    key: '',
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
        type: 'dataPage/fetch',
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
      type: 'dataPage/fetch',
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
          type: 'dataPage/remove',
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
        type: 'dataPage/fetch',
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
  // 切换查询面板收放
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
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
          type: 'dataPage/view',
          payload: values,
        });
        break;
      // 删除
      case 'remove':
        confirm({
          title: '确定删除此条信息吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            const callback = () => {
              this.handleAddModalVisible(false);
              dispatch({
                type: 'dataPage/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'dataPage/remove',
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
          type: 'dataPage/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'dataPage/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'dataPage/update',
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
    const { dataPage: { unitSelectData } } = this.props;
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
            <FormItem label="设备编号">
              {getFieldDecorator('fdUkeyNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证号码">
              {getFieldDecorator('fdIdentityNumber')(
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
  renderAdvancedQueryForm() {const { dataPage: { unitSelectData } } = this.props;
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
            <FormItem label="设备编号">
              {getFieldDecorator('fdUkeyNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证号码">
              {getFieldDecorator('fdIdentityNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="身份证姓名">
              {getFieldDecorator('fdIdentityName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="查询方式">
              {getFieldDecorator('fdSelectType', { initialValue: '1' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">机读身份证</Option>
                  <Option value="2">手输身份证</Option>
                  <Option value="3">手输准考证</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem label="核验类型">
              {getFieldDecorator('fdType', { initialValue: '1' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">入场</Option>
                  <Option value="2">退场</Option>
                  <Option value="3">测试</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="比对方式">
              {getFieldDecorator('fdFaceType', { initialValue: '1' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">报名照片</Option>
                  <Option value="2">身份证照片</Option>
                  <Option value="3">身份证或报名照</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="人像比对结果">
              {getFieldDecorator('fdFaceReasult', { initialValue: '1' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">通过</Option>
                  <Option value="2">不通过</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('fdIsDeleted', { initialValue: 'false' })(
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
    const { dataPage: { loading: dataPageLoading, data, viewData } } = this.props;
    const { selectedRows, addModalVisible, addOrUpdate, key } = this.state;
    // dataPage的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];

    const fdFaceTypeMap = ['success', 'processing', 'default'];
      const fdFaceType = ['报名照片','身份证照片','身份证或报名照'];
    const columns = [
      {
        title: '准考证号',
        dataIndex: 'fdLicense',
        sorter: true,
      },
      {
        title: '身份证号',
        dataIndex: 'fdIdentityNumber',
      },
      {
        title: '人像比分',
        dataIndex: 'fdScore',
      },
      {
        title: '比对次数',
        dataIndex: 'fdFaceTimes',
      },
      {
        title: '比对方式',
        dataIndex: 'fdFaceType',
        sorter: true,
        render(val) {
          return (<Badge
            status={
              val === 1 ? fdFaceTypeMap[1] : fdFaceTypeMap[1] === 2 ? fdFaceTypeMap[2] : fdFaceTypeMap[0]}
            text={val === 1 ? fdFaceType[1] : fdFaceType[1] === 2 ? fdFaceType[2] : fdFaceType[0]
            }
          />);
        },
      },
      {
        title: '状态',
        dataIndex: 'fdIsDeleted',
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
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'remove')}>{record[tableDelete] ? '' : '删除'}</a>
          </div>
        ),
      },
    ];
   const addColumns = [
      {
        title: '皮肤名称',
        dataIndex: 'ssName',
        type: 'input',
        validator: this.handleDataPageNameChange,
        required: true,
      },
      {
        title: '皮肤备注',
        dataIndex: 'ssRemark',
        type: 'input',
        required: true,
      },
      {
        title: '访问域名',
        dataIndex: 'ssDomainName',
        type: 'input',
        required: true,
      },
      {
        title: '皮肤ID',
        dataIndex: 'ssSkinId',
        type: 'input',
        required: true,
      },
      {
        title: '皮肤状态',
        dataIndex: 'ssState',
        type: 'input',
        required: true,
      },
    ];
    const detailColumns = [
      {
        title: '现场查询时间',
        dataIndex: 'fdGmtSelect',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '最后操作时间',
        dataIndex: 'fdGmtModified',
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
              loading={dataPageLoading}
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
