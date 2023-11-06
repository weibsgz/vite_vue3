/**搜索历史 */




export default {
    //独立作用域
    namespaced: true,
    state:()=>{
        return {
          historys:[]
        }
    },
    mutations: {
      /**
       * 新增
       * 1.新增的历史记录位于头部，不可重复
       */
      addHistory(state,history){
         const isFind =  state.historys.findIndex(item=>{
            return item === history
         })

         if(isFind !== -1) {
            state.historys.splice(isFind,1)
         }

         state.historys.unshift(history)
      },

      /**
       * 单个删除
       */
      delHistory(state,index){
        state.historys.splice(index,1)  
      },

      /*
        全部删除
      */
      clearHistory(state){
          state.historys = []
      }
    },
    actions: {
       
    }
}