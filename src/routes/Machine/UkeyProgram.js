import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import ViewModal from '../../components/ViewModal';

import styles from './Common.less';

// 表主键
const tableId = 'mupId';
const tableDelete = 'mupIsDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  ukeyProgram: state.ukeyProgram,
}))
@Form.create()
export default class UkeyProgram extends PureComponent {
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
        type: 'ukeyProgram/fetch',
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
      type: 'ukeyProgram/fetch',
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
          type: 'ukeyProgram/remove',
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
        type: 'ukeyProgram/fetch',
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
  // addModal隐藏显示
  handleViewModalVisible = (flag) => {
    this.setState({
      viewModalVisible: !!flag,
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
  handleSingleDoneClick = (key, flag, otherKey) => {
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
          type: 'ukeyProgram/view',
          payload: values,
        });
        break;
      // 修改
      case 'update':
        dispatch({
          type: 'ukeyProgram/view',
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
                type: 'ukeyProgram/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'ukeyProgram/remove',
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
        dispatch({
          type: 'ukeyProgram/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'ukeyProgram/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'ukeyProgram/update',
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
    const { ukeyProgram: { examPlanNameSelectData } } = this.props;
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
            <FormItem label="软件包名称">
              {getFieldDecorator('mupName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="软件包版本">
              {getFieldDecorator('mupVersion')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否删除">
              {getFieldDecorator('mupIsDeleted', { initialValue: 'false' })(
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
    const { ukeyProgram: { loading: ukeyProgramLoading, data, viewData } } = this.props;
    const { selectedRows, addModalVisible, viewModalVisible,
      addOrUpdate, key } = this.state;
    // ukeyProgram的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];
    const columns = [
      {
        title: '软件包名称',
        dataIndex: 'mupName',
      },
      {
        title: '软件包版本',
        dataIndex: 'mupVersion',
      },
      {
        title: '备注',
        dataIndex: 'mupRemark',
      },
      {
        title: 'md5签名',
        dataIndex: 'mupMd5',
      },
      {
        title: '数据量',
        dataIndex: 'mupSize',
      },
      {
        title: '状态',
        dataIndex: 'mupState',
      },
      {
        title: '创建时间',
        dataIndex: 'mupGmtCreate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '修改时间',
        dataIndex: 'mupGmtModified',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '是否删除',
        dataIndex: 'mupIsDeleted',
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
        title: '软件包名称',
        dataIndex: 'mupName',
        type: 'input',
        required: true,
      },
      {
        title: '软件包版本',
        dataIndex: 'mupVersion',
        type: 'input',
        required: true,
      },
      {
        title: '备注',
        dataIndex: 'mupRemark',
        type: 'input',
        required: true,
      },
      {
        title: '资源文件',
        dataIndex: 'mupResourceId',
        type: 'select',
        // selectData: resourceSelectData,
        required: true,
      },
      {
        title: '状态',
        dataIndex: 'mupState',
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
    ];
    const viewColumns = [
      {
        title: '软件包名称',
        dataIndex: 'mupName',
      },
      {
        title: '软件包版本',
        dataIndex: 'mupVersion',
      },
      {
        title: '备注',
        dataIndex: 'mupRemark',
      },
      {
        title: '资源文件',
        dataIndex: 'mupResourceId',
      },
      {
        title: '状态',
        dataIndex: 'mupState',
      },
      {
        title: '创建时间',
        dataIndex: 'mupGmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'mupGmtModified',
      },
      {
        title: '是否删除',
        dataIndex: 'mupIsDeleted',
      },
    ];
    const viewLowColumns = [
      {},
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
              loading={ukeyProgramLoading}
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
