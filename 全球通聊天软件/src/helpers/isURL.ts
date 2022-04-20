// export function IsURL(strUrl: string) {
//   // var regular =
//   //   /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
//   var regular =
//     /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
//   if (regular.test(strUrl)) {
//     return true;
//   } else {
//     return false;
//   }
// }
export function IsURL(str_url: string) {
  var strRegex =
    /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
  var re = new RegExp(strRegex);
  //re.test()
  if (re.test(str_url)) {
    return true;
  } else {
    return false;
  }
}
export function urlParse() {
  let url = '',
    obj: any = {};
  if (window.location.search) {
    url = window.location.search; //获取url中"?"符后的字串
  } else {
    url = window.location.href; //获取url中"?"符后的字串
  }
  let reg = /[?&][^?&]+=[^?&]+/g; //匹配   ?id=123456&a=b  正则
  let arr = url.match(reg);
  //['?di=123456','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
