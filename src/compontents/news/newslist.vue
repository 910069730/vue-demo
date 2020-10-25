<template>
 <div class="tmpl">
    <!-- <header class="mui-bar mui-bar-nav" style="display: block; position: relative;">
        <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" :to="{name:'home'}"></router-link>
        <h1 class="mui-title">新闻资讯</h1>
    </header> -->
    <nav-bar :title="title"></nav-bar>
    <div style="text-align: center;padding-top: 20px;" v-if="newslist_error_flag">暂无数据</div>
     <ul class="mui-table-view" v-if="!newslist_error_flag">
        <!-- v-for="(message,index) in messages" :key="index" -->
        <li class="mui-table-view-cell mui-media" v-for="(message,index) in messages" :key="index" >
            <router-link class="" :to="{name:'newslist_detail',query:{id:message.id}}">
                <img class="mui-media-object mui-pull-left" :src="message.img_url" >
                <div class="mui-media-body">
                    {{message.title}}
                    <p class="mui-ellipsis">点击数:{{message.click}}<span class="c-right">发表时间:{{message.add_time | converDate}}</span></p>
                </div>
            </router-link>
        </li>
    </ul>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             title:'新闻资讯',
             messages:[],
             newslist_error_flag:false
          }
        },
        created(){
             this.$axios.get('api/getnewslist')
             .then(res=>{
                 this.messages=res.data.message
             })
             .catch(err=>{
                 this.newslist_error_flag=true;
                 console.log(err)
             })
        },
        methods:{
             
        },
        components:{
             
        }
   }
</script>

<style scoped>
 .mui-ellipsis{
     color: #26A2FF;
 }
 .c-right{
    float: right;
 }
 /* .mui-table-view{
     margin-bottom: 50px;
 } */
</style>