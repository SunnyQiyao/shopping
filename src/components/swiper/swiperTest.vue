<template>
    <div>
        <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="test">
                <div class="content">
                     学了两节的vue-awesome-swiper这节课回归正题，删除这些swiper组件，
                     这节课我们主要完成楼层区域的布局。楼层这里是有两个最基本的需求的，
                     第一个是前三图是不规则形状，后边的是规则并且能根据数量自动增长的。
                     学了两节的vue-awesome-swiper这节课回归正题，删除这些swiper组件，
                     这节课我们主要完成楼层区域的布局。楼层这里是有两个最基本的需求的，
                     第一个是前三图是不规则形状，后边的是规则并且能根据数量自动增长的。
                      这节课我们主要完成楼层区域的布局。楼层这里是有两个最基本的需求的，
                     第一个是前三图是不规则形状，后边的是规则并且能根据数量自动增长的。
                      这节课我们主要完成楼层区域的布局。楼层这里是有两个最基本的需求的，
                     第一个是前三图是不规则形状，后边的是规则并且能根据数量自动增长的。
                      这节课我们主要完成楼层区域的布局。楼层这里是有两个最基本的需求的，
                     第一个是前三图是不规则形状，后边的是规则并且能根据数量自动增长的。
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
// 在移动布局里，在大段文章的下拉上拉时，有些老旧手机会有卡顿效果。
// 都需要我们自己加入上划下拉的组件，这里就可以直接使用vue-awesome-swiper来解决。
// 给文字加入顺畅的下拉上拉效果
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default{
        data(){
            return{
                swiperOption:{
                    direction:'vertical',
                    slidesPerView:'auto',
                }
            }
        },
        components:{
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
   .swiper{
       height: 300px;
       overflow:hidden;
   }
   .test{
       font-size: 16px;
       padding: 30px;
       height: auto;
       text-align:left;
       box-sizing: border-box;
   }
</style>