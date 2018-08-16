import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/categoryList'
import Cart from '@/components/pages/Cart'
import UserCenter from '@/components/pages/UserCenter'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
  routes:[
    {path:'/main',name:'Main',component:Main,
      children:[
         {path:'/',name:'ShoppingMall',component:ShoppingMall},
         {path:'/categoryList',name:'categoryList',component:CategoryList},
         {path:'/cart',name:'Cart',component:Cart},
         {path:'/userCenter',name:'UserCenter',component:UserCenter}
      ]
    },
    {path:'/Register',name:'Register',component:Register},
    {path:'/Login',name:'Login',component:Login},
    {path:'/Goods',name:'Goods',component:Goods}
  ]
})
