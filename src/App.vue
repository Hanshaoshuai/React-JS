<template>
  <div id="test">
  	<v-header></v-header>
  	<div class="content">
  		<router-view keep-alive></router-view>
  	</div>
  	<v-footer></v-footer>
  </div>
</template>

<script>
	//定义Header组件---- 引入Header.vue
	import Header from "./components/Header.vue"
	import Footer from "./components/Footer.vue"
	import Home from "./components/Home.vue"
	import Kind from "./components/Kind.vue"
	import Cart from "./components/Cart.vue"
	import User from "./components/User.vue"
	import More from "./components/More.vue"
	import Xingqing from "./components/Xiangqing.vue"
	import Sousuo from "./components/Sousuo.vue"
//	console.log(Home.test)
	
export default {
  name: 'test',
  data () {
    return {
      
    }
  },
  components:{
  	"v-header":Header,
  	"v-footer":Footer
  }
  
}
</script>

<style>
	*{padding: 0;margin: 0;list-style: none;text-decoration: none;}
	
	html,body,#test{
		width: 100%;
		height: 100%;
	}
	input{
		outline:none;
	}
	#test{
		display: flex;
		flex-direction: column;
		
	}
	.header{
		width: 100%;
		height: 0.44rem;
		background-color: #c11920;
		color: #fff;
	}
	.content{
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	footer{
		width: 100%;
		height: 0.50rem;
		background-color: #efefef;
	}
	
	/*一像素边框*/
	@media(-webkit-min-device-pixel-ratio:2){
		footer{
			border:0;
			position: relative;
		}
		footer:after{
		 	content:"";
		  position: absolute;
		  top:0px;
		  left:0px;
		  right:0px;
		  border-top:1px solid #999999;
		  -webkit-transform:scaleY(.5);
		  -webkit-transform-origin:0 0;
		}
	}
	footer ul{
		width: 100%;
		height: 100%;
		display: flex;
	}
	footer ul a{
		display: block;
		height: 0.50rem;
		justify-content: center;
		color: #333;
		flex: 1;
		display:flex;
	}
	footer ul a li{
		text-align: center;
		display:flex;
		flex-direction:column;
		justify-content: center;
	}
	footer ul a li span{
		font-size:0.24rem;
	}
	footer ul a li font{
		font-size:0.12rem;margin-top:0.02rem;
	}
	footer ul a.router-link-active{
		color: #f66;
	}
	@font-face {
	  font-family: 'iconfont';  /* project id 256875 */
	  src: url('//at.alicdn.com/t/font_j7fof8nhhb29y66r.eot');
	  src: url('//at.alicdn.com/t/font_j7fof8nhhb29y66r.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_j7fof8nhhb29y66r.woff') format('woff'),
	  url('//at.alicdn.com/t/font_j7fof8nhhb29y66r.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_j7fof8nhhb29y66r.svg#iconfont') format('svg');
	}
	.iconfont{
		font-family: 'iconfont';
	}
	font,span{
		display:inline-block;
	}
	
</style>
