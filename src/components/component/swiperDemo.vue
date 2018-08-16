<template>
   <div>
       <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <!--<img :src="banner.imageUrl" width="100%"/>-->
                    <img v-lazy="banner.image" width="100%"/>  
                </van-swipe-item>
            </van-swipe>
        </div>
   </div>
</template>

<script>
    export default{
        props:["bannerPicArray"],
        data(){

        }
    }
</script>

<style scoped>
 .swiper-area{
    width: 20rem;
    overflow:hidden;
    clear:both;
    /*懒加载刚开始页面未加载出来的时候会高度移除*/
    max-height: 15rem;
}
</style>
