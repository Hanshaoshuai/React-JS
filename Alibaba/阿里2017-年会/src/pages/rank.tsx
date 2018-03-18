import * as React from 'react'
import * as _ from 'lodash'
import { request } from '../lib/request'
import Header from '../components/header/header'
import RankBanner from '../components/rank-banner'

import Friend from '../components/friend'
import { Friend as FriendModel } from '../models/friend'

export default class RankPage extends React.Component<any, any> {
    state = {
        list: [],
    }

    componentWillMount() {
        this.fetch();
    }

    fetch() {
        const params = {
            pageSize: 50,
            currentPage: 0,
        }
        request('receiveEnergyList', params).then((content) => {
            this.setState({
                list: content.list,
            });
        })
    }

    render() {
        return (<div className="page page-rank">
            <Header title="魅力人气榜" >
            </Header>
            <div className="page-body">
                <div className="page-rank-banner">
                    <RankBanner data={this.state.list} />
                </div>
                {this.state.list.map((item, i) => {
                    return <Friend index={i + 1} rank action={false} model={item} key={i} />
                })}
            </div>
        </div>)
    }
}
