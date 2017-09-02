<template>
	<div class='sousuo'>
		<li class="iconfont">
			<input @click="tuichu_0()" class="intext" type="text"  placeholder="请输入搜索内容" list="datalist"/>
			<span class="fonts" @click="tuichu()">&#xe6a2</span>
			<li class="lists_3">
				<span v-for="item in msg" @click="addCart(item.id,item.name)">
					<img :id="item.id" :src="item.product_img"/>
					<div class="lists_3_0">
						<font>{{item.name}}</font>
						<div>麦豆<a>{{item.sell_price}}</a></div>
					</div>
				</span>
			</li>
		</li>
		<li class="lists_4">
			<h4 v-if="ok" style="width:100%;text-align: center;display:inline-block;">搜索记录</h4>
			<span>{{biaoti}}</span>
			<font @click="tuichu_1($index)" v-for="(item,$index) in jilu">{{item}}</font>
		</li>
		<!--提示信息-->
	    <div @click="tuichu_2()" class="loding_0" style="position: fixed;width:100%;height:100%;z-index: 999; top: 0;left: 0;background-color: rgba(0,0,0,0.2);display: none;">
		    <div class="loadEffect_0">
		        <span></span>
			</div>	
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				msg:"",
				userID:"",
				jilu:null,
				biaoti:"暂无记录",
				ok:true
			}
		},
		methods:{
			tuichu_2(){
				$(".loding_0").css({"display":"none"});
//				window.location.go(-1);
				window.location.href = "#/home";
			},
			tuichu_1(i){
				console.log($(".lists_4 font")[i].innerText)
				var this_0=$(".lists_4 font")[i].innerText;
				$(".intext").val(this_0);
				$(".lists_4").css({"display":"none"});
			},
			tuichu_0(){
				$(".lists_4").css({"display":"block"});
			},
			tuichu () {
				this.userID=$(".intext").val();
				if(this.userID!==""){
					$(".lists_4").css({"display":"none"});
					$(".intext").css({"display":"none"});
					$(".fonts").css({"display":"none"});
					
					var keyword=this.userID;
					var msg=this;
					var torage=localStorage.getItem("key");
					var torage_1='';
					if(this.jilu!==null){
						if(this.jilu.length>20){
							torage=torage.split(",");
							for(var i=0; i<21; i++){
								torage_1+=torage[i]+','
							}
							torage_1=torage_1.substr(0,torage_1.length-2)
							localStorage.setItem("key",torage_1);
							torage=localStorage.getItem("key");
							console.log(torage_1)
						}
					}
					if(torage){
						torage= keyword+','+torage
						localStorage.setItem("key",torage);
					}else{
						localStorage.setItem("key",keyword);
					}
					$.ajax({                                //ajax后台交互
						type:"GET",
						url:"http://121.196.218.57/index.php/api/product/searchProduct",
						async:true,
						jsonp:"callbackparam",//跨域
						data:{
							keyword:keyword,
						},
						dataType:"json",
						success:function(data){
							if(data.data.length!==0){
								$(".sousuo .lists_3").css({"height":"100%"});
								$(".sousuo .iconfont").css({"margin-top":"0"});
								msg.msg=data.data
							}else{
								$(".loadEffect_0 span").text("暂无产品！").css({
									"width":"70%","height":"3rem","margin":"1rem 0 0 15%","background":"#fff","text-align":"center","line-height":"2.4rem"
								});
								//公共弹框提示；
								$(".loding_0").css({"display":"block"});
							}
							console.log(data.data)
						}
					});
				}else{
					alert("请输入搜索内容！")
				}
			},
			addCart (id,ur) {
				window.location.href = "?__hbt=1496738303253#/xiangqing?id="+id+"&name=379&img=1495706061992";
			}
		},
		mounted () {
			this.userID=$(".intext").val();
			var jilu_0="";
			var locos=localStorage.getItem("key");
			if(locos){
				console.log();
				$(".lists_4 font").css({"display":"block"});
				$(".lists_4").css({"display":"block"});
				if(locos.length>1){
					locos=locos.split(",");
					this.jilu=locos
				}else{
					$(".lists_4 font").text(this.jilu);
				}
				console.log(this.jilu);
			}else{
				$(".lists_4").css({"display":"block"});
				$(".lists_4 span").css({"display":"block"});
			}
		},
		updated:function(){
			
		}
	}
</script>

<style>
	.sousuo{
		width:100%;
		height:100%;
		font-size:0.14rem;
		position:relative;
	}
	.sousuo .lists_3{
		width:100%;
		height:90%;
		overflow-y:auto;
	}
	.sousuo .fonts{
		font-size:0.20rem;
	}
	.sousuo .iconfont{
		width:80%;
		margin:0 auto;
		margin-top:0.12rem;
		position:relative;
	}
	.sousuo .iconfont span{
		position:absolute;right:0.15rem;top:0.06rem;color:#d2d2d2;background:#ffffff;
	}
	.sousuo .iconfont input{
		width:91%;height:0.30rem;padding-left:5%;padding-right:4%;border-radius:0.08rem;font-size:0.14rem;color:#959595;
	}
	.sousuo .lists_4{
		background:#ffffff;
		overflow: hidden;
		display:none;
		position:absolute;
		width:80%;
		height:70%;
		margin:0;
		left:10%;
		right:0;
		top:0.6rem;
		border:1px solid #999999;
		padding-top:0.1rem;
		overflow-y: auto;
	}
	.sousuo .lists_4 span{
		display:none;
		width:100%;
		text-align:center;
		height:0.24rem;
		margin-top:1.5rem;
	}
	.sousuo .lists_4 font{
		width:90%;
		height:0.24rem;
		line-height: 0.24rem;
		margin-left:5%;
	}
</style>