import * as React from 'react'
import * as classnames from 'classnames'
// todo 获取能量消息接口，合适更新

export default class HeaderMessage extends React.Component<any, any> {

    onClick = () => {
        // todo 弹出消息
    }

    render() {
        return (<i className={classnames({
            'iconfont': true,
            'icon-mail': true,
            'mark': true,
            [this.props.className]: !!this.props.className,
        })} onClick={this.onClick} />)
    }
}
