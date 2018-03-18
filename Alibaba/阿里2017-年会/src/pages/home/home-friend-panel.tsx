import * as _ from 'lodash'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Friend from '../../components/friend'
import { Friend as FriendModel } from '../../models/friend'

export default class HomeFriendPanel extends React.Component<any, any> {
    render() {
        return (<div>
            <div className="home-rank-panel">
                {_.times(10, i => <Friend model={new FriendModel()} key={i} />)}
            </div>
            <Link to="/friends" className="more">
                查看更多
            </Link>
        </div>
        )
    }
}
