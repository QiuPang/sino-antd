import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Select, Icon, Button, Dropdown, Input, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import ViewModal from '../../components/ViewModal';

import styles from './Common.less';
import { convertUrl } from '../../utils/utils';
import request from '../../utils/request';

// 表主键
const tableId = 'muId';
const tableDelete = 'muIsDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  ukey: state.ukey,
}))
@Form.create()
export default class ukeyData extends PureComponent {
  state = {
    addModalVisible: false,
    selectedRows: [],
    viewModalVisible: false,
    queryFormValues: {},
    addOrUpdate: '',
    key: '',
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
    // 考试计划下拉菜单数据
    dispatch({
      type: 'ukey/examPlanNameSelect',
      payload: { depExamPlanName: '' },
    });
    // 软件包下拉菜单数据
    dispatch({
      type: 'ukey/ukeyProgramSelect',
      payload: { mupName: '' },
    });
    // 硬件包下拉菜单数据
    dispatch({
      type: 'ukey/machineSelect',
      payload: { deExamName: '' },
    });
    // 考试数据下拉菜单
    dispatch({
      type: 'ukey/examDataSelect',
      payload: { dedPlanId: '' },
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
        type: 'ukey/fetch',
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
      type: 'ukey/fetch',
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
          type: 'ukey/remove',
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
        type: 'ukey/fetch',
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
  // addModal隐藏显示
  handleViewModalVisible = (flag) => {
    this.setState({
      viewModalVisible: !!flag,
    });
  };
  // 列表单项操作
  handleSingleDoneClick = (key, flag) => {
    const { dispatch } = this.props;
    const values = {};
    values[tableId] = key;
    switch (flag) {
      // 详情
      case 'view':
        this.setState({
          viewModalVisible: true,
        });
        dispatch({
          type: 'ukey/view',
          payload: values,
        });
        break;
      // 修改
      case 'update':
        dispatch({
          type: 'ukey/view',
          payload: values,
        });
        this.setState({
          addOrUpdate: 'update',
          addModalVisible: true,
          key,
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
                type: 'ukey/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'ukey/remove',
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
  // ukey名字重复校验
  handleUkeyNumberChange = (rule, value, callback) => {
      const { key } = this.state;
      const values = {
        method: 'POST',
        body: { muUkeyNumber: value },
      };
      const url = convertUrl('/data/examPlanNameVerify');
      const response = request(url, values);
      console.log('U盾编号重复验证传值:', values);
      response.then((data) => {
        if (data) {
          console.log('U盾编号重复验证返回值:', data);
          data.status === '1' ? callback() : callback('U盾编号重复！');
        }
      });
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
        dispatch({
          type: 'ukey/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'ukey/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'ukey/update',
          payload: {
            ...values,
          },
          callback,
        });
      }
      // 刚刚提交就隐藏
      this.handleAddModalVisible(false);
    });
  }
  // 渲染简单查询
  renderSimpleQueryForm() {
    const { ukey: { examPlanNameSelectData } } = this.props;
    const examPlanNameOptions = [];
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
            <FormItem label="U盾设备编号">
              {getFieldDecorator('muUkeyNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="有效期">
              {getFieldDecorator('muValidity')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('muType')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="--请选择--"
                >
                  <Option key="1" value="1">1</Option>
                  <Option key="2" value="2">2</Option>
                  <Option key="3" value="3">3</Option>
                  <Option key="4" value="4">4</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('muState')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="--请选择--"
                >
                  <Option key="1" value="1">初始</Option>
                  <Option key="2" value="2">使用</Option>
                  <Option key="3" value="3">丢失</Option>
                  <Option key="4" value="4">损坏</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否删除">
              {getFieldDecorator('muIsDeleted', { initialValue: 'false' })(
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { ukey: { loading: ukeyLoading, data, machineSelectData, ukeyProgramSelectData,
      ukeySelectData, examPlanNameSelectData, examDataSelectData, viewData } } = this.props;
    const { selectedRows, addModalVisible, viewModalVisible,
      addOrUpdate, key } = this.state;
    // ukey的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];
    const columns = [
      {
        title: 'U盾编号',
        dataIndex: 'muUkeyNumber',
      },
      {
        title: '备注',
        dataIndex: 'muRemark',
      },
      {
        title: '有效期',
        dataIndex: 'muValidity',
      },
      {
        title: '类型',
        dataIndex: 'muType',
      },
      {
        title: '状态',
        dataIndex: 'muState',
      },
      {
        title: '创建时间',
        dataIndex: 'muGmtCreate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '修改时间',
        dataIndex: 'muGmtModified',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '是否删除',
        dataIndex: 'muIsDeleted',
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
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'view')}>{record[tableDelete] ? '' : '详情'}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'update')}>{record[tableDelete] ? '' : '修改'}</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleSingleDoneClick(record[tableId], 'remove')}>{record[tableDelete] ? '' : '删除'}</a>
          </div>
        ),
      },
    ];
    const addColumns = [
      {
        title: 'U盾编号',
        dataIndex: 'muUkeyNumber',
        type: 'input',
        validator: this.handleUkeyNumberChange,
        required: true,
      },
      {
        title: '备注',
        dataIndex: 'muRemark',
        type: 'input',
        required: true,
      },
      {
        title: '有效期',
        dataIndex: 'muValidity',
        type: 'input',
      },
      {
        title: '类型',
        dataIndex: 'muType',
        type: 'select',
        selectData: {
          dataMain: {
            list: [{
              key: '1',
              val: '1',
            },
            {
              key: '2',
              val: '2',
            },
            {
              key: '3',
              val: '3',
            },
            {
              key: '4',
              val: '4',
            }],
          } },
        required: true,
      },
      {
        title: '状态',
        dataIndex: 'muState',
        type: 'select',
        selectData: {
          dataMain: {
            list: [{
              key: '1',
              val: '初始',
            },
            {
              key: '2',
              val: '使用',
            },
            {
              key: '3',
              val: '丢失',
            },
            {
              key: '4',
              val: '损坏',
            }],
          } },
        required: true,
      },
    ];
    const viewColumns = [
      {
        title: 'U盾编号',
        dataIndex: 'muUkeyNumber',
      },
      {
        title: '备注',
        dataIndex: 'muRemark',
      },
      {
        title: '有效期',
        dataIndex: 'muValidity',
      },
      {
        title: '类型',
        dataIndex: 'muType',
      },
      {
        title: '状态',
        dataIndex: 'muState',
      },
      {
        title: '创建时间',
        dataIndex: 'muGmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'muGmtModified',
      },
      {
        title: '是否删除',
        dataIndex: 'muIsDeleted',
      },
    ];
    const menu = (
      <Menu onClick={this.handleBatchClick} selectedKeys={[]} />
    );
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleQueryForm()}
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
              loading={ukeyLoading}
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
          viewData={viewData}
          addOrUpdate={addOrUpdate}
          key={key}
        />
        <ViewModal
          viewColumns={viewColumns}
          viewData={viewData}
          viewModalVisible={viewModalVisible}
          handleViewModalVisible={this.handleViewModalVisible}
        />
      </div>
    );
  }
}
