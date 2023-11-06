import {isMobile} from '@/utils/flexlble.js'

export default {
    getCateGory(state){
       
        return state.category_.categorys
    },
    getTheme(state){
        return state.theme_.themeType
    },
    getCurrentCategory(state){
        return state.app_.currentCategory
    },
    getCurrentCategoryIndex(state,getters){
        return getters.getCateGory.findIndex(item=>item.id === getters.getCurrentCategory.id)
    },
    gethistorys(state){
        return state.search_.historys
    },
    getSearchText(state){
        return state.app_.searchText
    },
    getToken(state) {
        return state.user_.token
    },

    getUserInfo(state){
        return state.user_.userInfo
    },
    getRouterType(state){
       // pc端下 没有跳转动画
       if(!isMobile.value) {
         return 'none'
       }
       return state.app_.routerType
    }

}