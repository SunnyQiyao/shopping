// mongoose连接数据库

// 连接数据库文件
const mongoose=require('mongoose')
const db = "mongodb://localhost/smile-db"
//  const db="mongodb://localhost2/smile-db";  此时就会连接失败

const glob=require('glob')     // node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件
const {resolve}=require('path')  // 将一系列路径或路径段解析为绝对路径。在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。
//const resolve=require('path')    // 错误写法，会报错
mongoose.Promise =  global.Promise

// 暴露对外的接口
exports.initSchemas=()=>{
    // 同步引入，forEach遍历将里面所有的schema都引过来
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

// 将connect暴露出去
exports.connect=()=>{
    // 连接数据库
    mongoose.connect(db)
    // 一般数据库连接失败，会进行重新连接，但是重连也需要一个次数，不然连接错误一直重连，服务器会爆了，
    // 假设3次连接失败就在服务端抛出异常
    let maxConnectTimes=0  // 声明最大连接数

    // 为了确保先连接数据库之后再做其他事情，需在外层增加返回一个Promise，做异步操作，使代码健壮起来，
    // 当数据库正常连接的时候才往下执行， 如果连接不正常就不往下执行了，防止数据库还在连接，程序就已经往下执行了
    return new Promise((resolve,reject)=>{   // 成功的时候执行resolve();失败的时候执行reject()

        // 增加数据库连接的事件监听
        mongoose.connection.on('disconnected',()=>{
            console.log('********数据库断开*********');
            if(maxConnectTimes<3){
                // 当连接断开时，我们需要把连接次数加1，并重新连接数据库。
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                // 当重连次数超过3次后，我们抛出了异常，并用reject()通知了promise。
                reject();
                throw new Error('程序无法搞定，请人为修理......')   // 抛出异常
            } 
        })

        // 数据库出现错误的时候
        mongoose.connection.on('error',err=>{
            console.log('***********数据库错误***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db);
            }else{
                reject(err);  // 返回错误值
                throw new Error("数据库出现问题，程序无法搞定，请人为修理......")
            }
        })

        // 连接打开的时候
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected successfully')
            resolve()
        })
    })
}
  
