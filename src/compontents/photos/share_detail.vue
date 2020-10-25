<template>
 <div class="tmpl">
     <nav-bar :title="title"></nav-bar>
     <div style="text-align: center;padding-top: 20px;" v-if="share_detial_error_flag">暂无数据</div>
     <div style="padding:10px" v-if="!share_detial_error_flag">
      <h1 style="color: #095fc7;margin: 20px 0;">{{value.title}}</h1>
      <div style="overflow:hidden;line-height: 30px;" >
          <span style="float: left;">发起时间：{{value.add_time | converDate}}</span>
          <span style="float: right;">{{value.click}} <span class="mui-icon mui-icon-eye" style="color: #aaa;"></span></span>
      </div>
      <hr />
      <div style="overflow:hidden;">
      <p v-for="(message,index) in messages" :key="index" style="width: 30%;margin-right: 3%;float: left;">
          <img ref="allImg"  class="preview-img" width="100%" :src="message.src" @click="$preview.open(index,messages)">
         
      </p>
    </div>
      <hr />
       <p v-html="value.content"></p>
      </div>

      <comment :cid="pid" ></comment>

 </div>
</template>

<script>
    export default {
        data(){
          return{
             title:'图片详情',
             messages:[], //存放缩略图
             value:{}, //存放信息
             share_detial_error_flag:false,
             pid:this.$route.params.id
          }
        },
        created(){
                    this.$axios.get('api/getimageInfo/'+this.$route.params.id)
                    .then(res=>{
                        this.value=res.data.message[0]
                        // console.log(res.data.message[0])
                    })
                    .catch(err=>{
                        this.share_detial_error_flag=true;
                        console.log(err)
                    })

                    this.$axios.get('api/getthumimages/'+this.$route.params.id)
                    .then(res=>{
                        this.messages=res.data.message
                        this.messages.forEach((ele)=>{
                          ele.w = 300;
                          ele.h = 300;
                        })
                        // console.log(res.data.message)
                    })
                    .catch(err=>{
                        this.share_detial_error_flag=true;
                        console.log(err)
                    })

                    // this.pinlun('');
        },
        methods:{

        },
        components:{
             
        },
        //离开当前页面后执行
        destroyed(){
            document.getElementsByClassName('pswp')[0].classList.remove('pswp--open')
        }
   }
</script>

<style scoped>
 
</style>