<!--商品列表页-->
<template>
    <div>
        <div class="navbar_title">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <!--左侧大类导航-->
                    <div id="left_nav">
                        <ul>
                            <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <!--右侧小类导航-->
                    <div class="right_nav">
                        <div class="tabCategorySub">
                            <van-tabs v-model="active" @click="clickCategotySub">
                                <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                                </van-tab>
                            </van-tabs>
                        </div>
                        <!--商品列表-->
                        <div id="goods_list">
                            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                                <van-list v-model="loading" :finished="finished" @load="onLoad" >
                                    <div class="list_item clearfix" v-for="(item,index) in goodList" :key="index" @click="goToGoods(item.ID)">
                                        <div class="list-item-img"> 
                                                                <!--vue中图片失效替补图片制作方法-->
                                            <img :src="item.IMAGE1" :onerror="errorImg" alt="" width="100%">
                                        </div>
                                        <div class="list-item-text">
                                            <div class="itemName">{{item.NAME}}</div>
                                            <div class="">¥{{item.ORI_PRICE|moneyFilter}}元</div>
                                        </div>
                                    </div>
                                </van-list>
                            </van-pull-refresh>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default{
        data(){
            return{
                category:[],
                categoryIndex:0,     //用来控制那个导航加上当前类
                categorySub:[],
                active:0,            //默认激活第一个标签
                loading:false,       //上拉加载
                finished:false,      //是否结束
                isRefresh:false,     //下拉刷新
                goodList:[] ,        //商品列表
                page:1,              //商品列表的页数     
                categorySubId:'',    //商品子类id
                errorImg:'this.src="'+require('@/assets/images/error.png')+'"'
            }
        },
        created(){
            this.getCategory()
        },
        mounted(){
            // 让左侧列表适应窗口高度  减去底部导航的50
             let winHeight = document.documentElement.clientHeight
             document.getElementById('left_nav').style.height=winHeight-46-50+'px'
             document.getElementById('goods_list').style.height=winHeight-90-50+'px'
        },
        methods:{
            //获取商品大类
            getCategory(){
                axios({
                    url:url.getCategoryList,
                    method:'get'
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200&&response.data.message){
                        this.category=response.data.message
                        // 默认显示第一个大类的子类
                        this.getCategorySubByCategoryId(this.category[0].ID)
                    }else{
                        Toast('服务器错误，读取数据失败')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            // 点击大类方法
            clickCategory(index,categoryId){ //点击大类的时候将点击的索引传递过去，然后赋给categoryIndex属性
                this.categoryIndex=index
                this.page=1
                this.finished=false
                this.goodList=[]
                this.getCategorySubByCategoryId(categoryId)
            },
            //根据商品大类获取商品小类
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200&&response.data.message){
                        this.categorySub=response.data.message
                        this.active=0  //当点击左边大类的时候默认选中小类的第一个
                        this.categorySubId=this.categorySub[0].ID   //获取小类ID，不然点击大类的时候读取不到小类列表数据
                        this.onLoad()   //加载数据
                    }else{
                        Toast('服务器错误，获取数据失败')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            //上拉加载
            onLoad(){
                setTimeout(()=>{
                    // 真实数据
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID;  //小类id不存在就默认显示第一个小类的数据
                    this.getGoodList()
                    // 测试用数据
                    // for(let i=0;i<10;i++){
                    //     this.list.push(this.list.length+1)
                    // }
                    // this.loading=false
                    // if(this.list.length>=40){
                    //     this.finished=true
                    // }
                },1000)
            },
            //下拉刷新
            onRefresh(){
                setTimeout(()=>{
                    this.isRefresh=false
                    this.goodList=[]
                    this.page=1
                    this.onLoad() //刷新之后仍然需要可以下拉加载
                    this.finished=false   //因为在上拉加载里面当大于40的时候会停止加载，刷新完后需要重置，不然没法下拉
                },500)
            },
            // 获取小类的商品列表
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId,
                        page:this.page
                    }
                })
                .then((response)=>{
                    console.log(response)
                    if(response.data.code==200&&response.data.message.length){
                        this.page++;
                        this.goodList=this.goodList.concat(response.data.message) //数据合并
                    }else{
                        this.finished=true   //如果没有数据了，说明结束
                    }
                    this.loading=false
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            // 点击小类的tab获取子类ID，并进行初始化
            clickCategotySub(index,title){
                this.categorySubId=this.categorySub[index].ID
                console.log(this.categorySubId)
                this.goodList=[]  //点击不同的小类的时候初始化数据
                this.finished=false
                this.page=1    //每个子类都是从第一页开始
                this.onLoad()
            },
            // 点击列表商品，跳转到商品详情页，传递一个id参数
            goToGoods(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
                // this.$router.push({path:'Goods',query:{goodsId:id}})
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        }
    }
</script>

<style scoped> 
#left_nav{
    background-color: aliceblue;
}
#left_nav ul li{
    line-height: 2.3rem;
    border-bottom: 1px solid #E4E7ED;
    font-size: 0.8rem;
    text-align:center;
    padding: 3px;
}
.categoryActive{
    background-color:#fff;
}
#goods_list{
    background-color:#fff;
    overflow:scroll;
}
.list_item{
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
    
}
.list-item-img{
    flex: 8;
}
.list-item-text{
    flex: 16;
    margin-top:10px;
    padding-left: 10px;
}

</style>