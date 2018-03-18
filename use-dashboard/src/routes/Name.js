import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Name.css';
import MainLayout from '../components/MainLayout/MainLayout';


import fetch from 'dva/fetch';

function Name({ location,dispatch,name}) {

  function pageChangeHandler({name}) {   //  subscriptions
    // console.log({name})
    dispatch(routerRedux.push({
      pathname: '/name',          //  这里的 pathname: 'name'是判断 models 里 subscriptions 里对应的 pathname
      query: {name},
    }));
  }

  function pageChange({name}) {
    fetch('http://datainfo.duapp.com/shopdata/getGoods.php?callback',{                       // 发送请求
      method:'POST',                            //请求方式    (可以自己添加header的参数)   
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({
        
      // }), 
      mode:'cors',// 避免cors攻击
      // credentials: 'include'                
    }).then(response => {
      //打印返回的json数据
      // console.log(response)
      return response; //将response进行json格式化
    }).then(data =>{      
      console.log(data);                        //打印
    }).catch(e => {
      console.log(e);
    });
    

    dispatch({
      type: 'users/change',       //  同步直接发起 action   type: 'users/change' 是判断 reducers中那个函数
      query: name,
    }); 

  }

  return (
    <MainLayout location={location}> 
      <div className={styles.normal}>
        我是你大哥
        <button onClick={() => pageChangeHandler({name:'新的name'})}>{name?name:'消失了'}</button>
        <button onClick={() => pageChange({name:'这样对吗???哈哈!!!!'})}>本页面改变</button>
      </div>
    </MainLayout> 
  );
}

function mapStateToProps(state) {
  const { name } = state.users;
  return {
    name,
  }
}
export default connect(mapStateToProps)(Name);
