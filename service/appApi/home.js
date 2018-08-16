const Router=require('koa-router')
let router=new Router()

// get请求配置路由
router.get('/',async(ctx)=>{
    ctx.body="这是首页接口"
})

module.exports=router

