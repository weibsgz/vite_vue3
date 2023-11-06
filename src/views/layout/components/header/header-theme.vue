<template>
   <m-popover>
        <!-- 具名插槽 触发弹层的ICON -->
       <template #reference>
         <m-svg-icon :name="svgIconName" 
                    class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"
          >
         </m-svg-icon>
       </template>
       <!-- 匿名插槽，弹出层展示的内容 -->
       <div class="w-[140px] overflow-hidden">
          <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
            v-for="item in themeArr" :key="item.id"
            @click="onItemClick(item)"
          >
            <m-svg-icon
                :name="item.icon"
                class="w-1.5 h-1.5 mr-1"
                fillClass="fill-zinc-900 dark:fill-zinc-300"
            ></m-svg-icon>
            <span class="text-zinc-800 dark:text-zinc-300 text-sm">
               {{item.name}}
            </span>
          </div>
       </div>
   </m-popover>
</template>


<script setup>
import { useStore } from 'vuex';
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constans/index.js'
import mPopover from '@/libs/popover/index.vue';
import {watch,computed} from 'vue'

const store  = useStore();

const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
 ]
//监听系统主题变更
let mediaTheme ; //操作系统设置的深色还是浅色主题。


const watchSystemThemeChange = () => {
  if(mediaTheme) return ; // 仅需初始化一次即可
  mediaTheme =  window.matchMedia('(prefers-color-scheme: dark)')
  mediaTheme.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}


const changeTheme = (theme) => {
  let themeClassName = ''
  switch(theme){
    case THEME_LIGHT:
      themeClassName = 'light'
      break;
    case THEME_DARK:
      themeClassName = 'dark'
      break;
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = mediaTheme.matches ? 'dark' : 'light'
      break;
    default:
      themeClassName = 'light'
      break;   
  }
  console.log('themeClassName',window.matchMedia('(prefers-color-scheme: dark)').matches,themeClassName)
  document.documentElement.className = themeClassName
}


watch(() => store.getters.getTheme, changeTheme, { 
  immediate: true 
})



const onItemClick = (themeItem) => {
  store.commit('theme_/changeTheme', themeItem.type);
}


const svgIconName = computed(() => {
    const findTheme = themeArr.find(item=>item.type === store.getters.getTheme)
    return findTheme.icon 
})

</script>