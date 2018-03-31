import React,{Component} from "react";
import { Table } from 'antd';
import reqwest from 'reqwest';
import 'antd/lib/table/style/css';
const columns = [{
  title: 'ID',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '5%',
}, {
  title: '项目名称',
  dataIndex: 'gender',
  width: '10%',
}, {
  title: '签约时间',
  dataIndex: 'email',
  width: '5%',
}, {
  title: '借款人',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '5%',
},{
  title: '责任人',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '5%',
},{
  title: '本金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '7%',
},{
  title: '已到期本金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '7%',
},{
  title: '未到期本金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '7%',
},{
  title: '已收回本金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '8%',
}, {
  title: '应收利息',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '5%',
}, {
  title: '已收回利息',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '7%',
}, {
  title: '应收罚金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '7%',
}, {
  title: '已收回罚金',
  dataIndex: '',
  render: name => `${name.first} ${name.last}`,
  width: '7%',
}];
class Tuisong extends React.Component {
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
    return ( <div>
      <div style={{ width: 200 ,marginBottom:20,fontSize:20}}>借款合同分析</div>
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
export default Tuisong;
