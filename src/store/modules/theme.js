import {THEME_LIGHT} from '@/constans/index.js'

export default {
    //独立作用域
    namespaced: true,
    state:()=>{
      return {
          themeType:THEME_LIGHT
      }
    },
    mutations: {
        changeTheme(state,themeType){
            state.themeType = themeType           
            console.log('mutations ==', state.themeType)
        }
    },
    actions: {
       
    }
}