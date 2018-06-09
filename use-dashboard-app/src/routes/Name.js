import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Name.css';
import MainLayout from '../components/MainLayout/MainLayout';
import { Spin, Icon } from 'antd';

// import fetch from 'dva/fetch';
// import * as usersService from '../services/users';

function Name({ location,dispatch,name,data,loading }) {
    const antIcon = <Icon type="loading" style={{ fontSize: 26 }} spin />;
    function pageChangeHandler({name}) {   //  subscriptions
        // console.log({name})
        dispatch(routerRedux.push({
            pathname: '/name',          //  这里的 pathname: 'name'是判断 models 里 subscriptions 里对应的 pathname
            query: {name},
        }));
    }
    function pageChange({ page, loading }) {
        dispatch({                  //开启loading;
            type: 'users/loading',
            query: true,
        })
        dispatch({                  //在effects中的 请求方式
            type: 'users/fetchs',
            payload: { page, loading }
        });
        dispatch({
            type: 'users/change',   //  同步直接发起 action   type: 'users/change' 是判断 reducers中那个函数
            query: name,
        });

        // fetch('./Zidian.html').then(function(response) {
        //     return response.text()
        // }).then(function(body) {
        //     console.log(body)
        // })

        // console.log(usersService.name())
        // fetch('http://datainfo.duapp.com/shopdata/getGoods.php?callback=',{                  // 发送请求
        //     method:'POST',                            //请求方式    (可以自己添加header的参数)   
        // //  headers: {
        // //      'Accept': 'application/json',
        // //      'Content-Type': 'application/json'
        // //  },
        // //  body: JSON.stringify({
        
        // //  }), 
        //     mode:'cors',// 避免cors攻击
        // //  credentials: 'include'                
        // }).then(response => {
        // //打印返回的json数据
        // console.log(response)
        //     return response.json(); //将response进行json格式化
        // }).then(data =>{      
        //     console.log(data);
        // }).catch(e => {
        //     console.log(e);
        // });
        
    }
    function remove(index){
        // alert(index)
        // console.log(typeof data)
        const datas = [];
        for(let i=0; i<data.length; i++){
            if(i!=index){
                datas.push(data[i])
            }
        }
        // datas.splice(index,1)
        dispatch({
            type: 'users/listChange',
            query: datas,
        })
    }
    return (
        <MainLayout location={location}>
            <div className={styles.loading}><Spin spinning={loading} indicator={antIcon} /></div> 
            <div className={styles.normal}>
            {
                data.map((val,index) => {
                    return <div key={index}>
                        {val.className}
                        <span>{val.icon}</span>
                        <button onClick={ () => remove(index) } style={{marginLeft:'10px'}}>移除</button>
                    </div>
                })
            }
                <button onClick={() => pageChangeHandler({name:'新的name'})}>{name?name:'消失了'}</button>
                <button onClick={() => pageChange({ page: 1, loading: false })}>本页面改变</button>
            </div>
        </MainLayout> 
    );
}
function mapStateToProps(state) {
    const { name,data,loading } = state.users;
    return {
        name,
        data,
        loading,
    }
}
export default connect(mapStateToProps)(Name);