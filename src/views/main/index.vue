


<template>
    <div class="wocao h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
          ref="containerTarget"
    >
        <navigation></navigation>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
        <list></list>
    </div>
    <m-mobile-bottom-bar v-if="isMobile" class="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
        <m-mobile-bottom-bar-item
            icon="home"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
        >
            首页
        </m-mobile-bottom-bar-item>
        <m-mobile-bottom-bar-item
            v-if="$store.getters.getToken"
            icon="vip"
            iconClass="fill-zinc-400 dark:fill-zinc-500"
            textClass="text-zinc-400 dark:text-zinc-500"
            @click="onVipClick"
        >
         VIP
        </m-mobile-bottom-bar-item>
        <m-mobile-bottom-bar-item
            icon="profile"
            iconClass="fill-zinc-400 dark:fill-zinc-500"
            textClass="text-zinc-400 dark:text-zinc-500"
            @click="onMyClick"
        >
        {{ $store.getters.getToken ? '我的' : '登录' }}
        </m-mobile-bottom-bar-item>


    </m-mobile-bottom-bar>
    </div>
</template>

<script>
export default {
  name: 'home'
}
</script>


<script setup>
import {isMobile} from "@/utils/flexlble.js"
import navigation from './components/navigation/index.vue'
import list from './components/list/index.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import { onActivated, ref } from 'vue'

const store = useStore()
const router = useRouter()


const onVipClick = () => {
  // 配置跳转方式 
  store.commit('app_/changeRouterType', 'push')
  router.push('/member')
}


/**
 * 我的按钮点击事件
 */
 const onMyClick = () => {
    store.commit('app_/changeRouterType', 'push')
  if (store.getters.getToken) {    
    router.push('/profile')
  } else {
    router.push('/login')
  }
}


/**
 * 记录页面滚动位置
 */
 const containerTarget = ref(null)
 const { y: containerTargetScrollY } = useScroll(containerTarget)
 // 被缓存的组件再次可见，会回调 onActivated 方法
 onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})

</script>