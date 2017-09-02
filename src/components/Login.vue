<template>
	<div>
		<input type="text" v-model="userID" /><br /><br />
		<input type="password" v-model="password" /><br /><br />
		<input type="button" @click="login()"  value="登录" />
	</div>
</template>

<script>
	export default {
		data () {
			return {
				userID:"",
				password:""
			}
		},
		methods:{
			login () {
				var userID = this.userID;
				var password = this.password;
				var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
				this.$http.get(url).then(function(response){
					console.log("login",response)
					if(response.body != "0" && response.body != "2"){
						localStorage.setItem("userID",this.userID);
						if(confirm("已成功登陆是否进入首页?")){
							window.location.href="#/home";
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>