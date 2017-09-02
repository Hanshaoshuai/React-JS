<template>
	<footer>
		<ul>
			<router-link to="/home"><li><span class="iconfont">&#xe601</span><font>首页</font></li></router-link>
			<router-link to="/kind"><li><span class="iconfont">&#xe600</span><font>分类</font></li></router-link>
			<router-link to="/cart"><li><span class="iconfont">&#xe6e4</span><font>购物车</font></li></router-link>
			<router-link to="/user"><li><span class="iconfont">&#xe634</span><font>我的</font></li></router-link>
			<router-link to="/more"><li><span class="iconfont">&#xe610</span><font>更多</font></li></router-link>
		</ul>
	</footer>
</template>

<script>
	
	export default {
		data () {
			return {
				msg: "我是组件模板的数据",
				footerList:[
					{icon:"&#xe601;",title:"首页",type:"home"},
					{icon:"&#xe600;",title:"分类",type:"kind"},
					{icon:"&#xe6e4;",title:"购物车",type:"cart"},
					{icon:"&#xe634;",title:"我的",type:"user"},
					{icon:"&#xe610;",title:"更多",type:"more"}
					
				]
			}
		}
	}
</script>

<style>
</style>