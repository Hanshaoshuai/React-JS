<template>
	<div class="header">
		<ul class="tu" @click="tu()">
			<li class="iconfont">&#xe605</li>
			<li class="iconfont">
				<span>&#xe6a2</span>
				<router-link to="/sousuo"><input type="text" readOnly="true" placeholder="请输入搜索内容" v-model="search" list="datalist"/></router-link>
				<font>&#xe65a</font>
				<datalist id="datalist" >
					<option v-for="item of list" :value="item" :label="search" ></option>
				</datalist>
			</li>
			<li class="iconfont">&#xe604</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		/*
		 data:function(){
		 	return {
		 		msg: "我是组件模板的数据"
		 	}
		 }
		 
		 data: () => {
		 	return {
		 		msg: "我是组件模板的数据"
		 	}
		 }
		 * */
		data () {
			return {
				msg: "我是组件模板的数据",
				search:"",
				list:[],
				timer:""//定时器
			}
		},
		methods:{
			tu(){
				$(".intext").css({"display":"block"});
				$(".fonts").css({"display":"block"});
				$(".sousuo .iconfont").css({"margin-top":"0.12rem"});
			},
			requestData:function(url){
				//ajax请求
				this.$http.jsonp(url,{
					jsonp:"cb"
				}).then(function(response){
					console.log(JSON.parse(response.bodyText).s);
					this.list = JSON.parse(response.bodyText).s;
				})
			}
		},
		watch:{
			search:function(newVal){
				var that = this;
				clearTimeout(this.timer);
				
				this.timer=setTimeout(function(){
					//接口地址
					var url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+newVal;
					that.requestData(url)
				},200)
				
				
			}
		}
	}
</script>

<style>
	.tu{
		width:100%;height:100%;display:flex;
	}
	.tu .iconfont{
		font-size:0.24rem;
		height:100%;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.tu .iconfont:nth-child(1){
		width:0.50rem;
	}
	.tu .iconfont:nth-child(3){
		width:0.50rem;
	}
	.tu .iconfont:nth-child(2){
		position:relative;
		font-size:0.20rem;
		flex:1;
	} 
	.tu .iconfont span{
		position:absolute;left:0.08rem;top:0.10rem;color:#d2d2d2;
	}
	.tu .iconfont font{
		position:absolute;right:0.08rem;top:0.10rem;color:#d2d2d2;background:#ffffff;
	}
	.tu .iconfont:nth-child(2) a{
		display: inline-block;
		width: 100%;
	}
	.tu .iconfont:nth-child(2) a input{
		width:86%;height:0.30rem;padding-left:10%;padding-right:4%;border-radius:0.08rem;font-size:0.14rem;color:#959595;
	}
	#datalist{
		position:absolute;right:0;top:0.50rem;color:#cfcfcf;
	}
	#datalist option{color:#cfcfcf;}
	/*#datalist li{white-space:normal;强制不换行;word-break:break-all;分割强制换行;word-wrap:break-word:不分割强制换行}*/
</style>