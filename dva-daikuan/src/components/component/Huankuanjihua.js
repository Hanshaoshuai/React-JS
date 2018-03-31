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
  title: '还款时间',
  dataIndex: 'gender',
  sorter: true,
  width: '15%',
}, {
  title: '还款类型',
  dataIndex: 'email',
  sorter: true,
  width: '10%',
}, {
  title: '还款金额',
  dataIndex: '',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '15%',
}, {
  title: '已还款金额',
  dataIndex: '',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '15%',
}, {
  title: '还款状态',
  dataIndex: '',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '罚金',
  dataIndex: '',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '10%',
},{ title: '操作', dataIndex: '', key: 'x', render: () =>(<span><a href="#/caidan">编辑</a> <a href="#/caidan">还款</a> <a href="#">删除</a></span>)}];
class Huankuanjihua extends React.Component {
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
      <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>还款计划</div>
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
export default Huankuanjihua;
