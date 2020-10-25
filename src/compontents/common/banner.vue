<template>
 <div>
    <mt-swipe :auto="4000" style="max-height: 250px;"  >
        <mt-swipe-item  v-if="banner_error_flag" style="position: absolute;width: 100%;text-align: center;top:0;line-height: 135px;background-color: #ccc;">暂无数据</mt-swipe-item>
        <mt-swipe-item v-for="(banner,index) in banners" :key="index" ><img style="width: 100% !important;height: 100%;" :src="banner.img?banner.img:banner.src" alt="无法显示此图片"></mt-swipe-item>
    </mt-swipe>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             banners:[],
             banner_error_flag:false,
          }
        },
        props:['url'],
        created(){
            this.$axios.get(this.url)
                    .then(res=>{
                        this.banners=res.data.message;
                    })
                    .catch(err=>{
                      this.banner_error_flag=true;
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