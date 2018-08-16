// 商品大类的schema
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const categorySchema=new Schema({
    "ID": {uqique:true,type:String},
    "MALL_CATEGORY_NAME": String,
    "IMAGE": String,
    "TYPE": Number,
    "SORT": Number,
    "COMMENTS": String
})
// 发布
mongoose.model('Category',categorySchema)