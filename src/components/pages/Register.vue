<template>
    <div>
        <!--头部导航-->
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goback"
            />
         <!--登陆-->
         <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required    
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <!--required 会在前面加一个红色星号图标-->

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg" 
            />
            <!--error-message绑定错误提示信息。vant 里面的field组件提供绑定这个属性-->
         </div>
         <div class="register-btn">    <!--绑定按钮的Loading属性(为布尔值)，防止用户重复点击-->
             <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
         </div> 
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'   // 引入接口文件
    import {Toast} from "vant"                 //引入提示组件
    // Vue.use(Toast) 这个组件不需要use()，会报错
    export default{
        data(){
            return{
                username:'',
                password:'',
                openLoading:false,     //是否开启用户的Loading
                usernameErrorMsg:'',   //当用户名出现错误的时候，没有错误的时候不提示给空值
                passwordErrorMsg:''
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)  // 返回前一页
            },
            registerAction(){
                // if(this.checkForm()){ //如果验证是对的就调用注册方法，但这样写会显得比较臃肿
                //     this.axiosRegisterUser()
                // }
                this.checkForm() && this.axiosRegisterUser()
            },
            // axios 用户注册的方法  开始的时候直接绑定axiosRegisterUser方法，现在还要调用表单验证
            axiosRegisterUser(){
                this.openLoading=true  // 开始注册的时候就loading
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username, //这里的键userName要和用户表单userSchema里的保持一致，不然会报错;然后this.username要和上面data(){}里保持一致
                        // errmsg:"E11000 duplicate key error collection: smile-db.users index: userName_1 dup key: { : null }"
                        password:this.password  // 引用的是上面data()里的值，因为是双向数据绑定，表单数据改变就能获取到
                    }
                })
                .then((response)=>{
                    console.log(response) // data:{username: "sunny", password: "666666"}
                    // 如果返回code为200，代表注册成功，给用户做Toast提示
                    if(response.data.code==200){
                        Toast.success('注册成功')
                        this.$router.push('/main')
                    }else{
                        console.log(response.data.message)
                        Toast.fail('注册失败')
                        this.openLoading=false
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    this.openLoading=false
                })
            },
            // 前端方法写完之后，基本可以用了，但是此时点击“马上注册”，会报跨域的错误，让koa2支持跨域请求用koa2-cors中间件
            // 在一开始进入注册方法的时候，做的第一件事就是把注册按钮变成loading状态。然后在注册失败的时候取消loading状态，注册成功就跳转到个人中心页面（由于还没制作，先跳转到商城首页）。这样在前台就防止了重复提交。
        
           // 表单验证的方法  如果继续写再注册方法里面会比较臃肿
           checkForm(){
               let isOk=true 
               //默认是正确的，用这种开关的形式比直接错误的时候return false好，return false在前面一个条件不满足的时候后面的代码就直接不执行了。下面的提示也没有
               //这种方式一开始就会进行整体验证，给出提示    
               if(this.username.length<5){
                   this.usernameErrorMsg="用户名不能小于5位"
                   isOk=false
                // return false
               }else{
                   this.usernameErrorMsg=""   //正确的时候就不提示
               }
               if(this.password.length<6){
                   this.passwordErrorMsg="密码不能小于6位数"
                   isOk=false
               }else{
                   this.passwordErrorMsg=""
               }
               return isOk     //要将值返回
           }
       }
    }

    // 跨域
    // Failed to load http://localhost:3000//user/register: Response to preflight request doesn't pass access control check: 
    // No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
</script>

<style scoped>
    .register-panel{
        width: 96%;
        border-radius:5px;
        margin: 20px auto;
        padding-bottom: 80px;
    }
    .register-btn{
        padding-top:10px;
    }
</style>