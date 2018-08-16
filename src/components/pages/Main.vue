<template>
    <div>
        <div class="main_nav">
            <!--<keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。-->
            <keep-alive>
                <!--将子页面放在这里显示-->
                <router-view></router-view>
            </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                active: 0
            }
        },
        created(){
            this.changeTabActive()
        },
        updated(){
            this.changeTabActive()
        },
        methods:{
            changeTabbar(active){
                console.log(active)
                switch (active) {
                    case 0:
                        //使用name跳转，因为路径有时候会改变，这样就需要改编程式导航，比较麻烦
                        this.$router.push({name:'ShoppingMall'})
                        break;
                    case 1:
                        this.$router.push({name:'categoryList'})
                        break
                    case 2:
                        this.$router.push({name:'Cart'})
                        break
                    case 3:
                        this.$router.push({name:'UserCenter'})
                    default:
                        break;
                }
            },
            changeTabActive(){
                // 当未通过点击导航而是通过编程式导航进入到购物车页面时，底部导航不会实时变化，这个时候需要跟踪获取路径，从而改变导航
                // 保证在初始化和页面更新的时候都会跟随变化
               this.nowPath=this.$route.path  //vue提供的方法
               if(this.nowPath=='/cart'){
                   this.active=2
               }
            }
        }
    }
</script>