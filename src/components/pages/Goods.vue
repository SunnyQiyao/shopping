<!--商品详情页面-->
<template> 
    <div>
        <div class="navBar">
            <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="topImg">
            <img :src='goodsInfo.IMAGE1' alt="" width="100%">
        </div>
        <div class="detail_title">{{goodsInfo.NAME}}</div>
                                                    <!--格式化价格，加竖线-->
        <div class="detail_price">¥{{goodsInfo.PRESENT_PRICE|moneyFilter}}元</div> 
        <div>
            <!--swipeable:是否可以滑动内容切换;sticky:吸顶效果-->
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail_con" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="商品评价">
                    待写
                </van-tab>
            </van-tabs>
        </div>
        <div class="detail_bottom">
            <div>
                <van-button type="primary" size="large" plain @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button type="danger" size="large" plain>直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    import { toMoney } from "@/filter/moneyFilter.js"
    export default{
        data(){
            return{
               goodsId: '',
               goodsInfo:{}  //商品详细信息
            }
        },
        methods:{
            getInfo(){
                axios({
                    url:url.getDetailGoodsInfo,
                    // methods:'post', 写错单词，找了一天
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(response=>{
                     console.log(response)
                     if(response.data.code==200&&response.data.message){
                        this.goodsInfo=response.data.message
                     }else{
                         Toast('服务器错误，数据获取失败')
                     }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            addGoodsToCart(){
                //取出本地购物车内的商品数据
                let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[]
                // 判断购物车内是否已经有这个商品。如果没有就返回undefined，如果有就返回第一个查找的数据
                let isHaveGoods=cartInfo.find(cart=>cart.goodsId==this.goodsId)
                console.log(isHaveGoods)
                if(!isHaveGoods){ //没有商品就直接添加到数组中
                    // 重新组成加入到购物车的商品的信息
                    let newGoodsInfo={
                        goodsId:this.goodsInfo.ID,
                        name:this.goodsInfo.NAME,
                        price:this.goodsInfo.PRESENT_PRICE,
                        image:this.goodsInfo.IMAGE1,
                        count:1
                    }
                    cartInfo.push(newGoodsInfo)   //添加到购物车
                    localStorage.cartInfo=JSON.stringify(cartInfo)
                    Toast.success('添加成功')
                }else{
                    Toast.fail('已有此商品')
                }
                this.$router.push('/cart')
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created(){
            this.goodsId=this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId  //先接收goodsInfoComponent.vue中传递的参数
            console.log(this.goodsId)
            this.getInfo()
        }
    }
</script>

<style scoped>
.detail_title{
    text-align:center;
}
.detail_price{
    text-align:center;
}
/*因为img标签之间是有空格的，所以会导致图片之间有空隙，设置外层包裹的字体为0解决*/
.detail_con{
    font-size: 0;
}
.detail_bottom{
    background-color: #fff;
    padding: 2%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
.detail_bottom div{
    width: 48%
}
.detail_bottom div:nth-child(1){
    float:left;
}
.detail_bottom div:nth-child(2){
    float:right;
}
</style>

