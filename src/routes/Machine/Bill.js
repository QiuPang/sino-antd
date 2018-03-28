/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import SinoAddMoreModal from '../../components/SinoAddMoreModal';
import styles from './Common.less';

// 表主键
const tableId = 'mbId';
const tableDelete = 'mbIsDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  bill: state.bill,
}))
@Form.create()
export default class Bill extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addModalVisible: false,
      addMoreModalVisible: false,
      selectedRows: [],
      queryFormValues: {},
      addOrUpdate: '',
      key: '',
    };
  }

  componentDidMount() {
    const { dispatch, form, location } = this.props;
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
        mbPlaceId: location.search.split('=')[1],
        ...fieldsValue,
      };
      this.setState({
        queryFormValues: values,
      });
      dispatch({
        type: 'bill/fetch',
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
      type: 'bill/fetch',
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
        mbPlaceId: location.search.split('=')[1],
        ...fieldsValue,
      };
      this.setState({
        queryFormValues: values,
      });
      dispatch({
        type: 'bill/fetch',
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
      addMoreModalVisible: true,
    });
  }
  // addModal隐藏显示
  handleAddMoreModalVisible = (flag) => {
    this.setState({
      addMoreModalVisible: !!flag,
    });
  };
  // 列表单项操作
  handleSingleDoneClick = (key, flag) => {
    const { dispatch } = this.props;
    const values = {};
    values[tableId] = key;
    switch (flag) {
      // 修改
      case 'update':
        dispatch({
          type: 'bill/view',
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
          title: '确定删除此考点吗?',
          content: '',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            const callback = () => {
              this.handleAddModalVisible(false);
              dispatch({
                type: 'bill/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'bill/remove',
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
          type: 'bill/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'bill/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'bill/update',
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
                  billholder="--请选择--"
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
                  billholder="--请选择--"
                >
                  {areaOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="考点名称">
              {getFieldDecorator('mbPlaceId')(
                <Select
                  style={{ width: '100%' }}
                  billholder="--请选择--"
                >
                  {examPlanNameOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否删除">
              {getFieldDecorator('mbIsDeleted', { initialValue: 'false' })(
                <Select billholder="请选择" style={{ width: '100%' }}>
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
    const { bill: { loading: billLoading, data,
      areaSelectData, examPlanNameSelectData, viewData } } = this.props;
    const { selectedRows, addModalVisible, addMoreModalVisible,
      addOrUpdate, key } = this.state;
    // bill的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];
    const columns = [
      {
        title: '设备名称',
        dataIndex: 'mbMachineName',
      },
      {
        title: '设备数量',
        dataIndex: 'mbCount',
      },
      {
        title: '计划名称',
        dataIndex: 'mbPlanName',
      },
      {
        title: '行政区名称',
        dataIndex: 'mbAreaName',
      },
      {
        title: '考点名称',
        dataIndex: 'mbPlaceName',
      },
      {
        title: '类型',
        dataIndex: 'mbState',
      },
      {
        title: '创建时间',
        dataIndex: 'mbGmtCreate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '修改时间',
        dataIndex: 'mbGmtModified',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '是否删除',
        dataIndex: 'mbIsDeleted',
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
        title: '考试计划名称',
        dataIndex: 'dpPlanId',
        type: 'select',
        selectData: examPlanNameSelectData,
        required: true,
      },
      {
        title: '行政区',
        dataIndex: 'dpAreaId',
        type: 'select',
        selectData: areaSelectData,
        required: true,
      },
      {
        title: '考点编号',
        dataIndex: 'dpbillId',
        type: 'input',
      },
      {
        title: '考点名称',
        dataIndex: 'dpbillName',
        type: 'input',
        required: true,
      },
      {
        title: '考点地址',
        dataIndex: 'dpbillAddr',
        type: 'input',
        required: true,
      },
      {
        title: '父级考点地址',
        dataIndex: 'dpbillPname',
        type: 'input',
      },
      {
        title: '备注',
        dataIndex: 'dpRemark',
        type: 'input',
      },
    ];
    const addMoreColumnsList = [
      {
        title: '设备外键',
        dataIndex: 'mbMachineId',
        type: 'input',
      },
      {
        title: '设备数量',
        dataIndex: 'mbCount',
        type: 'input',
        required: true,
      },
      {
        title: '设备类型',
        dataIndex: 'mbState',
        type: 'input',
      }];
    const menu = (
      <Menu onClick={this.handleBatchClick} selectedKeys={[]} />
    );
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>

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
              loading={billLoading}
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
        <SinoAddMoreModal
          addMoreColumnsList={addMoreColumnsList}
          addMoreModalVisible={addMoreModalVisible}
          handleSubmitAddForm={this.handleSubmitAddForm}
          handleAddMoreModalVisible={this.handleAddMoreModalVisible}
          viewData={viewData}
          addOrUpdate={addOrUpdate}
        />
      </PageHeaderLayout>
    );
  }
}
