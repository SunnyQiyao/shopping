// 商品操作的API
const Router=require('koa-router')  //这里要用到的是koa-router ，vue-router没有下面的方法，所以会报router.get is not a function
let router=new Router()
const mongoose=require('mongoose')
const fs=require('fs')

// 配置路由。导入数据
// 导入商品详情数据到数据库。因为这里只是在数据校验的时候输入网址确定数据有没有插入成功，所以不用post
router.get('/insertAllGoodsInfo',async(ctx)=>{ 
    fs.readFile('./data_json/newGoods.json','utf8',function(err,data){
        const newData=JSON.parse(data)
        let saveCount=0
        const Goods=mongoose.model('Goods') //将goods的schema模型引入过来
        newData.map((value,index)=>{
            let newGoods=new Goods(value) //创建对象，传入value值
            newGoods.save().then(()=>{ //用mongoose的save()方法存储数据到mongoDB数据库
                saveCount++
                console.log('成功'+saveCount)    //数据保存成功
            }).catch(err=>{
                console.log('失败'+err)          //数据保存失败  
            })
        })
    })
    ctx.body='开始导入数据到数据库'
})
// http://localhost:3000/goods/insertAllGoodsInfo

// 导入商品大类数据到数据库
router.get('/insertAllCatgory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let savecount=0
        const Category=mongoose.model('Category') //引入商品大类的Schema模型
        data.RECORDS.map(function(value,index){
            console.log(value)
            let newCategory=new Category(value)  //将value值包装成对象，就可以直接用save()方法保存
            newCategory.save().then(()=>{
                savecount++
                console.log('成功保存'+savecount+'条数据')
            }).catch((err)=>{
                console.log('失败'+err)
            })
        })
    })
    ctx.body="开始导入商品大类数据"  //如果不写会报404
})
// http://localhost:3000/goods/insertAllCatgory

// 导入商品子类的数据到数据库
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        const newData=JSON.parse(data)
        // 导入商品子类Schema
        const CategorySub=mongoose.model('CategorySub')
        let count=0
        // 因为数据集合是数组，所以遍历取出数据
        newData.RECORDS.map(function(value,index){
            // 将value值包装成对象
            let newCategorySub=new CategorySub(value)
            newCategorySub.save().then(()=>{
                  count++
                  console.log('成功保存数据'+count)
            }).catch(err=>{
                console.log('保存失败'+err)
            })
        })
    })
    ctx.body="开始导入商品子类数据"
})
// http://localhost:3000/goods/insertAllCategorySub


// 编写接口
// 将路由加入到index.js中之后，在浏览器查看http://localhost:3000/goods/insertAllGoodsInfo，
// ,运行结束后，可以到数据库看一下插入情况。

// 获取商品详情的接口
// router.post('/getDetailGoodsInfo',async(ctx)=>{
//     let goodsId=ctx.request.body.goodsId  //从前端得到的参数goodsId
//     const Goods=mongoose.model('Goods')   //得到Goods模型 
//     await Goods.findOne({ID:goodsId}).exec()  //用模型的findOne方法查找数据，查找出来进行返回
//     .then(async(result)=>{
//         ctx.body={code:200,message:result}
//     })
//     .catch(err=>{
//         console.log(err)
//         ctx.body={code:500,message:err}
//     })
// })
// 商品详情的接口（从热卖商品点进去的商品详情）
router.post('/getDetailGoodsInfo',async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        // console.log(goodsId)
        let result= await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

// 商品大类数据接口
router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category=mongoose.model('Category')
        let result=await Category.find().exec()  //得到所有的数据
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
// http://localhost:3000/goods/getCategoryList 打开浏览器进行测试

// 商品小类数据接口
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let categoryId=ctx.request.body.categoryId   //后端得到前端post请求来的数据
        // let categoryId=1                               //测试，先声明大类的id，因为小类的商品是根据大类得到
        const CategorySub=mongoose.model('CategorySub')
                                     // 查询条件是：大类的id为请求过来的id
        let result=await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
// http://localhost:3000/goods/getCategorySubList

// 根据商品子类别获取对应的商品列表（从前台接收两个数据categorySubId（子类ID号）和page（当前页数））
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let categorySubId=ctx.request.body.categorySubId  //商品子类ID
        // let categorySubId='2c9f6c946016ea9b016016f79c8e0000' //测试
         let page=ctx.request.body.page //当前页数
         let num=10                     //每页显示的数量
         let start=(page-1)*num         //每页开始的位置
         const Goods=mongoose.model('Goods')
                        // 查询条件：子类的id                 跳过多少开始 每页限制数
         let result=await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
         ctx.body={code:200,message:result}
    }catch(err){
         ctx.body={code:500,message:err}
    }
})
// http://localhost:3000/goods/getGoodsListByCategorySubID


//将router暴露出去
module.exports=router
