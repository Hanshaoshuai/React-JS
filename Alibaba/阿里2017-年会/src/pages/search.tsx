import * as React from 'react'
import Icon from '../components/icon'
import * as classnames from 'classnames'
import * as _ from 'lodash'

import Friend from '../components/friend'
import { Friend as FriendModel } from '../models/friend'

export default class FriendPage extends React.Component<any, any> {

    onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.children[0].value)
    }
    onBack = () => {
        this.props.history.goBack()
    }

    focusInput = () => {
        this.refs.input.focus();
    }
    render() {
        return (<div className="page page-home">
            <div className="search-header">
                <Icon name="search" onClick={this.focusInput.bind(this)} />
                <form
                    action="post"
                    className={classnames({
                        'search-panel': true,
                    })}
                    onClick={this.focusInput.bind(this)}
                    onSubmit={this.onSubmit}
                >
                    <input
                        ref="input"
                        className="search-input"
                        type="search"
                        placeholder="寻找小伙伴"
                    />
                </form>
                <span onClick={this.onBack}>取消</span>
            </div>
            <div className="search-body">
                <div className="search-body-title">联系人</div>
                {_.times(10, i => <Friend model={new FriendModel()} key={i} />)}
            </div>

        </div>)
    }
}
