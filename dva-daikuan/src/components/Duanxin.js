import React,{Component} from "react";
import { Table,DatePicker } from 'antd';
import reqwest from 'reqwest';
import 'antd/lib/table/style/css';
import 'antd/lib/date-picker/style/css';
const { RangePicker } = DatePicker;
const columns = [{
  title: 'ID',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '7%',
}, {
  title: '发送时间',
  dataIndex: 'gender',
  width: '10%',
}, {
  title: '电话号码',
  dataIndex: 'email',
  width: '10%',
}, {
  title: '发送内容',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '50%',
}, {
  title: '发送状态',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '说明',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}];
class Duanxin extends React.Component {
 state = {
    data: [],
    pagination: {},
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <div>
      <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>短信记录</div>
      <RangePicker style={{ marginBottom:20 }}/>
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    </div>
    );
  }
}
export default Duanxin;
