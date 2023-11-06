<template>
  <!-- 增加这个样式 fixed top-0 left-0 w-screen z-50 在动画开始前加上，动画结束后删掉
      是因为在组件切换的时候，第一个组件在消失的过程中会把第二个组件顶到下边去 -->

    <router-view v-slot="{ Component }">
        <transition :name="transitionName" 
                    @before-enter="beforeEnter"
                    @after-leave="afterLeave"
        >
            <keep-alive :include="KeepAliveArr">
                <component 
                    :class="{'fixed top-0 left-0 w-screen z-50':isAnimation}" 
                    :is="Component" 
                    :key="$route.fullPath"
            />
            </keep-alive>
        </transition>
    </router-view>
</template>


<script setup>
    import { ref } from 'vue'
    import { useRouter  } from 'vue-router'; 
    const router = useRouter()

    const props = defineProps({
       //路由的跳转类型
       routerType :{
           type:String,
           // push 进入动画  back 退出  none 没有
           default:'none',
           validator(value){
               const res = ['push','back','none'].includes(value)
               if(!res){
                   throw new Error('routerType必须是push、back、none中的一个')
               }
               return res
           }
       },
       //首页的组件名称。首页位于栈底，不可后退。
       mainComponentName:{
           type:String,
           required:true
       }

    })
    //跳转动画
    const transitionName = ref('')  //push ,back , none
     //根据入栈出栈记录需要缓存的组件
     const KeepAliveArr = ref([props.mainComponentName])

    router.beforeEach((to,from)=>{
        transitionName.value = props.routerType
       

        if(props.routerType === 'push') {
            //入栈
            KeepAliveArr.value.push(to.name)
        }
        else if(props.routerType === 'back'){
            //出栈
            KeepAliveArr.value.pop()
        }

        if(to.name === props.mainComponentName){            
            //首页
            clearKeepALiveArr()
        }

        console.log('KeepAliveArr',KeepAliveArr.value)
    })


    // 处理动画状态变化
    const isAnimation = ref(false)
    const beforeEnter = () => {
        isAnimation.value = true
    }
    const afterLeave = () => {
        isAnimation.value = false
    }

   const clearKeepALiveArr = () => {
       KeepAliveArr.value = [props.mainComponentName]
   }


</script>

<style scoped>
/* push页面时：新页面的进入动画 */


.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
 /* push页面时：老页面的退出动画 */
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
/* push页面时：新页面的进入动画 */
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
/* push页面时：老页面的退出动画 */
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

/* 后退页面时：即将展示的页面动画 */
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
/* 后退页面时：后退的页面执行的动画 */
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
/* 后退页面时：即将展示的页面动画 */
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
 /* 后退页面时：后退的页面执行的动画 */
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>