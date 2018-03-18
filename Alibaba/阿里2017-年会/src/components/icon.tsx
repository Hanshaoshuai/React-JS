import * as React from 'react'
import * as classnames from 'classnames'

export default class Icon extends React.Component<any, any> {

    render() {
        const { className, name, ...others } = this.props

        return (<i className={classnames({
            iconfont: true,
            [`icon-${name}`]: true,
            [className]: !!className,
        })} {...others} />)
    }
}
