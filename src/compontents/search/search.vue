<template>
 <div>
  <div style="text-align: center;padding-top: 20px;" v-if="search_error_flag">暂无数据</div>
 </div>
</template>

<script>
    export default {
        data(){
          return{
            search_error_flag:false
          }
        },
        created(){
          this.$axios.get('/api/getimgcateg1ory')
             .then(res=>{
                 this.values=res.data.message;
             })
             .catch(err=>{
              this.search_error_flag=true;
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