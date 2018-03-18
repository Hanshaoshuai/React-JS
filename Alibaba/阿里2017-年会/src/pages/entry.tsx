import * as React from 'react'
import * as classnames from 'classnames'
import { Route } from 'react-router-dom'
import Home from './home/home'
import Friends from './friends'
import Search from './search'
import Rank from './rank'

export default class Entry extends React.Component {
    state = {
        imageLoaded: false,
        resourceLoaded: false
    }

    onImageLoad  = (e) => {
        this.setState({
            imageLoaded: true,
            resourceLoaded: true
        })
    }

    onImageLoadError = (e) => {
        this.setState({
            imageLoaded: false,
            resourceLoaded: true,
        })
    }

    renderChildren() {
        if (this.state.resourceLoaded) {
            return <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/friends" component={Friends} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/rank" component={Rank} />
            </div>
        }
    }
    
    render() {
        return (<div className="app-entry">
            <img
                className={classnames({
                    'entry-bg': true,
                    'loaded': this.state.imageLoaded,
                })}
                src="/static/background.gif"
                alt=""
                onLoad={this.onImageLoad}
                onError={this.onImageLoadError}
            />
            {this.renderChildren()}
        </div>)
    }
}
