<template>
    <div>
        {{ showTime }}
    </div>
</template>




<script>
    //倒计时 每秒执行
    const INTERVAL_COUNT = 1000
</script>

<script setup>
import {computed, onMounted, onUnmounted, ref, watchEffect} from 'vue'
import dayjs from './util'


const props = defineProps({
    //毫秒时间戳
    time: {
        type: Number,
        required: true
    },
    //遵循dayjs的标准 https://day.js.org/
    format: {
        type: String,
        default: 'HH:mm:ss'
    }

})
//倒计时结束，倒计时改变
const emits = defineEmits(['finish','updateTime'])
//倒计时时间
const duration=ref(0)

/**
 * 开始倒计时
 */
let timer = null

 /**
  * 结束倒计时
  */
const clearTimer = () => {
    if (timer) {
        clearInterval(timer)
    }
}


const start = ()=>{
    clearTimer()
    timer = setInterval(() => {
        durationFn()
    }, INTERVAL_COUNT)
}
//每次TIME改变开始倒计时功能
// watchEffect(()=>{
//     duration.value = props.time
//     console.log('watchEffect')
//     start()
// })

onMounted(()=>{
    duration.value = props.time
    console.log('watchEffect')
    start()
})


/**
 * 倒计时的执行行为
 */
//使用duration插件将
const showTime = computed(()=>{
    return dayjs.duration(duration.value).format(props.format)
})


 const durationFn = () => {
    duration.value -= INTERVAL_COUNT 
    emits('updateTime')

    //倒计时结束
    if(duration.value <= 0){
        duration.value = 0
        emits('finish')

        clearTimer()
    }
 }

 



/**
 * 组件销毁时销毁倒计时
 */

onUnmounted(()=>{
    clearTimer()
})
</script>