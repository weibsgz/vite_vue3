<template>
    <svg  class="" aria-hidden="true">
        <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
    </svg>
</template>


<script setup>
import { computed } from 'vue';

  const props = defineProps({
      name: {
          type: String,
          required: true
      },
      color: {
          type: String, 
          default: ''
      },
      //tailwindcss 指定SVG 颜色的类名
      fillClass:{
          type: String         
      }
  })

  //真实显示的SVG图片 （拼接 #icon-）
 const symbolId = computed(() => `#icon-${props.name}`)
</script>