<template>
   <div>
       <swiper :options="swiperOption" class="swiper">
           <swiper-slide v-for="(item,index) in slide" :key="index" class="swiperSlide">
               slide {{item}} 
           </swiper-slide>
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
                slide:[1,2,3,4,5,6],
                swiperOption:{
                    pagination:{
                        el:'.swiper-pagination',
                        clickable: true
                    },
                    slidesPerView:'auto',
                    loop:true,
                    autoplay: true
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
       width: 100%;
       height: 7rem;
       text-align:center;
       background: yellow;
   }
   .swiperSlide{
       padding-top: 3rem;
   }
</style>