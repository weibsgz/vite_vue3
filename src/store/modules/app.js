import {ALL_CATEGORY_ITEM } from '@/constans/index.js'

export default {
    //独立作用域
    namespaced: true,
    state:()=>{
        return {
            //当前选中的分类
            currentCategory:ALL_CATEGORY_ITEM,
            //搜索的文本
            searchText:'',
            //路由跳转类型
            routerType:'none',
        }
    },
    mutations: {
        changeCurrentCategory(state,category){
            state.currentCategory = category
        },
        changeSearchText(state,text){
            state.searchText = text
        },
        changeRouterType(state,routerType){
            state.routerType = routerType
        },
    },
    actions: {
        
    }
}