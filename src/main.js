// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vant from 'vant' 
// import 'vant/lib/vant-css/index.css' 
//不推荐，全局引入vant,相当于把所有的组件库都引入。会影响性能,按需引入比较好。
// vant 支持babel-plugin-import 引入，按需加载插件，无需单独引入样式.在.babelrc中配置plugins（插件）

// Vue.use(Vant);

import {button,Row,Col,Search,Swipe,SwipeItem,Lazyload,List,Field,NavBar,Tab,Tabs,PullRefresh,Stepper,Tabbar, TabbarItem,Icon} from 'vant'
Vue.use(button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(Icon)
.use(List).use(Field).use(NavBar).use(Tabs).use(Tab).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
