<template>
	<div class="liebiaos">
		<div class="hang">
		<ul class="hangs" >
			<li @click="play(index)" class="liebiao" v-for="(item,index) in prolist">
				<span ref="header">{{item.name}}</span>
			</li>
		</ul>
		</div>
		<!--<router-view></router-view>-->
		<Kindlist :listData="listData" :waitLoad="waitLoad"></Kindlist>
	</div>
</template>

<script type="text/javascript">
	import Kindlist from './kindlist.vue';
	export default {
		data () {
			return {
				msg: "我是组件模板的数据list",
				bannerlist:"",
				prolist:"",
				classID:"",
				listData: [],
                waitLoad: false,
                list:null
			}
		},
		methods:{
			play (index) {
//				this.list[0].removeClass("router-link-active");
//				alert(index)
				this.classID=index;
                this.waitLoad = false;
//				localStorage.setItem("classname",index),
				console.log(this.list)
//				window.location.href = "#/kindlist";
                this.$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php",
                    {
                        params:{
//							"classID":localStorage.getItem("classname")
                            "classID":this.classID
                        }
                    }
                ).then(function(response){
                    console.log(response.body)
					this.waitLoad = true;
                    this.listData = response.body;
                },function(err){
                    console.log(err);
                })
			}
		},
		mounted () {
			var that=this;
//			if(localStorage.getItem("userID")&&localStorage.getItem("userID")!==""){
//					alert("ok");
				//此处调用加入购物车数据接口
//					alert(goodsID)
//				this.$http.get("http://datainfo.duapp.com/shopdata/getclass.php")
//				.then(function(response){
					console.log($(".liebiao span"))
//					this.prolist = response.body;
//				})
//			}else{
//				alert("请先登录");
//				window.location.href = "login/kindlist";
//			}
			const url = "http://121.196.218.57/index.php/api/index/category/";
			this.$http({
				method:'GET',
                url:url  //this指data
			}).then(function(response){
				console.log(response.body);
				var data = response.body.data;
				console.log((data[0].id))
//				name
				this.prolist = data;
//				dom更新后在执行使用$refs
				this.$nextTick(function() {
					this.$refs.header[0].setAttribute("class","router-link-active");
//					this.$refs.header[0].style.color="#ffffff";
					this.list=this.$refs.header;
					console.log(this.list[0]);
					$(".liebiao span").on("click",function(){
						console.log("kk");
						for(var i=0; i<that.list.length; i++){
							if(that.list[i].getAttribute("class","router-link-active")){
								that.list[i].setAttribute("class","router");
							}
						}
						$(this).addClass("router-link-active");  
					})
				})
			},function(err){
				console.log(err)
			})
			this.play(0);
		},
		components: {
            Kindlist
		}
//		$route:function(){
//			alert(this.classID);
//		},
//		updated:function(){
//			
//		}
	}
</script>

<style scoped>
	.liebiaos{
		width:100%;
		height:100%;
		overflow:hidden;
		font-size: 0.14rem;
	}
	.liebiaos .hang{
		width:100%;height:0.60rem;overflow-y:auto;border-bottom:1px #CFCFCF solid;
		/*flex-direction:column;justify-content:center;*/
	}
	.liebiaos .hang .hangs{
		width:11.48rem;height:0.60rem;float:left;
	}
	.liebiaos .hang .hangs .router-link-active{
		background:#454545;color:#ffffff;height:0.60rem;display:inline-block;
	}
	.liebiaos .hang .liebiao{
		height:0.60rem;float:left;text-align:center;
	}
	.liebiaos .hang .liebiao a{
		height:0.60rem;display:inline-block;float:left;
	}
	.liebiaos .hang .liebiao span{
		line-height:0.60rem;font-size:0.20rem;padding:0 0.19rem 0 0.19rem;float:left;
		
	}
	
	
</style>