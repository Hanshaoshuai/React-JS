
import _ from 'lodash'

const resumeCallbacks = []

document.addEventListener('resume', e => {
    const { data } = e

    while (resumeCallbacks.length) {
        const callback = resumeCallbacks.pop()

        try {
            callback(data)
        } catch (err) {
            console.error('call resume callback error')
            console.error(err)
        }
    }
}, false)

export const didResume = callback => resumeCallbacks.push(callback)

export const pushWindow = (url, callback) => {
    const a = document.createElement('a')

    a.href = url

    AlipayJSBridge.call('pushWindow', {
        url: a.href,
        param: {
            readTitle: true,
            defaultTitle: document.title,
            showLoading: false,
        },
    })

    if (_.isFunction(callback)) {
        didResume(callback)
    }
}

export const popWindow = (data) => {
    AlipayJSBridge.call('popWindow', data)
}

