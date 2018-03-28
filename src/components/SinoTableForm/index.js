/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { Table, Button, Input, message, Popconfirm, Form, Modal, DatePicker, Select } from 'antd';
import styles from './style.less';

export default class SinoTableForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }
  getRowByKey(key) {
    return this.state.data.filter(item => item.key === key)[0];
  }
  index = 0;
  // input onchange事件
  handleFieldChange(e, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  // datePicker onchange 事件
  handleDateChange = (date, dateString) => {
    // const newData = [...this.state.data];
    // const target = this.getRowByKey(key);
    // if (target) {
    //   target[fieldName] = e.target.value;
    //   this.setState({ data: newData });
    // }
    console.log(date, dateString, this.state.key);
  }
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
  }
  handleAddFormSubmit() {
    const { handleSubmit } = this.props;
    const { data } = this.state;
    let hasEmpty = false;
    data.map((item) => {
      for (const prop in item) {
        if (item.prop === '') {
          hasEmpty = true;
        }
      }
    });
    if (hasEmpty) {
      message.warning('输入项不能为空');
    } else {
      data.map((item) => {
        delete item.key;
        return item;
      });
      handleSubmit(data);
      this.setState({ data: [] });
    }
  }

  newMember = () => {
    const { columns } = this.props;
    const newData = [...this.state.data];
    const columnsItem = {};
    columns.slice(0).map((item) => {
      columnsItem[item.dataIndex] = '';
      return item;
    });
    columnsItem.key = `${this.index}`;
    newData.push(columnsItem);
    this.index += 1;
    this.setState({ data: newData });
  };
  renderForm = () => {
    const { columns } = this.props;
    const Option = Select.Option;
    columns.map((item) => {
      if (item.type === 'input') {
        item.render = (text, record) => (
          <Input
            onChange={e => this.handleFieldChange(e, item.dataIndex, record.key)}
            placeholder={item.title}
          />
        );
      } else if (item.type === 'date') {
        item.render = (text, record) => (
          <DatePicker
            onChange={this.handleDateChange}
            showTime
            format="YY-MM-DD hh:mm"
            style={{ width: '100%' }}
          />
        );
      } else if (item.type === 'select' && item.selectData) {
        const options = [];
        item.selectData.dataMain.list.map(item =>
          options.push(<Option key={item.key}>{ item.val }</Option>)
        );
        item.render = (text, record) => (
          <Select
            style={{ width: '100%' }}
            onChange={e => this.handleFieldChange(e, item.dataIndex, record.key)}
            placeholder={`请选择${item.title}`}
          >{options}
          </Select>
        );
      } else {
        item.render = (text, record) => (<span>
          <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
            <a>删除</a>
          </Popconfirm>
        </span>);
      }
      return item;
    });

    // const columns = [{
    //   title: '成员姓名',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: '20%',
    //   render: (text, record) => (<Input
    //     onChange={e => this.handleFieldChange(e, 'name', record.key)}
    //     placeholder="成员姓名"
    //   />),
    // }, {
    //   title: '工号',
    //   dataIndex: 'workId',
    //   key: 'workId',
    //   width: '20%',
    //   render: (text, record) => (<Input
    //     onChange={e => this.handleFieldChange(e, 'workId', record.key)}
    //     placeholder="成员姓名"
    //   />),
    // }, {
    //   title: '所属部门',
    //   dataIndex: 'department',
    //   key: 'department',
    //   width: '40%',
    //   render: (text, record) => (<Input
    //     onChange={e => this.handleFieldChange(e, 'department', record.key)}
    //     placeholder="成员姓名"
    //   />),
    // }, {
    //   title: '操作',
    //   key: 'action',
    //   render: (text, record) => (<span>
    //     <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
    //       <a>删除</a>
    //     </Popconfirm>
    //   </span>),
    // }];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={(record) => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button>
      </div>
    );
  }
  render() {
    const { modalVisible, handleModalVisible } = this.props;
    return (
      <Modal
        title="新建考试"
        visible={modalVisible}
        onOk={() => this.handleAddFormSubmit()}
        onCancel={() => handleModalVisible(false)}
        width="1000px"
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

