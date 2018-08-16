<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goback"
        />
        <div class="login-field">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </div>
        <div class="login-btn">
            <van-button size="large" type="primary" @click="axiosLoginUser" :loading="openLoading">用户登录</van-button>
        </div>
    </div>
</template>

<script>
    import url from "@/serviceAPI.config.js"
    import axios from "axios"
    import { Toast } from 'vant'
    export default{
        data(){
            return{
                username:'',
                password:'',
                openLoading:false
            }
        },
        created(){ //一进入页面就判断，本地数据库有没有用户信息，如果有提示用户已登录，直接到首页
            if(localStorage.userInfo){
                Toast.success('此账号已登录')
                this.$router.push('/main')
            }
        },
        methods:{
            goback:function () {                
                this.$router.go(-1)           
             },
            LoginAction(){ 
                this.checkForm() && this.axiosLoginUser()
            },
            // 用户登陆
            axiosLoginUser:function(){
               this.openLoading=true;
               axios({
                    url:url.loginUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
               })
               .then((response)=>{
                   console.log(response)
                   if(response.data.code==200&&response.data.message){
                    // 为了防止用户登陆成功之后反复登陆，将用户的用户名存储到本地数据库
                       new Promise((resolve,reject)=>{//异步操作，等待本地存储完成之后再做后面的操作
                        //    localStorage.userInfo({userName:this.username})  //写法错误
                           localStorage.userInfo={userName:this.username}
                           setTimeout(function() {//因为localStorage没有回调函数和await/async等，所以等待半秒，应该存储完成
                               resolve()
                           }, 500);
                       }).then(()=>{
                           Toast.success('登录成功')
                           this.$router.push('/main')
                       }).catch(err=>{
                           Toast.fail('登陆状态保存失败')
                           console.log(err)
                       })
                   }else{
                       Toast.fail('登录失败')
                       this.openLoading=false
                   }
               })
               .catch((err)=>{
                   console.log(err)
                   Toast.fail('登录失败')
                   this.openLoading=false
               })
            },
            //**** 客户端验证
            checkForm(){
                let isOk= true
                if(this.username.length<5){
                    this.usernameErrorMsg="用户名不能小于5位"
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            }       
        }
    }
</script>

<style scoped>
    .login-field{
        padding:30px 10px;
    }
    .login-btn{
        padding:0 10px 30px;
    }
</style>