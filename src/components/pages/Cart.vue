<template>
    <div>
        <div class="nav_bar">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="clear_list">
            <van-button size="small" type="danger" @click="clearList">清空购物车</van-button>
        </div>
        <div class="cart_list" v-for="(list,index) in cartInfo" :key="index">
            <div class="cart_row">
                <div class="cart_img">
                    <img :src="list.image" alt="" width="100%">
                </div>
                <div class="cart_text">
                    <div class="cart_name">{{list.name}}</div>
                    <div class="price_stepper clearfix">
                        <div class="cart_price">
                            <div>¥ {{list.price|moneyFilter}} 元</div>
                            <div>x{{list.count}}</div>
                        </div>
                        <van-stepper v-model="list.count" class="count_num"/>
                    </div>
                    <div class="all_price">¥ {{list.price*list.count | moneyFilter}} 元</div>
                </div>
            </div>
        </div>
        <div class="totalMoney">总计: ¥ {{totalMoney | moneyFilter}} 元 </div>
    </div>   
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default{
        data(){
            return{
                cartInfo:[],     //购物车内的方法
                isEmpty:false,   //购物车是否为空，不为空则显示true，为空则显示false
                allMoney:0
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created(){
            this.getCartInfo()
        },
        methods:{
            // 得到购物车数据
            getCartInfo(){
                // 先判断本地有没有数据
                if(localStorage.cartInfo){//localStorage获取的是字符串
                    this.cartInfo=JSON.parse(localStorage.cartInfo)
                }
                console.log('this.cartInfo:'+JSON.stringify(this.cartInfo))
                this.isEmpty=this.cartInfo.length>0?true:false
            },
            clearList(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            }
        },
        computed:{
            totalMoney(){
                let allMoney=0
                this.cartInfo.forEach((item,index)=>{
                    allMoney+=item.price*item.count
                });
                // 将购物车信息存储起来，避免刷新的时候操作（增加的数量）丢失
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return allMoney
            }
        }
    }
</script>

<style scoped>
.clear_list{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
}
.cart_list{
    background-color: #fff;
}
.cart_row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}
.cart_img{
    flex: 6;
}
.cart_text{
    flex: 18;
    padding-left:10px;
}
.price_stepper{
    margin-top: 20px;
}
.cart_price{
    float: left;
}
.count_num{
    float: right;
}
.all_price{
    margin-top: 5px;
    color: red;
}
.totalMoney{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding: 5px;
}
</style>