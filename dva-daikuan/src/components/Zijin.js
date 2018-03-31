import React,{Component} from "react";
import { Table,Input } from 'antd';
import reqwest from 'reqwest';
import 'antd/lib/table/style/css';
const Search = Input.Search;
const columns = [{
  title: '借款人',
  dataIndex: 'name',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '贷款总数',
  dataIndex: 'gender',
  width: '10%',
}, {
  title: '已到期本金',
  dataIndex: 'email',
  width: '10%',
}, {
  title: '未到期本金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '已收回本金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '应收利息',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '已收回利息',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '应收罚金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}, {
  title: '已收回罚金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '10%',
}];
class Zijin extends React.Component {
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
      <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>借款资金分析</div>
          <Search
          placeholder="借款人"
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
export default Zijin;
