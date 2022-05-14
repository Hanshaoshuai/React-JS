const initialState = {
  data: 'reducer',
  list: [],
  textActionName: '',
};

export const schedule = (state = initialState, action: any) => {
  // debugger
  switch (action.type) {
    case 'SET_SCHEDULE':
      return {
        ...state,
        data: action.data.data || '',
        list: action.data.list || [],
      };
    case 'textActionName':
      return {
        ...state,
        textActionName: action.textActionName || '',
      };
    default:
      return state;
  }
};
