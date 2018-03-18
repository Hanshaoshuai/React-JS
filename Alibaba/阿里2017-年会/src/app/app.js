import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from '../lib/history'
import Entry from '../pages/entry'
import './app.less';
import '../lib/globals'

if (window.FastClick) {
    window.FastClick.attach(document.body)
}

ReactDOM.render(<Router history={history}>
    <Entry />
</Router>, document.getElementById('App'))
