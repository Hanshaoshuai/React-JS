export default function rem() {
    const { clientWidth } = document.documentElement
    let remNumber = clientWidth / 10

    // ZTE 中兴 ZTE U930_TD/1.0 Linux/2.6.39/Android/4.0Release/3.5.2012 Browser/AppleWebkit534.30
    // 老机器bug rem计算不是标准=html fontsize
    if (/ZTE U930_TD/.test(navigator.userAgent)) {
        remNumber = remNumber * 1.13
    }

    return remNumber
}