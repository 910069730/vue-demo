<template>
 <div>
      <header class="mui-bar mui-bar-nav" style="display: block; position: fixed;">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></a>
        <h1 class="mui-title">{{title}}</h1>
    </header>
 </div>
</template>

<script>
    export default {
        data(){
          return{
          }
        },
        props:['title'],
        created(){
             
        },
        methods:{
             goBack(){
                //  this.$router.go(-1);
                // this.mui_old_back();
             }
        },
        components:{
             
        }
   }
</script>

<style scoped>
 
</style>