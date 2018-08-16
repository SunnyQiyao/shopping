// 在开发中我们现在直接把数据接口文件写到了axios中，这样写如果地址改变或者接口改变，我们需要进入业务逻辑代码进行修改，维护起来会非常的麻烦。
// 把项目中用到的接口都单独拿出来，作一个接口配置文件serviceAPI.config.js。
// module.exports 将地址暴露出去，在要使用的地方通过import的形式引入

// const baseurl="https://www.easy-mock.com/mock/5aeaa8b7da989d525636814f/SmileVue/";
// const URl={
//     getShoppingMallInfo:baseurl+'index',
//     getGoodsInfo:baseurl+'getGoodsInfo'
// }
// module.exports = URL;       //会报错

const baseurl="https://www.easy-mock.com/mock/5aeaa8b7da989d525636814f/SmileVue/";
const localurl="http://localhost:3000/"
module.exports={
    getShoppingMallInfo:baseurl+'index',  //商城首页所有信息
    getGoodsInfo:baseurl+'getGoodsInfo',
    registerUser:localurl+'user/register',  //用户注册接口
    loginUser:localurl+'user/login',
    getDetailGoodsInfo:localurl+'goods/getDetailGoodsInfo', // 商品详情接口
    getCategoryList:localurl+'goods/getCategoryList',       // 商品大类列表接口
    getCategorySubList:localurl+'goods/getCategorySubList',  //商品小类
    getGoodsListByCategorySubID:localurl+'goods/getGoodsListByCategorySubID'  //小类商品对应的列表商品
}

