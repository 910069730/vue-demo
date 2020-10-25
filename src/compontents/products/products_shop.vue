<template>
    <div style="margin-bottom: 60px;">
        <nav-bar :title="title"></nav-bar>
        <div style="text-align: center;padding-top: 20px;" v-if="products_shop_error_flag">数据异常</div>
        <div  v-for="(good,index) in goods_message" :key="index" style="margin-top: 70px;border: none;" v-if="!products_shop_error_flag">
           <!-- <div class="mui-card-content">
               <div class="mui-card-content-inner">
                   <h4 style="padding:5px 0;float: left;line-height: 20px;" v-text="good.title"></h4>
                   <p style="color: #333;width: 100%;float: left;" v-html="good.content"></p>
               </div>
           </div> -->
           <div class="mui-card" style="width:80%;margin-left: 10%;border-radius: 10px;" >
               <!-- <img v-for="(img,index) in goods_images" :key="index" :src="img.src" alt="无法显示的图片" style="width:100%;"> -->
               <banner :url="url"></banner>
           </div>
           <div class="mui-card">
           <h4 style="color: #5533ff;">{{good.title}}</h4>
           <p>市场价：<s style="color: #000;">￥{{good.market_price}}</s> &nbsp;&nbsp;&nbsp;销售价：<span style="color: red;font-size: 20px;font-weight: 700;">￥{{good.sell_price}}</span></p>
             <div style="overflow:hidden;width: 100%;display: block;"><p style="float: left;line-height: 33px;">购买数量：</p>
                <div class="mui-numbox" style="float: left;margin-left: 7px; ">
                    <button class="mui-btn mui-btn-numbox-minus" type="button" @click="jian" :disabled="jian_disable">-</button>
                    <input class="mui-input-numbox" type="number" v-model="number" disabled >
                    <button class="mui-btn mui-btn-numbox-plus" type="button" @click="jia" :disabled="jia_disable">+</button>
                </div>
                <div style="width: 100%; float: left;"  v-if="!(jian_disable && jia_disable)">
                     <div class="mui-btn mui-btn-primary" style="padding: 10px 20px;"  @click="shopIt">
                       立即购买
                     </div>
                     <div class="mui-btn mui-btn-danger"  style="padding: 10px 20px;" @click="addShopcart">
                        加入购物车
                     </div>
                </div>
              </div>
           </div>
           <div  class="mui-card">
                <p>
                    商品参数<br/>
                    商品货号：{{good.goods_no}}<br/>
                    商品库存：{{good.stock_quantity}}<br/>
                    上架时间：{{good.add_time | converDate}}
                </p>
            </div>
            <div  class="mui-card">
                <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" style="display: block;width: 100%;" @click="toProductsDetail">
					商品介绍
                </button>
                <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" style="display: block;width: 100%;margin-top: 10px;" @click="toProductsComment">
					商品评论
				</button>
            </div>


       </div>
    </div>
   </template>
   
   <script>
			// document.getElementById("btn").addEventListener('tap', function(event) {
			// 	mui.alert('当前值: ' + document.getElementById("box").value, null, "提示");
			// });
			// var testBox=document.getElementById("test");
			// testBox.addEventListener('change',function(){
			// 	console.log(testBox.value);
            // });
    import shopcart_connect from '../common/shopcart_connect.js';
    import prodTools from '../common/prodTools.js';
    import { MessageBox } from 'mint-ui';
       export default {
           data(){
             return{
                title:'商品详情',
                products_shop_error_flag:false,
                goods_message:{},
                url:'/api/getthumimages/'+this.$route.query.id,
                number:1,
                jian_disable:true,
                jia_disable:false
             }
           },
           created(){
                 var that=this
                function getMsg(res1){
                    that.goods_message=res1.data.message;
                }

                // 合并请求
                this.$axios.all([
                    this.$axios.get('/api/goods/getinfo/'+this.$route.query.id)
                ])
                .then(this.$axios.spread(getMsg))
                .catch(err=>{
                    this.products_shop_error_flag=true
                    console.log(err);
                })
           },
           methods:{
                jia(){
                    if(this.number>=this.goods_message[0].stock_quantity){
                        this.$router.push('/404')
                      return
                    }
                    if(this.number<(this.goods_message[0].stock_quantity-1)){
                        this.number++;
                        this.jian_disable=false;
                    }else{
                        this.number++;
                        this.jia_disable=true;
                        this.jian_disable=false;
                    }
                    
                },
                jian(){
                        if(this.number<=1){
                        this.$router.push('/404')
                        return
                        }
                         if(this.number>2){
                            this.number--;
                            this.jian_disable=false;
                            this.jia_disable=false;
                        }else{
                            this.number--;
                        this.jian_disable=true;
                        this.jia_disable=false;
                        } 
                },
                toProductsDetail(){
                    this.$router.push({name:'products_detail',query:{id:this.$route.query.id}})
                },
                toProductsComment(){
                    this.$router.push({name:'products_comment',query:{id:this.$route.query.id}})
                },
                addShopcart(){
                    prodTools.addOrUpdate({
                        id:this.goods_message[0].id,
                        num:this.number
                    })
                    shopcart_connect.$emit('phone',this.number);
                    MessageBox.alert('已添加至购物车', '温馨提示');
                    console.log(prodTools.getProds());
                    if(this.goods_message[0].stock_quantity<1){
                        this.number=0;
                        this.jia_disable=true;
                        this.jian_disable=true;
                    }else{
                        this.number=1;
                        this.jian_disable=true;
                        this.jia_disable=false;
                    }
                },
                shopIt(){
                    MessageBox.alert('暂未开放此功能', '温馨提示');
                }
           },
           components:{
                
           }
      }
   </script>
   
   <style scoped>
   .mui-card{
       width: 94%;
       margin-left: 3%;
       margin-top: 10px;
       margin-right: 3%;
       box-shadow: 0 0 5px 1px #aaa;
       padding: 10px;
       
   }
   </style>