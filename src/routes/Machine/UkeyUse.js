/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';

import styles from './Common.less';

// 表主键
const tableId = 'muuId';
const tableDelete = 'muuIsDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  ukeyUse: state.ukeyUse,
}))
@Form.create()
export default class UkeyUse extends PureComponent {
  state = {
    addModalVisible: false,
    selectedRows: [],
    queryFormValues: {},
    addOrUpdate: '',
    key: '',
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
    // 考试计划下拉菜单数据
    dispatch({
      type: 'ukeyUse/examPlanNameSelect',
      payload: { depExamPlanName: '' },
    });
    // 软件包下拉菜单数据
    dispatch({
      type: 'ukeyUse/ukeyProgramSelect',
      payload: { mupName: '' },
    });
    // 硬件包下拉菜单数据
    dispatch({
      type: 'ukeyUse/machineSelect',
      payload: { deExamName: '' },
    });
    // 考试数据下拉菜单
    dispatch({
      type: 'ukeyUse/examDataSelect',
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
        type: 'ukeyUse/fetch',
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
      type: 'ukeyUse/fetch',
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
          type: 'ukeyUse/remove',
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
        type: 'ukeyUse/fetch',
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
        dispatch({
          type: 'ukeyUse/view',
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
                type: 'ukeyUse/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'ukeyUse/remove',
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
          type: 'ukeyUse/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'ukeyUse/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'ukeyUse/update',
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
    const { ukeyUse: { examPlanNameSelectData } } = this.props;
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
            <FormItem label="考试计划名称">
              {getFieldDecorator('muuPlanId')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="--请选择--"
                >
                  {examPlanNameOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('muuState')(
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
            <FormItem label="是否删除">
              {getFieldDecorator('dwDeleted', { initialValue: 'false' })(
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
    const { ukeyUse: { loading: ukeyUseLoading, data, machineSelectData, ukeyProgramSelectData,
      ukeySelectData, examPlanNameSelectData, examDataSelectData, viewData } } = this.props;
    const { selectedRows, addModalVisible,
      addOrUpdate, key } = this.state;
    // ukeyUse的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];
    const columns = [
      {
        title: '考试计划',
        dataIndex: 'muuPlanName',
      },
      {
        title: '考试数据包名称',
        dataIndex: 'muuExamdataName',
      },
      {
        title: '程序数据包名称',
        dataIndex: 'muuProgramName',
      },
      {
        title: 'U盾编号',
        dataIndex: 'muuUkeyNumber',
      },
      {
        title: '状态',
        dataIndex: 'muuState',
      },
      {
        title: '创建时间',
        dataIndex: 'muuGmtCreate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '修改时间',
        dataIndex: 'muuGmtModified',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '是否删除',
        dataIndex: 'muuIsDeleted',
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
        title: '考试计划',
        dataIndex: 'muuPlanId',
        type: 'select',
        selectData: examPlanNameSelectData,
        disabled: true,
        required: true,
      },
      {
        title: '软件数据包',
        dataIndex: 'muuExamdataId',
        type: 'select',
        selectData: examDataSelectData,
        disabled: true,
        required: true,
      },
      // {
      //   title: '程序数据包',
      //   dataIndex: 'muuProgramId',
      //   type: 'select',
      //   selectData: ukeyProgramSelectData,
      //   disabled: true,
      //   required: true,
      // },
      // {
      //   title: 'U盾',
      //   dataIndex: 'muuUkeyId',
      //   type: 'select',
      //   selectData: ukeySelectData,
      //   disabled: true,
      //   required: true,
      // },
      {
        title: '状态',
        dataIndex: 'muuState',
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
              loading={ukeyUseLoading}
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
      </div>
    );
  }
}
