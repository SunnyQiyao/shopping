<template>
  <div>
      <swiper :options="swiperOption" class="swiper">
          <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
              <!--Slide{{item}}-->
              <div class="content">
                  很多内容
              </div>
          </swiper-slide>
          <!--添加分页器-->
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
   import 'swiper/dist/css/swiper.css'
   import {swiper,swiperSlide} from 'vue-awesome-swiper'
   export default{
       data(){
           return{
               slide:[1,2,3,4,5],
               swiperOption:{
                   pagination:{
                       el:'.swiper-pagination',  // 分页器元素
                       clickable:true   // 点击分页
                   },
                   direction:'vertical',   // 竖屏切换效果
                   slidesPerView:'auto',   // 设置同屏显示的数量，默认为1，auto为自动
                   freeMode:true, // 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
                   mousewheel:true,  // 开启滚轮控制swiper切换
                   loop:true,
                   autoplay:true
               }
           }
       },
       components:{swiper,swiperSlide}  // 注册组件才能使用
   } 
</script>

<style scoped>
    .swiper{
        height:7rem;
        overflow: hidden;
    }
   .swiper-slide{
       height: 7rem;
       line-height: 7rem;
       text-align: center;
       border-top: 1px solid #ccc;
       border-bottom: 1px solid #ccc;
       font-size: 12px;
       -webkit-box-sizing:border-box;
       box-sizing: border-box;
   }
</style>