const initState = { count: 0, step: 0, number: 0 };
const list: any = [];
const badge: number = 0;
const pathname: string = '/';
const settings: string = '?personal=1';
const urlPathname: any = {};
const recordUrl: any = { list: ['/'], returnTarget: '/' };
const videoPlaysBlock: any = false;
const videoCall: any = false;
const textActionName: any = '';

export default function initStates() {
  return {
    initState,
    list,
    badge,
    pathname,
    settings,
    urlPathname,
    recordUrl,
    videoPlaysBlock,
    videoCall,
    textActionName,
  };
}
