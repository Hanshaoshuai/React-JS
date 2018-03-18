import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    name: "我是原始name",
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    name(state,{name:{name}}){
      // console.log(name)
      // console.log({...state,name})
      if(name!==undefined){
        return {...state,name}
      }else{
        {name:'消失了'}
        console.log({name:'消失了'})
        return {...state,name:'消失了'}
      }
    },
    change(state,{type:name,query:names}){    //接受了两参数  一个是上面的state 一个是传过来的 action进行 析构赋值
      console.log(names)
      return {...state, name:names}
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *name({name:{name}}){
      // yield console.log(name)
      yield {type: 'name', name:{name} }   //这里的 type: 'name'是判断对应上面的 reducers 里面的函数 name
    }
  },
  //监听地址，如果地址含有app则跳转到登陆页
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
        if (pathname === '/name') {
          console.log(query)
          dispatch({ type: 'name', name:query });   //这里的 type: 'name'是判断对应上面的 effects 里面的函数 *name
          
        }
      });
    },
  },
};
