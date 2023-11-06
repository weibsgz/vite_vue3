
import { useIntersectionObserver } from '@vueuse/core'

export default {
    mounted(el, binding) {
        const imgSrc = el.src
        el.src = ''
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if(isIntersecting) {
                //当图片可见时 ，加载图片
                el.src = imgSrc
                // 停止监听
                stop()
            }
         
        })
    }
}