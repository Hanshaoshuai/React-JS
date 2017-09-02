import Home from "../components/Home.vue"
import Kind from "../components/Kind.vue"
import Cart from "../components/Cart.vue"
import User from "../components/User.vue"
import More from "../components/More.vue"
import Login from "../components/Login.vue"
import kindlist from "../components/kindlist.vue"
import Xiangqing from "../components/Xiangqing.vue"
import Sousuo from "../components/Sousuo.vue"


export default {
	routes:[
		{path:"/home",component:Home},
		{
			path:"/kind",component:Kind,
			'children':[   /*定义自组件的路由*/
                {
                    path:"kindlist/:classid",
					name:"Kindlist",
					component:kindlist    /*注意：子路由前面的斜杠*/
                }
            ]
		},
		{path:"/cart",component:Cart},
		{path:"/user",component:User},
		{path:"/more",component:More},
		{path:"/login",component:Login},
		{path:"/xiangqing",component:Xiangqing},
		{path:"/sousuo",component:Sousuo},
//		{path:"/kindlist",
//			name:"Kindlist",
//		component:kindlist},
		{path:"*",redirect:"/home"}
	]
}
