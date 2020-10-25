<template>
 <div class="tmpl">
  <nav-bar :title="title"></nav-bar>
  <div style="text-align: center;padding-top: 20px;" v-if="detial_error_flag">暂无数据</div>
  <div style="padding:10px" v-if="detial_flag">
    <h1 style="color: #095fc7;margin: 20px 0;">{{message.title}}</h1>
    <div style="overflow:hidden" >
        <span>点击数:{{message.click}}</span>
        <span style="float: right;">添加时间:{{message.add_time | converDate}}</span>
    </div>
    <hr />
    <div v-html="message.content"></div>
    </div>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             title:'新闻详情',
             message:'',
             detial_flag:false,
             detial_error_flag:false
          }
        },
        created(){
            //  this.id=this.$route.query.id
             this.$axios.get('/api/getnew/'+this.$route.query.id)
             .then(res=>{
              this.detial_flag=true;
               this.message=res.data.message[0]
             })
             .catch(err=>{
              this.detial_flag=false;
              this.detial_error_flag=true
               console.log(err)
             })
        },
        mounted(){

        },
        methods:{
             
        },
        components:{
             
        }
   }
</script>

<style scoped>
 
</style>