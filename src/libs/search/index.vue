<template>
 <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
      ref="containerRef"
 >
    <div>
        <!-- 搜索图标 -->
        <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"  
        name="search" 
        color="#707070"
        />

        <!-- 输入框 -->
        <input
            class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
            type="text"
            placeholder="搜索" 
            v-model="inputValue"  

            @keyup.enter="handlerSearch"
            @focus="onFocusHandler" 
            @blur="onBlurHandler"     
        />

        <!-- 删除按钮 -->
        <m-svg-icon      
            v-show="inputValue"
            name="input-delete"
            class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"  
            @click="clearBtn"        
        ></m-svg-icon>

        <!-- 分割线 -->
        <div
            class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500
             bg-zinc-200 group-hover:opacity-100"
        ></div>
        <!-- TODO: 搜索按钮(通用组件) 默认是透明的，鼠标滑过显示-->
        <m-button icon="search" iconColor="#fff"     
                  @click="handlerSearch"                                         
                  class="opacity-0 absolute duration-500 translate-y-[-50%] top-[50%] right-1 rounded-full group-hover:opacity-100" >
        </m-button>
        <!-- 下拉区 -->
        <transition name="slide">
        <div
   
            v-show="isFocus"
            class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 
                   absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200
                 dark:border-zinc-600 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-zinc-200 
                   dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
        >
            <slot name="dropdown"></slot>
        </div>
        </transition>


    </div>
 </div>
</template>

<script setup>
/**
 * 1.实现输入内容双向绑定
 * 2.搜索按钮在hover时候展示
 * 3.一键清空文本功能
 * 4.触发搜索
 * 5.控制下拉展示区的展示
 * 6.事件处理
 */
//1.实现输入内容双向绑定
import { computed, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})
//https://cn.vuejs.org/guide/components/v-model.html#component-v-model
const emits = defineEmits(['update:modelValue','searchClick','onClear','onInput','onFocus','onBlur'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})


//2.搜索按钮在hover时候展示  m-button组件  默认是透明的，鼠标滑过显示

//3.一键清空文本功能

const clearBtn = () => {
  inputValue.value = ''
  emits('onClear','')
}

//4触发搜索
const handlerSearch = () => {
  console.log(inputValue.value)
  emits('searchClick', inputValue.value)
}


//监听用户输入
watch(inputValue, (value) => {
  emits('onInput', value)
})




//5.控制下拉展示区的展示
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits('onFocus')
}

const onBlurHandler = () => {
  emits('onBlur')
}


const containerRef = ref(null)
onClickOutside(containerRef, () => isFocus.value = false)



</script>


<style scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>