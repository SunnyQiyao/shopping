const Koa =require('koa')   // 前面Koa 可以大写也可以小写，习惯前面大写
const app=new Koa()
const mongoose=require('mongoose')  // 因为要操作数据库所以先引入
const {connect,initSchemas}=require('./database/init.js') // 引入connect
const bodyparser=require('koa-bodyparser')   // 接收post请求
const cors=require('koa2-cors')         // 后端解决跨域问题

const Router=require('koa-router')

let user=require('./appApi/user.js')   // 引入user.js模块
let home=require('./appApi/home.js')
let goods=require('./appApi/goods.js')

app.use(bodyparser())  //注册中间件，这个时候后台就能接收到前台post传递的数据了
app.use(cors())

// 装在所有子路由
let router=new Router()
router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/goods',goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


// 立即执行函数 连接数据库   // 做到“用户注册数据库操作”时要开启这段数据库代码，不然会报错,另外服务器代码放在准备代码之前
;(async()=>{    
    await connect()
    initSchemas()  // 载入schema初始化

    // const User=mongoose.model('User')   // 有了User模型
    // // 插入一条数据
    // let oneUser=new User({userName:'sunny5',password:'123456'})
    // oneUser.save().then(()=>{    //因为是promise对象，所以可以直接用then
    //     console.log('插入成功')
    // })
})()  // 终端里使用node index.js执行一下，可以看到数据库已经连接成功了node 




// 相当于根目录的路由。
// 所有的路由都写在service/idnex.js里显然不是正确的选择，这会导致我们的index.js页面越来越臃肿，
// 最后变的没办法维护。我们需要把Koa程序模块化，我们也叫做路由模块化。单独放在appApi里面，也可以叫controller
app.use(async(ctx)=>{
    ctx.body='<h1>hello Koa2</h1>'
})
app.listen(3000,()=>{
    console.log('service is starting at port 3000')
})

// http://127.0.0.1:3000/  在地址栏打开


