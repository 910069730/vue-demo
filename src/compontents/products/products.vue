<template>
 <div >
     <nav-bar :title="title"></nav-bar>

<div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }"  v-if="!products_error_flag">
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
    <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-6"  style="position: relative;" v-for="(item,index) in datas" :key="index">
            <router-link :to="{name:'products_shop',query:{id:item.id}}">
                <img class="mui-media-object" v-lazy="item.img_url" style="width: 100%;" alt="无法显示此图片">
                <div class="mui-media-body" >{{item.title}}</div>
                <div style="background-color: #bbb;text-align: right;margin-top: 5px;"><span style="color: red; float: left;"> ￥{{item.sell_price}}</span><s style="color: #334455;">￥{{item.market_price}} </s></div>
                <div style="background-color: #bbb;text-align: right;"><span style="color: #334455; float: left;">热卖中</span><span style="color: #334455;">剩{{item.stock_quantity}}件</span></div>
            </router-link></li>
        <li><p style="text-align: center;padding-top: 20px;" v-if="allLoaded">已经到底了</p></li>
    </ul>
 </mt-loadmore>
</div>
     <div style="text-align: center;padding-top: 20px;" v-if="products_error_flag">数据异常</div>
 </div>
</template>

<script>
    export default {
        data(){
          return{
             title:'商品展示',
             products_error_flag:false,
             
                pageIndex:1,
                datas: [],
                allLoaded: false,
                //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 0
          }
        },
        created(){
            this.loadFrist();

        },
        mounted() {
            // 父控件要加上高度，否则会出现上拉不动的情况
            this.wrapperHeight =
            document.documentElement.clientHeight -
            this.$refs.wrapper.getBoundingClientRect().top;
        },
        methods:{
            //  show(num){
            //     this.$axios.get('api/getgoods/?pageindex='+num)
            //         .then(res=>{
            //             this.products=res.data.message;
            //             console.log(res.data.message)

            //             if(res.data.message.length<1){
            //                 this.products_error_flag=true;
            //             }else{
            //                 this.products_error_flag=false;
            //             }
                        
            //         })
            //         .catch(err=>{
            //             this.products_error_flag=true;
            //             console.log(err)
            //         })
            //  },

    //   下拉刷新
        loadTop() {
        this.loadFrist();
        },
    // 上拉加载
        loadBottom() {
        this.loadMore();
        },
    // 下来刷新加载
        loadFrist() {
            this.pageIndex=1;
            this.$axios.get('api/getgoods/?pageindex='+this.pageIndex)
                .then(response => {
                this.courrentPage = 0;
                this.allLoaded = false; // 可以进行上拉
                this.datas = response.data.message;
                this.$refs.loadmore.onTopLoaded();
                })
                .catch(error => {
                console.log(error);
                // alert("网络错误，不能访问");
                this.products_error_flag=true;
                });
            },
    // 加载更多
       loadMore() {
            this.$axios.get('api/getgoods/?pageindex='+(++this.pageIndex))
            .then(response => {
            // concat数组的追加
            this.datas = this.datas.concat(response.data.message);
            if (response.data.message.length < 10) {
                this.allLoaded = true; // 若数据已全部获取完毕
            }
            this.courrentPage++;
            this.$refs.loadmore.onBottomLoaded();
            })
            .catch(error => {
            console.log(error);
            // alert("网络错误，不能访问");
            this.products_error_flag=true;
            });
            }
        },
        components:{
             
        }
   }
</script>

<style scoped>
 .main-body {
  /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
  overflow: scroll;
  position: relative;
}
</style>