<!--r-->
<template>
    <div class="goods-info" @click="goGoodsPage">
        <div class="goods-image">
           <img v-lazy="goodsImage" width="90%">
        </div>
        <div class="goods-name">
            {{goodsName}}
        </div>   <!--过滤器直接使用，不用加参数-->
        <div class="goods-price">￥{{ goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import { toMoney } from "@/filter/moneyFilter.js"
    export default{
        // 接收goodsId
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods:{
            goGoodsPage(){  //跳转页面方法：name是路由中的name；this.$router.push()传参,query传参,Goods.vue中接收
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
            }
        }
    }
</script>

<style scoped>
   .goods-name{
       padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>