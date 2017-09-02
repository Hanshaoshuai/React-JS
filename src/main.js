import Vue from 'vue' //引入vue

//引入路由
import VueRouter from "vue-router"
//引入vue-resource  ---- ajax请求
import VueResource from "vue-resource"


//让程序认识他们
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装此功能：
Vue.use(VueRouter);
Vue.use(VueResource);



//定义组件
//import Home from './Home.vue'
import App from './App.vue' //引入单文件组件 App.vue --- 定义组件

//定义路由
import Router from "./router/router.js"

//实例化VueRouter
	const router = new VueRouter({
		routes:Router.routes
	})

//挂载
new Vue({
	router:router,
  	el: '#app',
	render: a => a(App) //注册组件并且在index.html中动态添加了一个标签-----react中render----虚拟DOM
//	components:{
//		"v-app":App //注册组件
//	}
//	render:function(a){
// 		return a(App)
// 	}
})


 