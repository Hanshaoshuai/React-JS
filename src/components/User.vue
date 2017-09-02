<template>
	<div>
		<button @click="tuichu()">推出登陆</button>
	</div>
</template>

<script>
	
	export default {
		data () {
			return {
				msg: "我是组件模板的数据",
				userID:""
			}
		},
		methods:{
			tuichu () {
//				console.log(localStorage.getItem("userID"))
				if(localStorage.getItem("userID")){
					localStorage.setItem("userID",this.userID);
					window.location.href = "#/login";
					alert("你已成功退出登录。。")
				}
			}
		}
	}
</script>

<style>
</style>