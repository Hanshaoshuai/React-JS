<template>
	<div class="cart">
		<span v-if="display1">还没有商品加入购物车！快加入购物车吧。。</span>
		<ul class="list1" v-if="display">
			<li class="lists" v-for="(item,index) in list">
				<span class="tu1"><img :src="item.goodsListImg"/></span>
				<font><a>{{item.className}}</a><br/>{{item.goodsName}}</font>
				<button @click="deleteData(item.goodsID,index)">删除</button>
			</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		data () {
			return {
				msg: "我是组件模板的数据",
				list:[],
				display:true,
				display1:false
			}
		},
		methods:{
			deleteData (goodsID,index) {
				this.$http.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
						params:{
							userID:localStorage.getItem("userID"),
							goodsID:goodsID,
							number:0
						}
					}).then(function(response){
						console.log("cart",response.body)
						if(response.body*1 == 1){
							this.list.splice(index,1)
							console.log(this.list.length)
						}
						if(this.list.length>0){
	//						alert("userID")
							this.display1=false
							this.display=true
							
						}else{
	//						alert("aaawwwwwa")
							this.display1=true
							this.display=false
							
						}
					})
			}
		},
		mounted () {
			//判断有没有登录
			
			if(localStorage.getItem("userID")&&localStorage.getItem("userID")!==""){
				//查看数据库接口
				this.$http.jsonp("http://datainfo.duapp.com/shopdata/getCar.php",{
					params:{
						userID:localStorage.getItem("userID")
					}
				}).then(function(response){
					console.log(response.body[0].className)
					this.list = response.body
					if(response.body[0].className){
//						alert("userID")
						this.display=true
						this.display1=false
					}else{
//						alert("aaawwwwwa")
						this.display=false
						this.display1=true
					}
				})
				
			}else{
				alert("请登录")
				window.location.href = "#/login";
			}
		}
	}
</script>

<style>
	.cart{
		font-size: 0.14rem;
		flex:1;
	}
	.cart ul{
		width:100%;height:100%;overflow-y:auto;
	}
	.cart ul .lists{
		width:100%;
		height:1.60rem;
		border-bottom:1px #999999 solid;
		box-sizing:border-box;
		position:relative;
	}
	.lists .tu1{
		height:1.60rem;display:flex;flex-direction:column;justify-content:center;float:left;margin-left:0.20rem;
	}
	.lists font{
		width:60%;float:left;margin:0.30rem 0 0 0.20rem;
	}
	.lists font a{
		margin-bottom:0.04rem;color:red;display:inline-block;
	}
	.lists button{
		position:absolute;right:0.30rem;bottom:0.30rem;
	}
</style>