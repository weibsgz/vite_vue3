<template>
    <div>
       <Teleport to="body">
         <!-- 蒙版 -->
         <Transition name="fade" @click="emits('update:modelValue',false)">
            <div v-if="modelValue"  class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0">蒙版</div>
         </Transition>
         <!-- 内容 -->
         <Transition  name="pop-down-up">
            <div v-if="modelValue" v-bind="$attrs" class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0">
               <slot></slot>
            </div>
         </Transition>
       </Teleport>
    </div>
</template>



<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
});

const emits = defineEmits(["update:modelValue"]);

const isLocked = useScrollLock(document.body);

watch(() => props.modelValue, (value) => {
  isLocked.value = value
}, { immediate: true });

</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
/* 准备进入，离开完成 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.pop-down-up-enter-active,
.pop-down-up-leave-active {
    transition: all 0.5s ease;
}
/* 准备进入，离开完成 */
.pop-down-up-enter-from,
.pop-down-up-leave-to {
  transform: translateY(100%);
}


</style>