<template>
 <div id="app" style="margin-top: 44px;">
    <!-- 顶部栏 -->
   <mt-header fixed  :title="name"   class="appHeader" style="height: 44px;"></mt-header>

   <!-- 坑位 -->
    <router-view ></router-view> 

    <!-- 底部选栏 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" :to="{name:'home'}">
         <span class="mui-icon iconfont icon-icon4"></span>
         <span class="mui-tab-label">首页</span>
      </router-link>
      <!-- <router-link class="mui-tab-item" :to="{name:'member'}">
         <span class="mui-icon iconfont icon-huiyuan"></span>
         <span class="mui-tab-label">会员</span>
      </router-link> -->
      <router-link class="mui-tab-item" :to="{name:'comments'}">
         <span class="mui-icon mui-icon-chat" style="margin-bottom: 3px;"></span>
         <span class="mui-tab-label"  style="padding-bottom: 3px;">评论</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'shopcart'}">
         <span class="mui-icon iconfont icon-htmal5icon29">
            <transition name="fade">
             <span class="mui-badge" v-show="shopCart_num>0?true:false" v-if="show">{{shopCart_num<100?shopCart_num:'99+'}}</span>
            </transition>
         </span>
         <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'talk'}">
         <span class="mui-icon mui-icon-contact"  style="margin-bottom: 3px;"></span>
         <span class="mui-tab-label"  style="padding-bottom: 3px;">联系</span>
      </router-link>
      <!-- <router-link class="mui-tab-item" :to="{name:'search'}">
         <span class="mui-icon mui-icon-search"></span>
         <span class="mui-tab-label">查找</span>
      </router-link> -->
   </nav>
 </div>
</template>

<script>
   import shopcart_connect from './compontents/common/shopcart_connect.js';
   import shopcart_connect2 from './compontents/common/shopcart_connect.js';
   import prodTools from './compontents/common/prodTools.js';
    export default {
        data(){
          return{
             name:'信息管理系统',
             shopCart_num:0,
             show: true
          }
        },
        created(){
        this.shopcart_connect()
        this.shopcart_connect2()
        },
        methods:{
         shopcart_connect(){
            this.shopCart_num=prodTools.getTotalCount();
            shopcart_connect.$on('phone',msg=>{   //箭头函数
                let num=this.shopCart_num
                this.shopCart_num=this.shopCart_num+msg
                if(num!=this.shopCart_num && num<100){
                   this.show=false;
                   setTimeout(()=>{
                      this.show=true
                   },100)
                }
                console.log(this.shopCart_num)
                
             })
         },
         shopcart_connect2(){
            this.shopCart_num=prodTools.getTotalCount();
            shopcart_connect2.$on('phone2',msg=>{   //箭头函数
                let num=this.shopCart_num
                this.shopCart_num=prodTools.getTotalCount()
                if(num!=this.shopCart_num && num<100){
                   this.show=false;
                   setTimeout(()=>{
                      this.show=true
                   },100)
                }
                console.log(this.shopCart_num)
                
             })
         }
        },
        components:{
             
        }
   }
</script>

<style>
   .pswp__counter{
   padding-left: 17px;
 }

 /* 动画 */
 .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
   /* APP样式 */
   #app{
      margin-top: 60px !important;
   }
    .appHeader{
      padding-top: 20px; height: 60px !important;
   }
   .mui-bar.mui-bar-nav{
      height: 60px;
      background-color: #26a2ff;
      padding-top: 20px;
   }
   .mui-title{
      font-size: 14px;
      line-height: 40px;
      color: #fff;
   }
   .mui-action-back.mui-icon.mui-icon-left-nav.mui-pull-left{
      color: #fff;
      margin-right: -10px;
     margin-left: -10px;
     padding-right: 10px;
     padding-left: 10px;
     padding-top: 5px;
    padding-bottom: 11px;
   }
   .talk_avatar{
      top:85px !important;
   }
   .pswp__top-bar,.pswp__counter{
   padding-top: 20px;
 }
</style>