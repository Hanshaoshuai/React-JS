<template>
	<div class="banners" onload="loaded()">
		<!--<div id="wrapper" v-el:wrapper>
			<div id="iscroll">-->
		<div class="banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div v-for="item in bannerlist" class="swiper-slide" style="background-color: #0f0;">
						<img :src="item.image" @click="addCart(item.id,item.url)"/>
					</div>
					<!--<div class="swiper-slide"  style="background-color: #f00;">2</div>
					<div class="swiper-slide"  style="background-color: #00f;">3</div>-->
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<div class="tuli" ref="betterscroll">
			<ul class="list">
				<li class="lists_0">{{prolist_0.title}}</li>
				<li class="lists">
					<span v-for="item in prolist_0.list">
						<img :id="item.id" @click="addCart(item.id,item.url)" :src="item.image"/>
					</span>
				</li>
				<li class="lists_0">{{prolist_1.title}}</li>
				<li class="lists_1">
					<span v-for="item in prolist_1.list">
						<img :id="item.id" @click="addCart(item.id,item.url)" :src="item.image"/>
					</span>
				</li>
				<li class="lists_0">{{prolist_2.title}}</li>
				<li class="lists_2">
					<span v-for="item in prolist_2.list" @click="addCart(item.id,item.url)">
						<img :id="item.id" :src="item.img" :date-src="item.img"/>
						<div class="lists_2_0">
							<font>{{item.name}}</font>
							<div>麦豆<a>{{item.sell_price}}</a></div>
						</div>
					</span>
				</li>
				<li class="lists_0">{{prolist_3.title}}</li>
				<li class="lists_3">
					<span v-for="item in prolist_3.list" @click="addCart(item.id,item.url)">
						<img :id="item.id" :src="item.img" :date-src="item.img"/>
						<div class="lists_3_0">
							<font>{{item.name}}</font>
							<div>麦豆<a>{{item.sell_price}}</a></div>
						</div>
					</span>
				</li>
			</ul>
		</div>
		<!--</div>
		</div>-->
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
//	import ajaxMixino from './../../js/scroll';
//	import ajaxMixinoo from './../../js/jquery-1.11.0';
	console.log("root home")
	console.log(__dirname)
	export default {
//		mixins: [ajaxMixinoo,ajaxMixino,ajaxMixin],
		test:"home测试",
		data () {
			return {
				msg: "我是组件模板的数据",
				bannerlist:[],
				prolist_0:[],
				prolist_1:[],
				prolist_2:[],
				prolist_3:[],
				mySwiper:""
			}
		},
		methods:{
			addCart (id,ur) {
				window.location.href = "?__hbt=1496738303253#/xiangqing?id="+id+"&user_id=121&token=56fe7231886a3d86b8bd435821049aee625fff4f";
			},
			initScroll(){
				this.betterscroll=new BScroll(this.$refs.betterscroll,{
					click:true
				});
			}
		},
		mounted () {
			console.log(11111)
			const url = "http://121.196.218.57/index.php/api/index/banner";
			const url_0 = "http://121.196.218.57/index.php/api/index/index";
			this.$http({
				method:'GET',
                url:url  //this指data
			}).then(function(response){
				console.log(response.body);
				var data = response.body.data;
				console.log((data[0].image))
				var arr = [];
				for(var i=0; i<data.length; i++){
					arr.push(data[i].image);
				}
				this.bannerlist = data;
			},function(err){
				console.log(err)
			})
			
			//请求列表数据
			this.$http({
				method:'GET',
                url:url_0  //this指data
				}).then(function(response){
					console.log(response.body.data)
					this.prolist_0 = response.body.data.index_2;
					this.prolist_1 = response.body.data.index_3;
					this.prolist_2 = response.body.data.index_4;
					this.prolist_3 = response.body.data.index_5;
					console.log(this.prolist_0.list[0].id);
//					dom更新后在执行使用$refs
					this.$nextTick(function() {
						this.initScroll();
					});
				})
		},
		updated:function(){
			if(!this.mySwiper){
             	this.mySwiper = new Swiper('.swiper-container', {
                 	direction:"horizontal",
                 	autoplay :3000,
                 	loop:true,
                 	autoplayDisableOnInteraction:false,
                 	pagination:".swiper-pagination"
             	})
			}
		}
	}
</script>

<style>
	/*@import '../../css/main.css';*/
	.banners{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		overflow:hidden;
		font-size: 0.14rem;
	}
	.banner{
		width:100%;
		height:1.49rem;
		overflow:hidden;
	}
	.swiper-container{
		width: 100%;
		background-color: #00f;
		overflow: hidden;
	}
	.swiper-wrapper img{
		width: 100%;
		margin:0;
		padding:0;
		border:none;
	}
	.tuli{
		width:100%;
		flex:1;
		overflow: hidden;
		
		/*overflow-y: scroll;*/
	}
	.tuli .list{
		width:100%;
		/*height:100%;*/
		/*overflow-y:auto;*/
		/*-webkit-overflow-scrolling: touch;*/		
	}
	.tuli .list li{
		height:auto;
		overflow: hidden;
	}
	.tuli .list .lists_0{
		font-size: 0.16rem;
		padding:0.12rem 0 0.12rem 0.1rem;
	}
	/*.lists{
		width:100%;
		height:150px;
		border-bottom:1px #999999 solid;
		box-sizing:border-box;
	}
	.lists img{width:100px;margin:0;}*/
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
	
	
	.lists span:nth-child(1){
		float:left;
		width:1.8rem;
	}
	.lists span:nth-child(2){
		float:right;
		width:1.9rem;
	}
	.lists span:nth-child(3){
		float:right;
		width:1.8rem;
		margin-top:0.05rem;
	}
	
	.lists span img{
		float:right;
		width:1.8rem;
	}
	
	
	.lists_1 img{
		width:100%;
	}
	
	
	.tuli .list a{
		color:#FF002F;
		padding-left:0.04rem;
	}
	
	
	.lists_2 span{
		position:relative;
		width:50%;
		height:2.8rem;
	}
	.lists_2 span .lists_2_0{
		width:90%;
		height:0.6rem;
		position:absolute;
		top:1.85rem;
		left:0;
		right:0;
		margin:auto;
	}
	.lists_2 span .lists_2_0 font{
		width:100%;
		height:0.4rem;
		overflow: hidden;
	}
	.lists_2 span .lists_2_0 div{
		position:absolute;
		bottom:0;
		left:0;
	}
	.lists_2 span img{
		/*width:100%;*/
		height:1.8rem;
		position:absolute;
		margin:auto;
		top:0;
		left:0;
		right:0;
	}
	.lists_3 span{
		position:relative;
		width:50%;
		height:2.8rem;
	}
	.lists_3 span .lists_3_0{
		width:90%;
		height:0.6rem;
		position:absolute;
		top:1.85rem;
		left:0;
		right:0;
		margin:auto;
	}
	.lists_3 span .lists_3_0 font{
		width:100%;
		height:0.4rem;
		overflow: hidden;
	}
	.lists_3 span .lists_3_0 div{
		position:absolute;
		bottom:0;
		left:0;
	}
	.lists_3 span img{
		/*width:100%;*/
		height:1.8rem;
		position:absolute;
		margin:auto;
		top:0;
		left:0;
		right:0;
	}
</style>