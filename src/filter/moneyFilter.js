// 暴露出去
// toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
// @符号，在webpack的配置中配置了，代表src文件夹

// export function toMoney(money){
//     let newMoney=money;
//     if(newMoney){
//         newMoney=newMoney.toFixed(2);
//     }else{
//         newMoney=0;
//         newMoney=newMoney.toFixed(2);
//     }

//     return newMoney;   // 一定要把需要用到的数据返回出去
// };

// 简化方法
export function toMoney(money=0){  //给一个默认值为0的情况
    return money.toFixed(2);
}