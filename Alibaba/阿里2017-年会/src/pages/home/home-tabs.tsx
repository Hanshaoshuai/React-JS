import * as React from 'react'
import FriendPanel from './home-friend-panel'
import RankPanel from './home-rank-panel'
import Icon from '../../components/icon'
import Tabs from '../../components/tabs'

export default class HomeTabs extends React.Component<any, any> {
    showSearch = () => {
        this.props.history.push('/search');
    }

    render() {
        return (<div>
            <Tabs className="list-tabs" extra={<Icon name="search" onClick={this.showSearch} />} >
                <FriendPanel title="我的小伙伴" />
                <RankPanel title="魅力人气榜" />
            </Tabs>
        </div>)
    }
}
