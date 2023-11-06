import {ALL_CATEGORY_ITEM , INIT_CATEGORY} from '@/constans/index.js'
import {getCategory} from '@/api/category'
/**
 * 处理navgionbar中的数据
 */

export default {
    //独立作用域
    namespaced: true,
    state:()=>{
        return {
            categorys:[ALL_CATEGORY_ITEM,...INIT_CATEGORY]
        }
    },
    mutations: {
        setCategorys(state,categorys){            
            state.categorys = [ALL_CATEGORY_ITEM, ...categorys]    
        }
    },
    actions: {
        async useCategoryData(context){
            const categorys = await getCategory()    
           
            context.commit('setCategorys',categorys.categorys)
        }
    }
}