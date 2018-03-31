import React,{Component} from "react";
import { Table,Input } from 'antd';
import reqwest from 'reqwest';
import 'antd/lib/table/style/css';
import {Link} from 'dva/router';
const Search = Input.Search;
const columns = [{
  title: 'ID',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '5%',
}, {
  title: '合同编号',
  dataIndex: 'gender',
  width: '10%',
}, {
  title: '签约时间',
  dataIndex: 'email',
  width: '10%',
}, {
  title: '贷款种类',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
},{
  title: '项目名称',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
},{
  title: '责任人',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
},{
  title: '借款人',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
},{
  title: '借款金额',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
},{
  title: '借款期限',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, { title: '操作', dataIndex: '', key: 'x', render: () =>(<span><a href="#/caidan">查看</a> <Link to='huankuanjihua'>还款计划</Link> <a href="#/rizhi">查看日志</a></span>)}];
class Mydai extends React.Component {
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
      <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>我的贷款</div>
       <Search
    placeholder="债务人"
    style={{ width: 200 ,marginBottom:20}}
    onSearch={value => console.log(value)}
  />
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
export default Mydai;
