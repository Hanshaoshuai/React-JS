import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    loading: false,
    list: [],
    total: null,
    page: null,
    name: "我是原始name",
    data: [],
    ok: ''
  },
  reducers: {
    loading(state, {type:name,query:boolean}){    //执行loading是否显示
      console.log(boolean)
      return {...state, loading:boolean}
    },
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    saves(state, { payload: { data, page, loading, } }) {
      return { ...state, data, page, loading };
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
    listChange(state,{type:name,query:data}){
      // console.log(data)
      console.log({...state, data:data})
      return {...state, data:data}
    },
    pagelist(state,{date}){
    	return {...state, ok: date}
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      // yield console.log({ data, headers })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *fetchs({ payload: { page, loading }},{ call, put }) {
      const { data, headers } = yield call(usersService.fetchs, { page, loading });
      yield console.log( loading )
      yield put({
        type: 'saves',
        payload: {
          data,
          page: parseInt(page, 10),
          loading: loading,
        },
      });
    },
    *name({name:{name}}){
      // yield console.log(name)
      yield {type: 'name', name:{name} }   //这里的 type: 'name'是判断对应上面的 reducers 里面的函数 name
    },
    *posint({ payload },{ call, put }){
    	const { data } = yield call(usersService.pageList);
      yield console.log( data )
      yield put({
        type: 'pagelist',
        payload: {
          data
        },
      });
    }
  },
  //监听地址，如果地址含有app则跳转到登陆页
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
          console.log(`${pathname},,,,`,query)
        }
        if (pathname === '/name') {
          console.log(query)
          dispatch({ type: 'name', name:query });   //这里的 type: 'name'是判断对应上面的 effects 里面的函数 *name
          
        }
      });
    },
  },
};