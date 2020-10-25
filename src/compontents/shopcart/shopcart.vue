<template>
 <div > 
   <!-- <div style="height: 60px;position: fixed;right: 15px;top: 30px;z-index: 9999;font-size: 15px;color: #fff;">设置</div> -->
  <div style="text-align: center;padding-top: 20px;" v-if="shopcart_error_flag">暂无数据</div>
    <div class="shopcart_content" v-if="!shopcart_error_flag" style="overflow:hidden;padding-bottom:10px;margin-bottom: 110px;"  >
        <div v-for="(goods,index) in shopcart_goods" :key="index" >
          <div ref="domIndex" style="width: 94%;position:relative;padding: 10px ;float: left;margin: 15px 3% 0;border-radius: 10px;box-shadow: 0 0 5px 1px #ddd;background-color:white;">
            <div style="overflow:hidden;widows: 100px;">
                  <img :src="goods.thumb_path" style="width: 100px;height:100px;float: left;border:2px solid #ccc;padding: 5px;margin-right: 10px;overflow: hidden;" alt="">
                  <span style="color: blue;font-size: 14px;display: block;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">{{goods.title}}</span>
                  <div style="margin-top: 10px;font-size: 16px;">￥{{goods.sell_price}} 
                     <br/>
                      <div style="margin-top: 10px;float: left;">
                            <div class="mui-numbox"> 
                                <button class="mui-btn mui-btn-numbox-minus" type="button" :disabled="shopcart_allNum[index]>1?false:true" @click="goods_jianNum(index,goods.sell_price,goods.id)" >-</button>
                                <input class="mui-input-numbox" type="number" disabled=true v-model="shopcart_allNum[index]">
                                <button class="mui-btn mui-btn-numbox-plus" type="button"  :disabled="shopcart_allNum[index]<500?false:true" @click="goods_addNum(index,goods.sell_price,goods.id)">+</button>
                          </div>
                      </div>
                      <div style="float: right;margin-top: -25px;">
                          <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" style="padding: 5px;border: none;" @click="deleteGoods(goods.id)">
                            删除
                          </button>
                      </div>
                      <input type="checkbox" style="width: 48px;height:25px;text-align: center;position: absolute;bottom: 20px;right: 5px;" ref="checkIndex" @click="toggleCheck(index,goods.sell_price)" >
                      
                  </div>
            </div>
          
          </div>
        </div>

        <div style="padding: 3px 5px 0px 10px;background-color: #ddd;overflow: hidden;position: fixed;bottom: 50px;width: 100%;">
          <p style="line-height: 35px; margin-bottom: 0px;">总计(不含运费)</p>
          <div  style="width:100%">
            <!-- <span style="font-size:16px;float: left;line-height: 30px;width: 100%;word-wrap: break-word;">已经选择商品<b style="color: red;">{{num}}</b>件</span> -->
            <p style="color: #000;font-size: 16px;line-height: 10px;float: left;word-wrap: break-word;width: 100%;margin-bottom: 10px;"> <span style="color: red;font-weight: 700;">￥{{price}}元</span></p>
            <button type="button" class="mui-btn mui-btn-danger" style="position: absolute;margin-top:-1px;right: 10px;bottom: 10px;" @click="shop" :disabled="price<=0?true:false">
              去结算
            </button>
          </div>
        </div>
    </div>
 </div>
</template>

