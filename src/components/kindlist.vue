

<template>
	<div class="banners1">
		<ul class="list" v-if="waitLoad">
			<!--<li class="lists" v-for="item in listData">
				<span class="tu1"><img :src="item.goodsListImg" alt="" /></span>
				<font><a>{{item.className}}</a><br/>{{item.goodsName}}</font>
				<button @click="addCart(item.goodsID)">查看详情</button>
			</li>-->
			<li class="lists_3">
				<span v-for="item in listData" @click="addCart(item.goodsID)">
					<img :id="item.id" :src="item.goodsListImg"/>
					<div class="lists_3_0">
						<font>{{item.goodsName}}</font>
						<div>麦豆<a>{{item.price}}</a></div>
					</div>
				</span>
			</li>
		</ul>
		<span v-else style="position: absolute;z-index: 990; top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,0.5);">
			<font style="margin-top:2.0rem;color:#fff;text-align: center;display:inline-block;width:100%;height:1rem;font-size: 0.26rem;">正在加载中...</font>
		</span>
		<div id="kong"></div>
	</div>
</template>

<script>
	console.log("root home")
	console.log(__dirname)
	export default {
		test:"home测试",
		data () {
			return {
				msg: "我是组件模板的数据",
				goodsName:"",
				prolist:[],
				classID:1,
				classname:"",
				url:"http://datainfo.duapp.com/shopdata/getGoods.php"
			}
		},
		props: {
            listData: {
                type: Array
			},
            waitLoad: {
                type: Boolean
			}
		},
		methods:{
			play (index) {
				alert(index)
//				this.classID=index;
//				console.log(localStorage.getItem("classname"))
//				this.classID=this.$route.params.classid;
//				this.$http({
//					method:'post',
//	                url:that.url,  //this指data
//	                data:{'code':2,'msg':20,'data':1,'total':0}
//				}).then(function(response){
//					console.log(response.body);
//					var data = response.body.data;
//					console.log((data[0].image))
//					var arr = [];
//					for(var i=0; i<data.length; i++){
//						arr.push(data[i].image);
//					}
//					this.bannerlist = data;
//				},function(err){
//					console.log(err)
//				})
			},
			addCart (id,ur) {
				window.location.href = "#/xiangqing?id="+id+"&name=379&img=1495706061992";
			}
//			addCart (goodsID) {
//				if(localStorage.getItem("userID")&&localStorage.getItem("userID")!==""){
////					alert("ok");
//					//此处调用加入购物车数据接口
////					alert(goodsID)
//					this.$http.get("http://datainfo.duapp.com/shopdata/updatecar.php",{
//						params:{
//							userID:localStorage.getItem("userID"),
//							goodsID:goodsID,
//							number:1
//						}
//					}).then(function(response){
//						console.log("cart",response.body)
//					});
//					if(confirm("已成功加入是否进入购物车？")){
//						window.location.href = "#/cart";
//					}else{
////						alert("jjjj");
//					}
//					
//				}else{
//					alert("请先登录");
//					window.location.href = "#/login";
//				}
//			}
		},
		mounted () {
//			if(localStorage.getItem("classname")){
				/*this.classID=this.$route.params.classid;
				console.log(this.classID)
				var that=this;
				//请求列表数据
				this.$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php",
					{
						params:{
//							"classID":localStorage.getItem("classname")
							"classID":that.classID
						}
					}
				).then(function(response){
					console.log(response.body)
					this.prolist = response.body;
				},function(err){
					console.log(err);
				})
//			}*/
		
		
//			this.$http({
//				method:'get',
//              url:that.url,  //this指data
//              data:{"classID":that.classID},
//              emulateJSON: true
//			}).then(function(response){
//				console.log(response.body);
//				var data = response.body.data;
//				console.log((data[0].image))
//				var arr = [];
////				for(var i=0; i<data.length; i++){
////					arr.push(data[i].image);
////				}
//				this.bannerlist = data;
//			},function(err){
//				console.log(err)
//			})
		}
	}
</script>

<style scoped>
	.banners1{
		width:100%;
		height:100%;
		overflow-y:auto;
		font-size: 0.14rem;
	}
	.banners1 .list .lists_3 a{
		color:#FF002F;
	}
	.list{
		width:100%;
		height:auto;
		
	}
	.lists{
		width:100%;
		height:1.60rem;
		border-bottom:1px #999999 solid;
		box-sizing:border-box;
		position:relative;
	}
	.lists .tu1{
		height:1.60rem;display:flex;flex-direction:column;justify-content:center;float:left;margin-left:0.20rem;
	}
	.lists .tu1 img{
		
	}
	.lists font{
		width:60%;float:left;margin:0.30rem 0 0 0.20rem;
	}
	.lists button{
		position:absolute;right:0.30rem;bottom:0.30rem;
	}
	#kong{
		width:1.00rem;height:0.61rem;
	}
</style>

