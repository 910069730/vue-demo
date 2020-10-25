<template>
 <div>
    <div id="comment" v-if="comment_error_flag">
      <hr />
     <div style="overflow:hidden;">
         <h4 style="margin-left: 5%;">用户评论</h4>
         <textarea v-model="talkMessage" style="resize: none;width: 90%;margin-left: 5%;margin-top: 3px; margin-bottom: 3px;box-shadow: 0 0 5px 1px #26A2FF;" name="" id="" cols="30" rows="5"></textarea>
         <button style="float: right;margin-right: 5%;background-color: #26A2FF;color: #fff;border-radius: 5px;" @click="pinlun(talkMessage)">提交评论</button>
     </div>
     <hr/>
     <div style="overflow:hidden;">
      <h4 style="margin-left: 5%;">评论列表</h4>
      <ul style="padding-left: 5%;padding-right: 5%;list-style: none;" >
        <li style="text-align: center;padding-top: 20px;" v-if="share_detial_pinlun_error_flag">暂无评论</li>
        <li style="overflow:hidden;" v-for="(comment,index) in comments" :key="index" >
          <hr/>
          <p><span style="color: #095fc7;">{{comment.user_name}}</span>：{{comment.content}}</p>
          <p style="float: right;">{{comment.add_time | converDateTime}}</p>
        </li>
        <li style="text-align: center;" v-if="!share_detial_pinlun_none_flag"><button @click="addMore">加载更多</button></li>
        <li style="text-align: center;" v-if="share_detial_pinlun_none_flag"><p>已经到底了</p></li>
        <hr/>
      </ul>
     </div>
      </div>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             comments:[],
             talkMessage:'',
             pageIndex:1,
             share_detial_pinlun_error_flag:false,
             share_detial_pinlun_none_flag:false,
             comment_error_flag:true
          }
        },
        props:['cid'],
        created(){
          this.pinlun('');
        },
        methods:{
          pinlun(talkMessage){
            if(talkMessage==''){
              this.pageIndex=1;
              this.$axios.get('api/getcomments/'+this.cid+'?pageindex='+this.pageIndex)
                    .then(res=>{
                        this.comments=res.data.message
                        console.log(res.data)
                        if(res.data.status==1){
                          this.comment_error_flag=false;
                        }
                        // if(res.data.message.length==0){
                        //   this.share_detial_pinlun_error_flag=true;
                        // }
                        if(res.data.message.length<10){
                          this.share_detial_pinlun_none_flag=true;
                        }else{
                          this.share_detial_pinlun_none_flag=false;
                        }
                        
                    })
                    .catch(err=>{
                        // this.share_detial_error_flag=true;
                        this.share_detial_pinlun_none_flag=true;
                        console.log(err)
                        this.comment_error_flag=false;
                    })
            }else{
                  //  alert('成功')
                   this.$axios.post('api/postcomment/'+this.cid,'content='+this.talkMessage)
                          .then(res=>{
                              // this.comments=res.data.message
                              console.log(res.data.message)

                          })
                          .catch(err=>{
                              // this.share_detial_error_flag=true;
                              console.log(err)
                              
                          })

                   this.$axios.get('api/getcomments/'+this.cid+'?pageindex=1')
                    .then(res=>{
                      this.comments=res.data.message;
                        // console.log(res.data.message)
                        if(res.data.message.length==0){
                          this.share_detial_pinlun_error_flag=true;
                        }
                        this.pageIndex=1;
                        this.talkMessage='';
                        this.share_detial_pinlun_none_flag=false;
                        if(res.data.status==1){
                          this.comment_error_flag=false;
                        }
                        if(res.data.message.length<10){
                          this.share_detial_pinlun_none_flag=true;
                        }else{
                          this.share_detial_pinlun_none_flag=false;
                        }
                    })
                    .catch(err=>{
                        // this.share_detial_error_flag=true;
                        console.log(err)
                        this.talkMessage='';
                        this.comment_error_flag=false;
                    })
            }
                
              //  console.log(this.talkMessage)
                          // this.$axios.post('api/getcomments/'+this.$route.params.id+'?pageindex=1')
                          // .then(res=>{
                          //     this.comments=res.data.message
                          //     console.log(res.data.message)
                          // })
                          // .catch(err=>{
                          //     // this.share_detial_error_flag=true;
                          //     console.log(err)
                          // })
             },
             addMore(){
                   this.$axios.get('api/getcomments/'+this.cid+'?pageindex='+(++this.pageIndex))
                          .then(res=>{
                              this.comments=this.comments.concat(res.data.message)
                              if(res.data.message.length<10){
                                this.share_detial_pinlun_none_flag=true;
                              }
                              console.log(res.data.message)
                                 if(res.data.status==1){
                                   this.comment_error_flag=false;
                                 }
                          })
                          .catch(err=>{
                              // this.share_detial_error_flag=true;
                              console.log(err)
                              this.comment_error_flag=false;
                          })
             }
        },
        components:{
             
        }
   }
</script>

<style scoped>
 
</style>