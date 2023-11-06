import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import getters from './getters'
import category_ from './modules/category'
import theme_ from './modules/theme'
import app_ from './modules/app'
import search_ from './modules/search'
import user_ from './modules/user'

const store = createStore({
    getters,
    modules:{
        category_,
        theme_,
        app_,
        search_,
        user_
    },
    //他的作用是把vuex存入到缓存中，并在下次进页面时，从缓存中读取数据
    //为了解决刷新页面 想做本地持久化的问题。
    plugins: [createPersistedState({
        key: 'imooc-vue',
        //需要保存的模块
        path: ['category_','theme_','search_','user_'],
    })]
})

export default store