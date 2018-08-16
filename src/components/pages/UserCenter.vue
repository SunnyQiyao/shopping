<template>
    <div class="userCenter">
        <div class="topImg">
            <img src="@/assets/images/default.png" alt="">
        </div>
        <div class="loginRegedit clearfix">
            <van-button type="default" class="login" @click="goLogin">登录</van-button>
            <van-button type="primary" class="regedit" @click="goRegister">注册</van-button>
        </div>
        <div class="myInfos">
            <ul>
                <li>
                    <span>会员卡</span>
                    <van-icon name="arrow" class="arrow"/>
                </li>
                <li>
                    <span>地址管理</span>
                    <van-icon name="arrow" class="arrow"/>
                </li>
                <li>
                    <span>我的订单</span>
                    <van-icon name="arrow" class="arrow"/>
                </li>
                <li>
                    <span>会员权益</span>
                    <van-icon name="arrow" class="arrow"/>
                </li>
                <li>
                    <span>联系我们</span>
                    <van-icon name="arrow" class="arrow"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                message:'会员中心'
            }
        },
        methods:{
            goLogin(){
                this.$router.push('/Login')
            },
            goRegister(){
                this.$router.push('/Register')
            }
        }
    }
</script>

<style scoped>
.userCenter{
    background-color: #fff;
}
.topImg{
    width: 100%;
    height: 100px;
    background-color: skyblue;
    text-align: center;
}
.topImg img{
    width: 50px;
    height: 50px;
    margin-top: 25px;
}
.loginRegedit{
    padding: 10px 20%;
}
.login,.regedit{
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.login{
    float: left;
}
.regedit{
    float: right;
}
.myInfos{
   margin-top: 20px;
}
li{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #f0f0f0;
}
li span{
    font-size: 0.8rem;
    color: #666;
    float:left;
}
li .arrow{
    float: right;
    vertical-align: middle;
    margin-top: 10px;
}
</style>