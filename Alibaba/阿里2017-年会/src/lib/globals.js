import classnames from 'classnames'
import env from './env'
import dpr from './dpr'
import rem from './rem'

const ratio = dpr()
const documentElement = document.documentElement

console.log('classnames', classnames)

documentElement.className = classnames(document.documentElement.className.trim(), {
    pc: env.isPC,
    mobile: env.isMobile,
    hairline: env.supportHairline,
    [`dpr${ratio}`]: ratio > 1,
})
documentElement.setAttribute('data-dpr', ratio)

const fontStyleElement = document.createElement('style')
const resetRem = () => (fontStyleElement.innerHTML = `html{font-size:${rem()}px!important}`)

window.addEventListener('resize', resetRem, false)
window.addEventListener('pageshow', e => (e.persisted && resetRem()), false)
document.documentElement.firstElementChild.appendChild(fontStyleElement)
resetRem()

window['__DPR__'] = ratio
window['__ENV__'] = env
