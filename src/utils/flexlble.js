import { computed } from 'vue'
import { PC_DEVICE_WIDTH,MAX_FONT_SIZE } from '@/constans/index.js'
import {useWindowSize } from '@vueuse/core'


// export const isMobile = () => {
//     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
// }

export const { width:windowWidth } = useWindowSize()

//通過宽度判断是为了瀑布流伸缩页面更容易看到效果
export const isMobile = computed(() => {
//   return document.documentElement.clientWidth < PC_DEVICE_WIDTH
    return windowWidth.value < PC_DEVICE_WIDTH
})



/**
 * 动态指定REM基准值 最大是40px
 * 
 */
export const useREM = ()=>{
    document.addEventListener('DOMContentLoaded',()=>{

        const html = document.querySelector('html');
        html.style.fontSize = window.innerWidth / 10 > MAX_FONT_SIZE ? MAX_FONT_SIZE + 'px' : window.innerWidth / 10 + 'px'

    })
}

