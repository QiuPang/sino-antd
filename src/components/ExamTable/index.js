/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Table, Row, Col } from 'antd';
import styles from './index.less';

class ExamTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  /**
   * 当组件传入的 props 发生变化时调用，例如：父组件状态改变，给子组件传入了新的prop值。用于组件 props 变化后，更新state。
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }
  /**
   * 表格选中的条数改变时调用
   * api eg：Function(selectedRowKeys, selectedRows)
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      // 父组件传递的函数，作用：传递selectedRows给父组件（用于批量操作）
      this.props.onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys });
  }
  /**
   * 传给table组件的onchange函数
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }
  renderExpanded = (record) => {
    const { detailColumns } = this.props;
    const arr = [];
    if (detailColumns) {
      detailColumns.slice(0).map(item =>
        arr.push(
          <Row gutter={{ sm: 16, md: 24 }} style={{ padding: 5 }}>
            <span>{item.title}:</span>
            <span>{record[item.dataIndex]}</span>
          </Row>)
      );
    }
    return arr;
  }
  render() {
    const { selectedRowKeys } = this.state;
    const { data: { list, pagination }, loading, columns } = this.props;
    /**
     * 分页器设置
     * showSizeChanger 是否可以改变 pageSize ，showQuickJumper 是否可以快速跳转至某页
     * @type {{showSizeChanger: boolean, showQuickJumper: boolean}}
     */
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    /**
     * 列表是否可选择配置
     * selectedRowKeys 指定选中项的 key 数组，需要和 onChange 进行配合
     * onChange 选中项发生变化的时的回调
     * getCheckboxProps 选择框的默认属性配置
     * @type {{selectedRowKeys: Array, onChange: function(*, *=), getCheckboxProps: function(*): {disabled}}}
     */
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    /**
     * onChange 分页、排序、筛选变化时触发
     * Function(pagination, filters, sorter)
     */
    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          expandedRowRender={record => this.renderExpanded(record)}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default ExamTable;
