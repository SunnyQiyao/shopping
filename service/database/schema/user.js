// 1.schame 是一种以文件形式存储的数据库模型骨架，无法直接通往数据库底端，也就是说它不具备
// 对数据库的操作能力，是以key-value形式的json格式的数据
// 2.model 是具备表操作能力的集合，定义完scheme之后要放在model上发布
// 3.entity 类似记录。由model创建的实体，也具备表的操作能力

const mongoose=require('mongoose');  // 引入mongoose
const Schema=mongoose.Schema;        // 声明Schema
let ObjectId=Schema.Types.ObjectId;  // 主键，声明 Objected 类型

// 一有新增的时候就要用加盐加密处理
const bcrypt=require('bcrypt')
const SALT_WORK_FACTOR=10;   // 加盐的强度,数字 1-99，加盐10足够用

// user.js要和表的名字一样
// 创建用户表单schema,描述此集合里有哪些字段，字段是什么类型
const userSchema=new Schema({
    UserId:{type:ObjectId},  // mongoDB的id类型 或者简写：UserId：ObjectId
    userName:{unique:true,type:String},  // unique:true userName不重复
    password:String,
    creatAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{
    collection:'User'
})

// 每次存储数据时都要执行，执行成功的时候执行next 静态方法：有schema就能用
userSchema.pre('save',function(next){   
    // bcrypt提供的方法，加盐
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)   //如果加盐失败，返回err
        bcrypt.hash(this.password,salt,(err,hash)=>{ //加盐成功，再用hash算法对密码进行加密
            if(err) return next(err)   // 如果有错误
            this.password=hash         // 如果加密成功，将密码置为加盐加密的值，this指userSchema
            next()        // 处理完成
        })
    }) 
})

// 实例方法：需要new才能用，在Api中。密码比对,一个客户端密码，一个数据库密码。用bcrypt提供的compare方法就可以比对，最后包装成Promise返回就可以了
userSchema.methods={ 
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)   // 如果没有错误返回isMatch的值,布尔值true或者false
                else reject(err)
            })
        })
    }
}

// 发布模型
mongoose.model('User',userSchema);  //到数据库中会变成Users,如果还是想使用自己配置的，直接创建的时候加collection就行了
