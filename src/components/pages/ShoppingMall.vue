<!--首页-->
<template>
<!--外面必须包一层div-->
    <div>
        <!--搜索区域-->
        <div class="search-bar">   
            <van-row class="test-row">
                <van-col span="3" class="icon-out">
                    <img :src="locationIcon" alt="" width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" name="" value="" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini" class="search-btn">查找</van-button>
                </van-col>
            </van-row>
        </div>

        <!--轮播图-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img :src="banner.imageUrl" width="100%"/>
                    <img v-lazy="banner.image" width="100%"/>  
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--<swiperDemo :bannerPicArray="bannerPicArray"></swiperDemo>-->
        
        <!--type bar 类别导航-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>

        <!--adBanner area 广告条-->
        <div class="ad-banner">
           <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>

        <!--recommend goods area 商品推荐-->
        <div class="recommend-area"> 
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
               <swiper :options="swiperOption">
                  <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                      <div class="recommend-item">
                         <img :src="item.image" alt="" width="80%">
                         <div>{{item.goodsName}}</div>
                         <!--格式化价钱-->
                         <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                      </div>
                  </swiper-slide>
               </swiper>
            </div>
        </div>
        <!--父组件向子组件传参-->
        <floorComponent :floorData="floor1" :floorTitle="floorTitle.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorTitle.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorTitle.floor3"></floorComponent>
        <!--1F floor one area-->
        <!--<div>
           <div class="floor-title">
              <span>1F</span>
              <span>休闲食品</span>
           </div>
           <div class="floor-content">
               <div class="floor-one">
                   <img :src="this.floor1_0.image" alt="" width="100%">
               </div>
               <div>
                   <div class="floor-two">
                       <img :src="this.floor1_1.image" alt="" width="100%">
                   </div>
                   <div>
                       <img :src="this.floor1_2.image" alt="" width="100%">
                   </div>
               </div>
           </div>
        </div>-->
        <!--左右两列布局 slice（start,end）从开始的位置截取到结束位置，不包括结束位置。结束位置没有，自动从开始位置截取到最后-->
        <!--<div class="floor-rule">
            <div v-for="(item,index) in floor1.slice(3)" :key="index">
                <img :src="item.image" alt="" width="100%">
            </div>
        </div>-->
 
        <!--hot area 热门商品-->
        <div class="hot-area">
           <div class="hot-title">热卖商品</div>
           <div class="hot-goods"> 
               <!--list组件 可以做上拉加载下拉刷新效果-->
               <van-list>
                   <van-row gutter="20">  <!--gutter 列元素之间的间距（单位为px）-->
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <!--<div class="goods-info">{{item.name}}</div>--> 
                            <goodsInfo :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goodsInfo>
                        </van-col>
                    </van-row>
               </van-list>
           </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import floorComponent from '../component/floorComponent'
//   import swiperDefault from '../swiper/swiperDefault'
//   import swiperDefault2 from '../swiper/swiperDefault2'
//   import swiperTest from '../swiper/swiperTest'
//   import swiperDemo from '../component/swiperDemo'
  import { toMoney } from '@/filter/moneyFilter.js'
  import goodsInfo from '../component/goodsInfoComponent'
  import url from '@/serviceAPI.config.js'  // 公共的地址  url名字自己取，但是下面 axios({})里要用
//   const url=require('../../serviceAPI.config.js')
//   console.log(url)

  // 以组件形式引入 vue-awesome-swiper
  import 'swiper/dist/css/swiper.css'
  import { swiper,swiperSlide } from 'vue-awesome-swiper'

  export default {
      data(){
          return{
            swiperOption:{
                slidesPerView:3     // 分成3栏
            },
            msg:'Shopping Mall',
            locationIcon:require('../../assets/images/location.png'),
            bannerPicArray:[],
            category:[],
            adBanner:'',
            recommendGoods:[],
            // 先声明再取数据。下面用到的数据都要先声明
            floor1:[],        // 楼层1的数据
            // floor1_0:{},
            // floor1_1:{},
            // floor1_2:{}
            floor2:[],         // 楼层2的数据
            floor3:[],
            floorTitle:{},
            hotGoods:[]
          }
      },
      components:{
          swiper,
          swiperSlide,
          floorComponent,
        //   swiperDemo,
          goodsInfo
      },
      filters:{
          moneyFilter(money){
              return toMoney(money) //filter的名字可以随便取，但是用的toMoney方法，要和引入的一样
                                     //  直接用在使用价格的地方
        }
      },
      created(){
          axios({
            //    url:' https://www.easy-mock.com/mock/5aeaa8b7da989d525636814f/SmileVue/index',
              url:url.getShoppingMallInfo,
              method:'get'
          })
          .then(response=>{
              console.log(response);
              if(response.status==200){
                  this.bannerPicArray=response.data.data.slides,
                  this.category=response.data.data.category,
                  this.adBanner=response.data.data.advertesPicture,
                  this.recommendGoods=response.data.data.recommend
                  this.floor1=response.data.data.floor1,   // 获取1楼的数据
                  this.floor2=response.data.data.floor2,
                  this.floor3=response.data.data.floor3,
                  this.floorTitle=response.data.data.floorName,
                //   this.floor1_0=this.floor1[0],
                //   this.floor1_1=this.floor1[1],
                //   this.floor1_2=this.floor1[2]
                  this.hotGoods=response.data.data.hotGoods
              }
          })
          .catch((error)=>{
              console.log(error)
          })
      }
  }
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.search-bar{
    height: 2.2rem;
    background-color: #e5017d;
}
.test-row{
    text-align:center;
}
.icon-out{
    height: 2.2rem;
}
.location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
}
.search-input{
    width: 100%;
    height: 1.8rem;
    border: none;
    border-bottom:1px solid #fff;
    background-color: #e5017d;
}
.search-btn{
    margin-top: .6rem;
}
.swiper-area{
    width: 20rem;
    overflow:hidden;
    clear:both;
    /*懒加载刚开始页面未加载出来的时候会高度移除*/
    max-height: 15rem;
}
.type-bar{
    background-color:#fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    /*flex布局*/
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div{
   padding:.3rem;
   font-size: 12px; 
   text-align: center;
   flex: 1;
}
.recommend-area{
    background-color: #fff;
    margin-top: .3rem;
}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #e67655;
    padding: 0.2rem;
}
.recommend-body{
    border-bottom: 1px solid #eee;
}
.recommend-item{
    width: 91%;
    border-right: 1px solid #eee;
    text-align: center;
    font-size: 12px;
}
.hot-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #eee;
    padding: 0.2rem;
    text-align: center;
    color: #e67655;
    font-size: 14px;
}
.hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
}
.hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
</style>