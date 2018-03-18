import * as React from 'react'
import * as classnames from 'classnames'
import history from '../../lib/history'

function historyGoBack():void {
    if (history.length > 1) {
        history.goBack()
    } else {
        window.AlipayJSBridge ? window.AlipayJSBridge.call('popWindow', {}) : history.goBack()
    }
}

document.addEventListener('back', (e:Event):void => {
    e.preventDefault()
    historyGoBack()
})

interface IProps {
    readonly title: string
}


export default class Header extends React.Component<IProps, any> {

    render() {
        return (<div className="header">
            <div className="back" onClick={historyGoBack}>
                <i className="iconfont icon-back" />
            </div>
            <div className="header-title">{this.props.title}</div>
            <div className="header-actions">
                {React.Children.map(this.props.children, (c, i) => {
                    return React.cloneElement(c, {
                        ...c.props,
                        className: classnames('action', c.props.className),
                    })
                })}
            </div>
        </div>)
    }
}
