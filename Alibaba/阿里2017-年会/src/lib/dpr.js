export default function dpr() {
    let num = window.devicePixelRatio || 1

    // 类似小米2 webView webkit版本是534及以下，避免闪屏
    const matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);
    if (matches && matches[1] <= 534) {
        num = 1;
    }

    return num
}