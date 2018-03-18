import * as React from 'react'
import * as classnames from 'classnames'

export default class HeaderAward extends React.Component<any, any> {

    onClick = () => {
        // todo
    }

    render() {
        return (<div className={classnames('header-award', this.props.className)} onClick={this.onClick}>奖品规则</div>)
    }
}
