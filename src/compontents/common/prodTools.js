let ProdTools={};

let store =window.localStorage;
let prods=JSON.parse(store.getItem('prods')||'{}');

// let prods= {"xx":3}; //未来从localStroage中获取
//{id:num}
//增加或追加
ProdTools.addOrUpdate=function(p){
    // 判断是否存在
    if(prods[p.id]){ //追加
      prods[p.id] += p.num;
    }else{
      prods[p.id] = p.num;
    }
    this.saveProds(prods);
}

//删除
ProdTools.delete=function(id){
    delete prods[id];
    this.saveProds(prods);
}

//获取
ProdTools.getProds=function(){
    return JSON.parse(store.getItem('prods')||'{}');;
}

//获取总数
ProdTools.getTotalCount=function(){
    let sum =0;
    for(let id in prods){
         sum+=prods[id];
    }
    return sum;
}

//存储
ProdTools.saveProds=function(prods){
  store.setItem('prods',JSON.stringify(prods));
}

export default ProdTools;