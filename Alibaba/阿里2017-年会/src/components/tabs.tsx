import * as _ from 'lodash'
import * as React from 'react'
import * as classnames from 'classnames'

export default class Tabs extends React.Component<any, any> {

    state = {
        activeIndex: 0,
    }

    onTabClick(i) {
        this.setState({ activeIndex: i })
    }

    render() {
        const { activeIndex } = this.state
        const { className, children, extra } = this.props
        const elements = React.Children.toArray(children)
        const element = elements[activeIndex]
        const titles = _.map(elements, e => e.props.title)

        return (<div className={classnames('tabs', className)}>
            <div className="tab-head">
                {_.map(titles, (title, i) => (<div
                    key={`${i}-${title}`}
                    className={classnames({
                        tab: true,
                        active: activeIndex === i,
                    })}
                    onClick={this.onTabClick.bind(this, i)}
                >
                    <span>{title}</span>
                </div>))}
                {extra}
            </div>
            <div className="tab-body">
                {element}
            </div>
        </div>)
    }
}

