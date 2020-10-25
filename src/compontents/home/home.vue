<template>
 <div style="margin-bottom: 50px;" >
     <!-- {{value}} -->
     <!-- 轮播图 -->
     
      
      <banner :url="banner_axios"></banner>
 
      <!-- 九宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link :to="{name:'newslist'}">
          <span class="mui-icon mui-icon-home"></span>
                <div class="mui-media-body">新闻资讯</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link :to="{name:'share'}">
                <span class="mui-icon mui-icon-email"></span>
                <div class="mui-media-body">图文分享</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link :to="{name:'products'}">
                <span class="mui-icon mui-icon-chatbubble"></span>
                <div class="mui-media-body">商品展示</div></router-link></li>
        <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                <span class="mui-icon mui-icon-location"></span>
                <div class="mui-media-body">留言反馈</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
                <span class="mui-icon mui-icon-search"></span>
                <div class="mui-media-body">搜索资讯</div></a></li> -->

        <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link :to="{name:'talk'}">
                <span class="mui-icon mui-icon-phone"></span>
                <div class="mui-media-body">联系我们</div></router-link></li> -->
    </ul>
    
 </div>
</template>

<script>
    export default {
        data(){
          return{
            //  value:'首页',
            banner_axios:'/api/getlunbo'
          }
        },
        created(){
                              
        },
        methods:{

        },
        components:{
             
        }
   }
</script>

<style scoped>
 .mui-table-view.mui-grid-view.mui-grid-9{
     border: none;
     background-color: #fff;  
 }
 .mui-table-view.mui-grid-view.mui-grid-9 ul{
   border: none;
 }
 .mui-table-view.mui-grid-view.mui-grid-9 li{
   border: none;
 }
 .mui-icon-home::before,
 .mui-icon-email::before,
 .mui-icon-chatbubble::before,
 .mui-icon-search::before,
 .mui-icon-location::before,
 .mui-icon-phone::before{
     content: '';
 }
 /* 九宫格背景图片 */
 .mui-icon-home{
     background-image: url('../..//static/img/news.png');
     background-repeat: round;
 }
 .mui-icon-email{
    background-image: url('../../static/img/picShare.png');
    background-repeat: round;
 }
 .mui-icon-chatbubble{
  background-image: url('../../static/img/goodShow.png');
  background-repeat: round;
 }
 .mui-icon-search{
  background-image: url('../../static/img/feedback.png');
  background-repeat: round;
 }
 .mui-icon-location{
  background-image: url('../../static/img/search.png');
  background-repeat: round;
 }
 .mui-icon-phone{
  background-image: url('../../static/img/callme.png');
  background-repeat: round;
 }
 .mui-icon{
   width: 50px;
   height: 50px;
 } 
</style>