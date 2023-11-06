<template>
    <div class="relative">
        <!-- 单行文本 -->
        <input
            v-if="type === 'text'"
            class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
            type="text"
            v-model="text"
            :maxlength="max"
        />
        <!-- 多行文本 -->
        <textarea
            v-if="type === 'textarea'"
            v-model="text"
            :maxlength="max"
            rows="5"
            class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
        ></textarea>
        <!-- 字数 -->
        <span
            v-if="max"
            class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
            :class="{ 'text-red-700': currentNumber === parseInt(max) }"
            >{{ currentNumber }} / {{ max }}</span
        >
    </div>
</template>

<script setup>
import { computed } from 'vue';


    const props = defineProps({
        // 1. 双向数据绑定
        modelValue: {
            type: String,
            required: true            
        },
        //type 是单行文本输入，还是多行
        type: {
            type: String,
            default:'text',
            validator(value){
                const res =  ['text', 'textarea'].includes(value)
                if(!res){
                    throw new Error('你的 type 必须是 text 或 textarea 中的一个')
                }
                return res
            }
        },
        //最大输入文本数
        max:{
            type:[Number, String],
        }
    })

    const emits = defineEmits(['update:modelValue'])

    const text = computed({
        get(){
            return props.modelValue
        },
        set(value){
            emits('update:modelValue', value)
        }
    })

    //输入的字符数
    const currentNumber = computed(()=>{
        return text.value.length
    })

</script>