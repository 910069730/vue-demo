webpackJsonp([5],{264:function(t,n,e){"use strict";function o(t){c||e(310)}Object.defineProperty(n,"__esModule",{value:!0});var a=e(279),s=e.n(a);for(var i in a)["default","default"].indexOf(i)<0&&function(t){e.d(n,t,function(){return a[t]})}(i);var r=e(312),c=!1,d=e(4),l=o,u=d(s.a,r.a,!1,l,"data-v-26ac053b",null);u.options.__file="src/compontents/products/products_detail.vue",n.default=u.exports},279:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{title:"商品介绍",products_detail_error_flag:!1,goods_message:{}}},created:function(){var t=this;this.$axios.get("/api/goods/getdesc/"+this.$route.query.id).then(function(n){console.log(n.data.message),t.goods_message=n.data.message}).catch(function(n){t.products_detail_error_flag=!0,console.log(n)})},methods:{},components:{}}},310:function(t,n,e){var o=e(311);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(3)("30d35b15",o,!1,{})},311:function(t,n,e){n=t.exports=e(2)(!1),n.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},312:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{"margin-bottom":"60px"}},[e("nav-bar",{attrs:{title:t.title}}),t._v(" "),t.products_detail_error_flag?e("div",{staticStyle:{"text-align":"center","padding-top":"20px"}},[t._v("数据异常")]):t._e(),t._v(" "),t._l(t.goods_message,function(n,o){return t.products_detail_error_flag?t._e():e("div",{key:o,staticClass:"mui-card",staticStyle:{"box-shadow":"0 0 5px 2px #ccc","margin-top":"70px"}},[e("div",{staticClass:"mui-card-content"},[e("div",{staticClass:"mui-card-content-inner"},[e("h4",{staticStyle:{padding:"5px 0",float:"left","line-height":"20px"},domProps:{textContent:t._s(n.title)}}),t._v(" "),e("p",{staticStyle:{color:"#333",width:"100%",float:"left"},domProps:{innerHTML:t._s(n.content)}})])])])})],2)},a=[];o._withStripped=!0;var s={render:o,staticRenderFns:a};n.a=s}});