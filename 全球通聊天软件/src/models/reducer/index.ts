const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'stepInc':
      return Object.assign({}, state, { step: state.step + 1 });
    case 'numberInc':
      return Object.assign({}, state, { initState: action.initState });
    case 'count':
      return Object.assign({}, state, { initState: action.initState });
    case 'badge':
      return Object.assign({}, state, { badge: action.badge });
    case 'pathname':
      return Object.assign({}, state, { pathname: action.pathname });
    case 'settings':
      return Object.assign({}, state, { settings: action.settings });
    case 'urlPathname':
      return Object.assign({}, state, { urlPathname: action.urlPathname });
    case 'recordUrl':
      return Object.assign({}, state, { recordUrl: action.recordUrl });
    case 'videoPlaysBlock':
      return Object.assign({}, state, {
        videoPlaysBlock: action.videoPlaysBlock,
      });
    case 'videoCall':
      return Object.assign({}, state, { videoCall: action.videoCall });
    case 'textActionName':
      return Object.assign({}, state, {
        textActionName: action.textActionName,
      });
    default:
      return state;
  }
};

export default reducer;
// export default function reducers() {
//   return {
//     reducer: reducer,
//   };
// }
