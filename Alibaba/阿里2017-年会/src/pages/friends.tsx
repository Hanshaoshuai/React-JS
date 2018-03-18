import * as React from 'react'
import Header from '../components/header/header'
import Message from '../components/header/header-message'
import Search from '../components/header/header-search'
import FriendList from './home/home-rank-panel'

export default class FriendPage extends React.Component<any, any> {
    onClickSearch = () => {
        this.props.history.push('/search');
    }

    render() {
        return (<div className="page page-home">
            <Header title="我的小伙伴" >
                <Search onClick={this.onClickSearch} />
                <Message />
            </Header>
            <div className="page-body">
                <FriendList />
                </div>
        </div>)
    }
}
