<template>
    <m-popover class="flex items-center" placement="bottom-left">
         <!-- 具名插槽 触发弹层的ICON -->
        <template #reference>
            <div v-if="$store.getters.getToken" class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100">
                <!-- 头像 -->
                <img v-lazy class="w-3 h-3 rounded-sm" :src="$store.getters.getUserInfo.avatar" />
                <!-- 下箭头 -->
                <m-svg-icon name="down-arrow"  class="h-1.5 w-1.5 ml-0.5" fillClass="fill-zinc-900 dark:fill-zinc-300"></m-svg-icon>
                <!-- vip 标记 -->
                <m-svg-icon                   
                    name="vip"
                    v-if="$store.getters.getUserInfo.vip"
                    class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
                ></m-svg-icon>
            </div>
            <div v-else>
                <m-button
                    class="guide-my"
                    icon="profile"
                    iconColor="#fff"
                    @click="onToLogin"
                ></m-button>
            </div>
        </template>
        <!-- 匿名插槽，弹出层展示的内容 -->
        <template #default >
            <div v-if="$store.getters.getToken" class="w-[140px] overflow-hidden">
                <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
                     v-for="item in menuArr"
                    :key="item.id"  
                    @click="onItemClick(item)"                  
                >
                <m-svg-icon
                    :name="item.icon"
                    class="w-1.5 h-1.5 mr-1"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
                ></m-svg-icon>
                <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
                    item.title
                }}</span>
                </div>
            </div>
        </template>
    </m-popover>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm} from '@/libs/confirm'

const router = useRouter()
const store = useStore()

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]


// 进入登录
const onToLogin = () => {
  // 配置跳转方式
  store.commit('app_/changeRouterType', 'push')
  router.push('/login')
}


const onItemClick = (item) => {
 if(item.id === 2) {
  // 退出登录
  confirm('确定退出登录吗？').then(() => {
    store.dispatch('user_/logout')
  })
  return 
 }
  // 跳转
  store.commit('app_/changeRouterType', 'push')
  router.push(item.path)

}

</script>