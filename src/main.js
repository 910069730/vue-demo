"use strict"

import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import Mint from 'mint-ui';

import Moment from 'moment';
import VuePreview from 'vue-preview'

import 'mint-ui/lib/style.css';
import './static/vendor/mui/dist/css/mui.css';
import './static/css/global.css';

const home = r => require(['./compontents/home/home.vue'],r);

const newslist = r => require(['./compontents/news/newslist.vue'],r);
const detail = r => require(['./compontents/news/detail.vue'],r);

const products = r => require(['./compontents/products/products.vue'],r);
const productsShop = r => require(['./compontents/products/products_shop.vue'],r);
const productsDetail = r => require(['./compontents/products/products_detail.vue'],r);
const productsComment = r => require(['./compontents/products/products_comment.vue'],r);

const share = r => require(['./compontents/photos/share.vue'],r);
const shareDetail = r => require(['./compontents/photos/share_detail.vue'],r);

const talk = r => require(['./compontents/talk/talk.vue'],r);

const comments = r => require(['./compontents/comments/comments.vue'],r);
const member = r => require(['./compontents/member/member.vue'],r);
const shopcart = r => require(['./compontents/shopcart/shopcart.vue'],r);
const search = r => require(['./compontents/search/search.vue'],r);

import navBar  from './compontents/common/navBar.vue';
import comment  from './compontents/common/comment.vue';
import banner  from './compontents/common/banner.vue';

const notFound = r => require(['./compontents/404.vue'],r);

Vue.use(VueRouter);
Vue.use(VuePreview);

Vue.use(Mint);

Vue.component('navBar',navBar);
Vue.component('comment',comment);
Vue.component('banner',banner);

let router = new VueRouter({
  linkActiveClass:"mui-active",
    routes:[
        {path:'/',redirect:{name:'home'}},   //重定向
        {name:'home',path:'/home',component:home},  //首页

        {name:'newslist',path:'/newslist',component:newslist},
        {name:'newslist_detail',path:'/newslist/detail',component:detail},

        {name:'share',path:'/share',component:share},
        {name:'share_detail',path:'/share/:id',component:shareDetail},

        {name:'products',path:'/products',component:products},
        {name:'products_shop',path:'/products/shop',component:productsShop},
        {name:'products_detail',path:'/products/detail',component:productsDetail},
        {name:'products_comment',path:'/products/comment',component:productsComment},

        {name:'talk',path:'/talk',component:talk},

        {name:'comments',path:'/comments',component:comments},
        {name:'member',path:'/member',component:member},  
        {name:'shopcart',path:'/shopcart',component:shopcart},  
        {name:'search',path:'/search',component:search},  

        {name:'notFound',path:'*',component:notFound},  
    ]
})

import App from './app.vue';

Axios.defaults.baseURL='http://api.cms.liulongbin.top/';

// 全局过滤器
    Vue.filter('converDate',function(value){
       return Moment(value).format('YYYY-MM-DD');
    })
    Vue.filter('converDateTime',function(value){
      return Moment(value).format('YYYY-MM-DD HH:mm:ss');
   })

// 拦截器
Axios.interceptors.request.use(function(config){
    Mint.Indicator.open({
      text:'加载中...',
      spinnerType:'fading-circle'
    });
    return config; 
  })
  
  Axios.interceptors.response.use(function(config){
    Mint.Indicator.close();
    return config; 
  },error=>{
    Mint.Indicator.close();
  })


//挂载原型
Vue.prototype.$axios = Axios;

new Vue({
    el:'#app',
    router,
    render:c=>c(App),
})