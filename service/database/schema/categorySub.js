// 商品子类的Shema建立
const mongoose=require('mongoose')
const Schema=mongoose.Schema   //一定要先声明Schema。不然会报错：Schema is not defined

const categorySubSchema=new Schema({
    "ID":{unique:true,type:String},
    "MALL_CATEGORY_ID":{type:String},
    "MALL_SUB_NAME":{type:String},
    "COMMENTS":{type:String},
    "SORT":{type:Number}
})

mongoose.model('CategorySub',categorySubSchema)