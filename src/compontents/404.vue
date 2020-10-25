<template>
 <div>
     <div style="text-align: center;">
       <img src="https://g.csdnimg.cn/static/404img/404.png" alt="" style="display: block;padding: 30px 0; margin: 0 auto;">
       <p>啊哦 ~ 你似乎迷路了</p>
       <button @click="returnIndex" style="background-color: #26A2FF;color: #fff;border-radius: 10px;">返回首页</button>
     </div>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             
          }
        },
        created(){
             
        },
        methods:{
             returnIndex(){
               this.$router.push({name:'home'})
             }
        },
        components:{
             
        }
   }
</script>

<style scoped>
 
</style>