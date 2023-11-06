<template>

<button class="text-sm text-center rounded duration-150 flex justify-center items-center"
        :class="[typeEnum[type], sizeEnum[sizeKey]['button']],{'active:scale-105':isActiveAnim}"
        @click="onBtnClick"
>
 <!-- loading -->
 <m-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></m-svg-icon>
 <!-- icon按钮 -->
 <m-svg-icon v-if="icon" :name="icon" class="m-auto" 
             :class="sizeEnum[sizeKey]['icon']" 
             :color="iconColor" :fillClass="iconClass"
  ></m-svg-icon>
  <!-- 文字按钮 -->
  <slot v-else></slot>
</button>

</template>


<script setup>
/**
 * 构建type 和 SIZE可选项 (区分icon button 和 text button) * 
 */
import {typeEnum , sizeEnum } from '@/constans/index.js'
import { computed } from 'vue';
//这里按说不用引入，但是为了 confirm组件的使用，需要引入，他是个render渲染的组件，不能通过全局注册进入引入
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
    //icon图标
    icon:{
        type:String     
    },
    //icon 颜色
    iconColor:{
        type:String
    },
    //icon 图标类名(taildwind)
    iconClass:{
        type:String
    },
    //按钮风格 风格来自 constans/index.js
    type:{
        type:String,
        default:'main',
        validator(val){
            //1.获取所有的可选项
            const keys = Object.keys(typeEnum)
            //2.判断是否包含
            const result = keys.includes(val)
            if(!result){
                throw new Error(`你的TYPE必须是${keys.join('、')}中的一个`)
            }
            return result
        }
    },
    //按钮大小 风格来自 constans/index.js
    size:{
        type:String,
        default:'default',
        validator(val){
            //1.获取所有的可选项 不要包含icon 的key
            const keys = Object.keys(sizeEnum).filter((keys) => {
                return !keys.includes('icon')
            })
            //2.判断是否包含
            const result = keys.includes(val)
            if(!result){
                throw new Error(`你的SIZE必须是${keys.join('、')}中的一个`)
            }
            return result
        }
    },
    //按钮点击时是否需要动画
    isActiveAnim:{
        type:Boolean,
        default:true
    },
    //加载状态
    loading:{
        type:Boolean,
        default:false
    }

})

//如果传递过来包含icon图标 则认为他是一个icon按钮
const sizeKey = computed(() => {
    return props.icon ? 'icon-' + props.size : props.size
})


const emits = defineEmits(['clickBtn'])

const onBtnClick = () => { 
    if(props.loading) return ;
    
    emits('clickBtn')
}

</script>