/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Badge, Modal, Divider } from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ExamTable from '../../components/ExamTable';
import AddOrUpdateModal from '../../components/AddOrUpdateModal';
import ViewMoreModal from '../../components/ViewMoreModal';
import styles from './Common.less';
import request from '../../utils/request';
import { convertUrl } from '../../utils/utils';

// 表主键
const tableId = 'dlId';
const tableDelete = 'dlDeleted';
const FormItem = Form.Item;
// es6对象的解构赋值
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  license: state.license,
}))
@Form.create()
export default class LicensesData extends PureComponent {
  state = {
    addModalVisible: false,
    viewModalVisible: false,
    selectedRows: [],
    queryFormValues: {},
    addOrUpdate: '',
    key: '',
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
    // 考试计划下拉菜单数据
    dispatch({
      type: 'license/examPlanNameSelect',
      payload: { depExamPlanName: '' },
    });
    // 行政区下拉菜单数据
    dispatch({
      type: 'license/areaSelect',
      payload: { daAreaPid: '' },
    });
    // 科目下拉菜单数据
    dispatch({
      type: 'license/subjectSelect',
      payload: { dlSubjectId: '' },
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
        type: 'license/fetch',
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
      type: 'license/fetch',
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
          type: 'license/remove',
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
        type: 'license/fetch',
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
          type: 'license/view',
          payload: values,
        });
        dispatch({
          type: 'license/photoView',
          payload: { dpId: key },
        });
        dispatch({
          type: 'license/examineeView',
          payload: { dexId: key },
        });
        break;
      // 修改
      case 'update':
        dispatch({
          type: 'license/view',
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
                type: 'license/fetch',
                payload: { ...this.state.queryFormValues },
              });
            };
            dispatch({
              type: 'license/remove',
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
  // addForm考试名字重复校验
  handleLicenseNameChange = (rule, value, callback) => {
    const { key } = this.state;
    const { license: { viewData } } = this.props;
    const body = {};
    body[tableId] = key;
    let values = {};
    if (this.state.addOrUpdate === 'update') {
      values = {
        method: 'POST',
        body: { ...body, dlIdentity: value, dlPlanId: viewData.dlPlanId },
      };
    } else {
      values = {
        method: 'POST',
        body: { ...body, dlIdentity: value, dlPlanId: '' },
      };
    }

    const url = convertUrl('/data/identityVerify');
    const response = request(url, values);
    console.log('身份证重复验证传值:', values);
    response.then((data) => {
      if (data) {
        console.log('身份证重复验证返回值:', data);
        data.status === '1' ? callback() : callback('身份证重复！');
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
          type: 'license/fetch',
          payload: { ...queryFormValues },
        });
      };
      if (addOrUpdate === 'add') {
        dispatch({
          type: 'license/add',
          payload: values,
          callback,
        });
      } else if (addOrUpdate === 'update') {
        values[tableId] = key;
        dispatch({
          type: 'license/update',
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
  // 切换查询面板收放
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }
  // 渲染复杂查询
  renderSimpleQueryForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmitQueryForm} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="考生名字">
              {getFieldDecorator('dlExamineeName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证号">
              {getFieldDecorator('dlIdentity')(
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
  // 渲染简单查询
  renderAdvancedQueryForm() {
    const { license: { subjectSelectData, areaSelectData, examPlanNameSelectData } } = this.props;
    const subjectOptions = [];
    const areaOptions = [];
    const examPlanNameOptions = [];
    if (subjectSelectData) {
      subjectSelectData.dataMain.list.map(item =>
        subjectOptions.push(<Option key={item.key} value={item.key}>{item.val}</Option>)
      );
    }
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
            <FormItem label="考生名字">
              {getFieldDecorator('dlExamineeName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证号">
              {getFieldDecorator('dlIdentity')(
                <Input placeholder="请输入" />
                )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="准考证号">
              {getFieldDecorator('dlLicense')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="考试计划名称">
              {getFieldDecorator('dlPlanId')(
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
            <FormItem label="行政区">
              {getFieldDecorator('dlAreaId')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="--请选择--"
                >
                  {areaOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="科目">
              {getFieldDecorator('dlSubjectId')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="--请选择--"
                >
                  {subjectOptions}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否删除">
              {getFieldDecorator('dlDeleted', { initialValue: 'false' })(
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
    const { license: { loading: licenseLoading, data, subjectSelectData, areaSelectData,
      examPlanNameSelectData, viewData, examineeViewData, photoViewData } } = this.props;
    const { selectedRows, addModalVisible, viewModalVisible,
      addOrUpdate, key } = this.state;
    // license的columns
    const statusMap = ['success', 'error'];
    const status = ['活动的', '已删除'];
    const columns = [
      {
        title: '考生名称',
        dataIndex: 'dlExamineeName',
      },
      {
        title: '身份证号',
        dataIndex: 'dlIdentity',
      },
      {
        title: '准考证号',
        dataIndex: 'dlLicense',
      },
      {
        title: '行政区名',
        dataIndex: 'dlAreaName',
      },
      {
        title: '科目名称',
        dataIndex: 'dlSubjectName',
      },
      {
        title: '是否删除',
        dataIndex: 'dlDeleted',
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
    const detailColumns = [
      {
        title: '考试计划名称',
        dataIndex: 'dlPlanName',
      },
      {
        title: '创建时间',
        dataIndex: 'dlGmtCreate',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '修改时间',
        dataIndex: 'dlGmtModified',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
    ];
    const addColumns = [
      {
        title: '考生名称',
        dataIndex: 'dlExamineeName',
        type: 'input',
        required: true,
      },
      {
        title: '身份证号',
        dataIndex: 'dlIdentity',
        type: 'input',
        validator: this.handleLicenseNameChange,
        required: true,
      },
      {
        title: '准考证号',
        dataIndex: 'dlLicense',
        type: 'input',
        required: true,
      },
      {
        title: '行政区名',
        dataIndex: 'dlAreaId',
        type: 'select',
        selectData: areaSelectData,
        required: true,
      },
      {
        title: '考试计划名称',
        dataIndex: 'dlPlanId',
        type: 'select',
        selectData: examPlanNameSelectData,
        required: true,
      },
      {
        title: '科目名称',
        dataIndex: 'dlSubjectId',
        type: 'select',
        selectData: subjectSelectData,
        required: true,
      },
      {
        title: '创建时间',
        dataIndex: 'dlGmtCreate',
        type: 'date',
        required: true,
      },
      {
        title: '修改时间',
        dataIndex: 'dlGmtModified',
        type: 'date',
        required: true,
      },
    ];
    const viewColumns = [
      {
        title: '考生名称',
        dataIndex: 'dlExamineeName',
      },
      {
        title: '身份证号',
        dataIndex: 'dlIdentity',
      },
      {
        title: '准考证号',
        dataIndex: 'dlLicense',
      },
      {
        title: '行政区名',
        dataIndex: 'dlAreaName',
      },
      {
        title: '考试计划名称',
        dataIndex: 'dlPlanName',
      },
      {
        title: '科目名称',
        dataIndex: 'dlSubjectName',
      },
      {
        title: '创建时间',
        dataIndex: 'dlGmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'dlGmtModified',
      },
    ];
    const viewLowColumns = [
      {
        title: '年龄',
        dataIndex: 'dexAge',
      },
      {
        title: '性别',
        dataIndex: 'dexSex',
      },
      {
        title: '学历',
        dataIndex: 'dexLearn',
      },
      {
        title: '电话',
        dataIndex: 'dexPhone',
      },
      {
        title: '党派',
        dataIndex: 'dexParty',
      },
      {
        title: '国籍',
        dataIndex: 'dexNation',
      },
      {
        title: '单位',
        dataIndex: 'dexUnit',
      },
    ];
    const viewPhotoColumns = [
      {
        title: '图片路径',
        dataIndex: 'dpPhotoPath',
      },
      {
        title: '图片文件大小',
        dataIndex: 'dpSize',
      },
      {
        title: '图片高度',
        dataIndex: 'dpHeight',
      },
      {
        title: '图片宽',
        dataIndex: 'dpWidth',
      },
      {
        title: '图片格式',
        dataIndex: 'dpFormat',
      },
      {
        title: '照片质量',
        dataIndex: 'dpQuality1',
      },
      {
        title: '照片质量2',
        dataIndex: 'dpQuality2',
      },
      {
        title: '瞳距',
        dataIndex: 'dpEyp',
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
              loading={licenseLoading}
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
        <ViewMoreModal
          viewColumns={viewColumns}
          viewData={viewData}
          viewModalVisible={viewModalVisible}
          handleViewModalVisible={this.handleViewModalVisible}
          viewLowData={examineeViewData}
          viewPhotoData={photoViewData}
          viewLowColumns={viewLowColumns}
          viewPhotoColumns={viewPhotoColumns}
        />
      </PageHeaderLayout>
    );
  }
}
