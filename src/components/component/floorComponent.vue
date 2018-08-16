<template>
    <div>
        <div class="floor-title">
            <!--<span>1F</span>-->
            <span>{{floorTitle}}</span>
        </div>
        <!--不规则楼层数据-->
        <div class="floor-content">
            <div class="floor-left">
                <img :src="floorData0.image" alt="" width="100%">
            </div>
            <div class="floor-right">
                <div class="floor-top">
                    <img :src="floorData1.image" alt="" width="100%">
                </div>
                <div class="floor-bottom"> 
                    <img :src="floorData2.image" alt="" width="100%">
                </div>
            </div>
        </div>
        <!--规则楼层数据-->
        <div class="floor-rule">
        <!--左右两列布局 slice（start,end）从开始的位置截取到结束位置，不包括结束位置。结束位置没有，自动从开始位置截取到最后-->
            <div v-for="(item,index) in floorData.slice(3)" :key="index">
               <img :src="item.image" alt="" width="100%">
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        // vue使用props动态传值给子组件里面的函数用
        props:['floorData','floorTitle'],
        data(){
            return{
                floorData0:{},
                floorData1:{},
                floorData2:{}
            }
        },
        created(){
            // 以下为错误，在这里写得不到数据，因为异步请求，数据是延迟返回的。用watch属性监控数据变化。或者用promise的异步方法处理
            // axios({
            //     url:'https://www.easy-mock.com/mock/5aeaa8b7da989d525636814f/SmileVue',
            //     method:'get'
            // })
            // .then(response=>{
            //     console.log(response)
            //     this.floor1=response.data.data.floor1,
            //     this.floor1_0=this.floor1[0],
            //     this.floor1_1=this.floor1[1],
            //     this.floor1_2=this.floor1[2]
            // })
            // .catch(error=>{
            //     console.log(error)
            // })
        },
        watch:{  // 当数据发生改变的时候再赋值
            // floorData 监视的对象
            floorData:function(val){
                // console.log(this.floorData)
                this.floorData0=this.floorData[0],
                this.floorData1=this.floorData[1],
                this.floorData2=this.floorData[2]
            }
        }
    }
</script>
<style scoped>
    .floor-title{
        height: 2rem;
        line-height: 2rem;
        background-color: #eee;
        padding: 0.2rem;
        text-align: center;
        color: #e67655;
        font-size: 14px;
     }
    /*.floor-title span:nth-child(1){
        display:inline-block;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align:center;
        border-radius: 100px;
        color: #fff;
        background-color: #e67655;
     }*/
     .floor-content{
         display:flex;
         flex-direction: row;
         background-color:#fff;
         border-bottom:1px solid #ddd;
     }
     .floor-content div{
         width: 10rem;
     }
     /*.floor-content img{
         width: 100%;
         height: 100%;
     }*/
     .floor-left{
         border-right:1px solid #ddd;
     }
     .floor-top{
         border-bottom:1px solid #ddd
     }
     .floor-rule{
         display:flex;
         flex-direction:row;
         flex-wrap:wrap;
     }
     .floor-rule div{
         width: 50%;
         border-bottom:1px solid #ddd;
         -webkit-box-sizing:border-box;
         box-sizing:border-box;
     }
     .floor-rule div:nth-child(odd){
         border-right:1px solid #ddd;
     }
</style>