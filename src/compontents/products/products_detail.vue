<template>
 <div style="margin-bottom: 60px;">
     <nav-bar :title="title"></nav-bar>
     <div style="text-align: center;padding-top: 20px;" v-if="products_detail_error_flag">数据异常</div>
     <div class="mui-card" v-for="(good,index) in goods_message" :key="index" style="box-shadow: 0 0 5px 2px #ccc;margin-top: 70px;" v-if="!products_detail_error_flag">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <h4 style="padding:5px 0;float: left;line-height: 20px;" v-text="good.title"></h4>
                <p style="color: #333;width: 100%;float: left;" v-html="good.content"></p>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             title:'商品介绍',
             products_detail_error_flag:false,
             goods_message:{}
          }
        },
        created(){
             this.$axios.get('/api/goods/getdesc/'+this.$route.query.id)
             .then(res=>{
                 console.log(res.data.message);
                 this.goods_message=res.data.message;
             })
             .catch(err=>{
                 this.products_detail_error_flag=true
                 console.log(err);
             })
        },
        methods:{
             
        },
        components:{
             
        }
   }
</script>

<style scoped>

</style>