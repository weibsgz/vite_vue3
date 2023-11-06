<template>
    <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <!-- 具名插槽 触发弹层的ICON -->
        <div ref="referenceTarget">
            <slot name="reference"></slot>
        </div>
          <!-- 气泡展示 -->
        <transition name="slide">
            <div v-show="isVisible" 
                ref="contentTarget"  
                :style="contentStyle"              
                 class="absolute z-20 p-1 bg-white border rounded-md">
                <!-- 匿名插槽，弹出层展示的内容 -->
                <slot></slot>
            </div>
        </transition>
    </div>
  
    
</template>
<script>
     const placementEnum = [
                            'top-left',
                            'top-right',
                            'bottom-left',
                            'bottom-right'
                          ]
</script>

<script setup>
    import { ref ,watch,nextTick} from 'vue';
    //控制popover展示的位置
    const isVisible = ref(false)
   
    
    const props = defineProps({
        placement: {
            type: String,
            default: 'bottom-left',
            validator(val) {
                const result = placementEnum.includes(val)
                if(!result) {
                    throw new Error('placement必须是top-left、top-right、bottom-left、bottom-right中的一个')
                }
                return result
            }
        }
    })

    //需要计算具名ICON插槽里边的图标尺寸，还有内容插槽里边的内容尺寸，这样才能确定POPover的位置
    const referenceTarget = ref(null)
    const contentTarget = ref(null)

    const getElementSize = (target) => {
        const { width, height } = target.getBoundingClientRect()       
        return {
            width,
            height           
        }
    }

    //计算POPOVER的样式

    const contentStyle = ref({
        top: 0,
        left: 0
    })

    //计算POPOVER的位置,当popover显示的时候计算 他会出现在 具名插槽的icon 的左上 右上 左下 右下 的位置
    watch(isVisible,(val)=>{
        if(!val) return ;
        //等待元素渲染,VUE在数据改变时，要等一段时间DOM才会变化
        nextTick(()=>{
            switch (props.placement) {
                case 'top-left':
                    contentStyle.value.top = 0
                    contentStyle.value.left = -getElementSize(contentTarget.value).width + 'px'
                    break;
                case 'top-right':
                    contentStyle.value.top = 0
                    contentStyle.value.left = getElementSize(referenceTarget.value).width + 'px'
                    break;
                case 'bottom-left':
                    contentStyle.value.top =  getElementSize(referenceTarget.value).height + 'px'
                    contentStyle.value.left = -getElementSize(contentTarget.value).width + 'px'
                    break;
                case 'bottom-right':
                    contentStyle.value.top = getElementSize(referenceTarget.value).height + 'px'
                    contentStyle.value.left =  getElementSize(referenceTarget.value).width + 'px'
                    break;
            
                default:
                    break;
            }
        })
    })




    let timeout = null;

    const onMouseEnter = () => {
        isVisible.value = true

        if(timeout) {
            clearTimeout(timeout)
        }
    }


    const onMouseLeave = () => {

        //延迟关闭，如果不处理的话，鼠标慢速移动出ICON的位置，还未到POPover的位置，就会关闭
        timeout = setTimeout(() => {
            isVisible.value = false
            timeout = null;
        }, 100)

        
    }


    

</script>

<style>
.slide-enter-active, .slide-leave-active {
    transition: opacity 0.3s,transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
    opacity: 0;
 
}
</style>