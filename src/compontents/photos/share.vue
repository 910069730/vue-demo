<template>
 <div class="tmpl" >
     <nav-bar :title="title"></nav-bar>
     <div style="width: 100%;overflow-x: scroll;padding: 10px 0;">
        <div style="white-space: nowrap;">
            <a  href="javascript:;" v-for="(value,index) in values" :key="index" :class="index=='0'?'titleFirst':''"   style="padding: 10px 3px;" ref="titleChoose" @click="loadImg(value.id,index)">
                {{value.title}}
            </a>
        </div>
     </div>
     <div style="text-align: center;margin-top: 20px; color: #000;" v-if="share_error_flag">暂无数据</div>

     <div class="mui-card" v-for="(image,index) in images" :key="index" style="box-shadow: 0 0 5px 2px #ccc;" @click="toPhotoDetail(image.id)">
        <div class="mui-card-header mui-card-media" style="height: 100%;width: 100%;" ><img style="width: 100%;height: 100%;" v-lazy="image.img_url" alt=""></div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <h4 style="padding:5px 0;float: left;line-height: 20px;" v-text="image.title"></h4>
                <p style="color: #333;width: 100%;float: left;" v-html="image.zhaiyao"></p>
            </div>
        </div>
        <div class="mui-card-footer">
            <a class="mui-card-link">{{image.tags?image.tags:'未分类'}}</a>
            <a class="mui-card-link">{{image.update_time | converDate}}</a>
        </div>
    </div>

 </div>
</template>

<script>
    export default {
        data(){
          return{
              title:'图文分享',
              share_error_flag:false,
              values:[],
              images:[]
          }
        },
        created(){
            this.$axios.get('/api/getimgcategory')
             .then(res=>{
                 this.values=res.data.message;
                 this.values=[this.values[7],this.values[6],this.values[5],this.values[4],this.values[3],this.values[8],this.values[0],this.values[1],this.values[2]]
                 this.values.unshift({
                     id:0,
                     title:'全部'
                 })
                console.log(this.values)
             })
             .catch(err=>{
            //   this.share_error_flag=true;
             })

             this.loadImg(0);
            
        },
        methods:{
              loadImg(id,indexs){
                        this.$axios.get('/api/getimages/'+id)
                    .then(result=>{
                        this.images=result.data.message;
                        // console.log(this.images[0])
                        this.share_error_flag=false;
                        if(this.images[0]==undefined){
                            this.share_error_flag=true;
                        }
                    })
                    .catch(err=>{
                    this.share_error_flag=true;
                    })
                    
                    if(indexs || indexs=='0'){
                        for(var i=0;i<this.values.length;i++){
                        this.$refs.titleChoose[i].style.color="#007aff"
                    }
                    this.$refs.titleChoose[indexs].style.color="#000"
                    // console.log(indexs)
                    }
                   
              },
              toPhotoDetail(id){
                  this.$router.push({name:'share_detail',params:{id:id}})
                // console.log(123);
              }
        },
        components:{
             
        }
   }
</script>

<style scoped>
 .titleFirst{
     color: #000;
 }
</style>