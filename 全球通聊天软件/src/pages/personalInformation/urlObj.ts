export function urlObj(urlPathname: any) {
  let _name = '';
  let _value = '';
  let _valueObj: any = {};
  Object.keys(urlPathname).forEach((element: any, index: number) => {
    if (index === Object.keys(urlPathname).length - 1) {
      _name = element.split('-')[0];
      _value = JSON.parse(urlPathname[element]).name;
      _valueObj = JSON.parse(urlPathname[element]);
    }
  });
  return { _name, _value, _valueObj };
}
