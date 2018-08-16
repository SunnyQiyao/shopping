// appApi 放的都是前端使用的接口程序文件
// koa2用户操作的路由模块化

// 引入需要的模块
const Router=require('koa-router')
let router=new Router()
const mongoose=require('mongoose') //引入mongoose，这样就可以操作schema了

// 配置路由
router.get('/',async(ctx)=>{
    //ctx.body('这是用户操作首页')  // 错误，ctx.body= 是赋值操作
    ctx.body="这是用户操作首页"
})

// router.get('/register',async(ctx)=>{
//     // ctx.body('这是用户注册接口')
//     ctx.body="这是用户注册接口"
// })

// 改成post请求 注册
router.post('/register',async(ctx)=>{
    // ctx.body=ctx.request.body;  //ctx.request.body后端接收到前端返回的数据,再返还给前端
    console.log(ctx.request.body)
    // node index.js执行后打印结果为对象，service is starting { username: 'sunny', password: '666666' } 

    // 得到model
    const User=mongoose.model('User')
    // 将从前端接收的post数据封装成一个新的User对象
    let newUser=new User(ctx.request.body)
    // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{ // 异步操作
        // 成功的话返回code=200，并返回成功的信息
        ctx.body={
            code:200,
            message:"注册成功"
        }
    }).catch(error=>{
        // 失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })

})

// 登录的Api接口
router.post('/login',async(ctx)=>{
    let loginUser=ctx.request.body;
    console.log(loginUser)
    let username=loginUser.userName
    let password=loginUser.password
    // 引入user的model
    const User=mongoose.model('User')
    // 查找用户名是否存在，如果存在就开始比对密码
    await User.findOne({userName:username}).exec().then(async(result)=>{
        console.log(result)
        if(result){  
            // 如果查到有结果说明用户名存在
            console.log(User)
            // 当用户名存在的时候开始比对密码
            let newUser=new User() //因为是实例方法，所以要new出对象才能使用
            await newUser.comparePassword(password,result.password) //一个数据库密码，一个传进来的密码
            .then((isMatch)=>{ //如果比对没有错误返回比对结果
                ctx.body={code:200,message:isMatch}
            })
            .catch((error)=>{
                // 出现异常返回异常
                console.log(error)
                ctx.body={code:500,message:error}
            })
        }else{
            // 如果用户名不存在
            ctx.body={code:200,message:'用户名不存在'}
        }
    }).catch(error=>{  // 没有查到结果
        console.log(error)
        ctx.body={code:500,message:error}
    })
})

// 暴露接口
module.exports=router

