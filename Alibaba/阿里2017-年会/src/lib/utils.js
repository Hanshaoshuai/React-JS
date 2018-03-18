
const duration = 3500
let loadingId = 1


export const showInfo = text => AlipayJSBridge.call('toast', { type: 'info', text, duration })
export const showError = errorMsg => AlipayJSBridge.call('toast', { type: 'fail', text: errorMsg, duration })
export const showSuccess = text => AlipayJSBridge.call('toast', { type: 'success', text, duration })
export const showLoading = text => {
    const nextId = loadingId + 1

    AlipayJSBridge.call('showLoading', { text })
    loadingId = nextId

    return () => {
        if (nextId === loadingId) {
            AlipayJSBridge.call('hideLoading')
        }
    }
}
export const alert = (text, btnText) => {
    return new Promise(resolve => {
        AlipayJSBridge.call(
            'alert',
            { message: text, button: btnText },
            resolve
        )
    })
}

export const confirm = (title, message, okButton, cancelButton) => {
    return new Promise((resolve, reject) => {
        AlipayJSBridge.call(
            'confirm',
            { title, message, okButton, cancelButton },
            ok => (ok ? resolve() : reject())
        )
    })
}