<script>
  import shopcart_connect2 from '../common/shopcart_connect.js';
  import prodTools from '../common/prodTools.js';
  import { MessageBox } from 'mint-ui';
     export default {
        data(){
          return{
            shopcart_error_flag:false,
            // num:0,
            price:0,
            shopcart_allId:[],
            shopcart_allNum:[],
            shopcart_goods:[]
            // ,
            // toggleCheck:''
          }
        },
        created(){
          
          this.getshopcarlist()
        },
        methods:{
          getshopcarlist(){
            if(JSON.stringify(prodTools.getProds())=='{}'){
              this.shopcart_error_flag=true;
              this.shopcart_allId=[]
              this.shopcart_allNum=[]
            }else{
              this.shopcart_allId=[]
              this.shopcart_allNum=[]

             for(var key in prodTools.getProds()){
              // console.log(key)
              this.shopcart_allId[this.shopcart_allId.length]=key
              this.shopcart_allNum[this.shopcart_allNum.length]=prodTools.getProds()[key]
              }

              let id_value=this.shopcart_allId[0]
              for(var i=1;i<this.shopcart_allId.length;i++){
                  id_value=id_value+","+this.shopcart_allId[i]
              }
              console.log(this.shopcart_allNum)
              // console.log()
              
              console.log(this.shopcart_allId)
             
              ////////////////////////////////
            this.$axios.get('/api/goods/getshopcarlist/'+id_value)
             .then(res=>{
                //  this.values=res.data.message;
                 console.log(res.data.message)
                 if(res.data.message.length<1){
                  this.shopcart_error_flag=true
                 }
                 this.shopcart_goods=res.data.message;
             })
             .catch(err=>{
              this.shopcart_error_flag=true;
             })
              ////////////////////////////////
              
            }
              
          },
          deleteGoods(id){
            prodTools.delete(id);
            this.getshopcarlist();
            shopcart_connect2.$emit('phone2',prodTools.getTotalCount());
            this.price=0;
            for(var i=0;i<this.$refs.domIndex.length;i++){
              this.$refs.domIndex[i].style.backgroundColor='white'
              this.$refs.checkIndex[i].checked=false
            }
          },
          toggleCheck(indexs,the_price){
            // console.log(indexs)
             if(this.$refs.domIndex[indexs].style.backgroundColor=='white'){
              this.$refs.domIndex[indexs].style.backgroundColor="teal";
              this.price=this.price+the_price*this.shopcart_allNum[indexs]
              // console.log(indexs)
              // console.log(status)
             }else{
              //  status=1;
              this.$refs.domIndex[indexs].style.backgroundColor="white";
              this.price=this.price-the_price*this.shopcart_allNum[indexs]
             }
            // console.log()
            },
           goods_addNum(indexs,the_price,pid){
                prodTools.addOrUpdate({id:pid,num:1})
                this.shopcart_allId=[]
              this.shopcart_allNum=[]

             for(var key in prodTools.getProds()){
              // console.log(key)
              this.shopcart_allId[this.shopcart_allId.length]=key
              this.shopcart_allNum[this.shopcart_allNum.length]=prodTools.getProds()[key]
              }
              if(this.$refs.domIndex[indexs].style.backgroundColor=='teal'){
                this.price=this.price+the_price
                // console.log(indexs)
                // console.log(status)
              }
              shopcart_connect2.$emit('phone2',prodTools.getTotalCount());
           },
           goods_jianNum(indexs,the_price,pid){
            prodTools.addOrUpdate({id:pid,num:-1})
            this.shopcart_allId=[]
              this.shopcart_allNum=[]

             for(var key in prodTools.getProds()){
              // console.log(key)
              this.shopcart_allId[this.shopcart_allId.length]=key
              this.shopcart_allNum[this.shopcart_allNum.length]=prodTools.getProds()[key]
              }
              if(this.$refs.domIndex[indexs].style.backgroundColor=='teal'){
                this.price=this.price-the_price
                // console.log(the_price)
                // console.log(indexs)
                // console.log(status)
              }
              shopcart_connect2.$emit('phone2',prodTools.getTotalCount());
           },
           shop(){
             MessageBox.alert('暂未开放此功能', '温馨提示');
           }
        },
        watch:{
          price:function(newV,oldV){
            // console.log(111)
            if(newV>1000000){
                MessageBox.alert('单笔金额不能大于100万', '温馨提示').then(action => {
                  this.price=0;
                  for(var i=0;i<this.$refs.domIndex.length;i++){
                    this.$refs.domIndex[i].style.backgroundColor='white'
                    this.$refs.checkIndex[i].checked=false
                  }
                });
              }
          }
        },
        mounted(){
          // this.toggleCheck=function(indexs){
            // console.log(indexs)
            //  if(this.$refs[indexs][0].style.backgroundColor=='white'){
            //    this.$refs[indexs][0].style.backgroundColor="#26a2ff";
            //   // console.log(indexs)
            //   console.log(status)
            //  }else{
            //    status=1;
            //    that.$refs[indexs][0].style.backgroundColor="white";
            //  }
            // console.log(this.$refs)
          // }
        },
        components:{
             
        }
   }
</script>

<style scoped>
 .check_none{
   background-color: red !important;
 }
 .check_active{
   background-color: #5533ff !important;
 }
</style>