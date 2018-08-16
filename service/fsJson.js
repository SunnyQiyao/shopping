// goods.json里面的数据是爬取的，有些是无效的，现在要提取IMAGE1图片存在的商品
// node.js的读取写入文件模块
const fs=require('fs');
fs.readFile('./goods.json','utf8',function(err,data){
    // console.log(typeof data)
    const newData=JSON.parse(data)
    let i=0;  //计算读取了多少数据
    let pushData=[];
    newData.RECORDS.map(function(value,index){
        // if(data.IMAGE1!=null){  错误，这里的数据值是value，不然会一致打印不出来值
        if(value.IMAGE1!=null){ 
            i++
            console.log(value.NAME)
            pushData.push(value)  
        }
    })
    console.log(i)   //694
    // console.log(pushData) 
    
    // 把读取的符合要求的数据写入到新的文件newGoods.json中
    fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),function(err){
        if(err) console.log('数据写入失败')
        else console.log('数据写入成功')
    })
})


