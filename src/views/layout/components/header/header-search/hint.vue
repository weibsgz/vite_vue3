<!--搜索提示-->
<template>
    <div>
        <div v-for="(item,index) in hintData" :key="index" 
            @click="onItemClick(item)" 
            class="text-base py-1 pl-1 font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
            v-html="HighLightText(item)"
        >
            
        </div>
    </div>
</template>

<script setup>

import { getHint } from '@/api/pexels.js'
import {ref,watch,computed} from 'vue'

const props = defineProps({
    searchText:{
        type:String,
        required:true
    }
})

const emits = defineEmits(['onItemClick'])

const hintData = ref([])

//防抖
const debounce = (fn,delay=300) => {
    let timer = null
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this,args)
        },delay)
    }
}

const getHintData = async () => {
    if (!props.searchText) return

    console.log(props.searchText)
    const res = await getHint(props.searchText)
    hintData.value = res.result
    console.log(hintData.value)
}

watch(
    ()=>props.searchText,
    debounce(getHintData),
    {immediate:true}
)


const onItemClick = (item) => {
    emits('onItemClick',item)
}

/**
 * 关键字高亮
 * / 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
 */

 
const HighLightText = (text) => {   
    const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
    const reg = new RegExp(props.searchText,'ig')
    return text.replace(reg,highlightStr)
}

</script>

