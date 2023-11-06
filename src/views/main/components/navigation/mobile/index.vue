<template>
    <div class="bg-white sticky top-0 left-0 z-10">
  
       <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">

          <!-- 滑块 -->
          <li ref="silderTarget" 
              :style="sliderStyle" 
              class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
          >
          </li>


          <!--汉堡按钮-->
          <li @click="onShowPop" class="fixed right-[-1px] top-0 h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
            <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
          </li>   


         <li  class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
              :class="$store.getters.getCurrentCategoryIndex === index ? 'text-zinc-100' : ''"
              v-for="(item, index) in $store.getters.getCateGory" 
              :key="item.id"
              @click="clickItem(item)"
              ref="itemRefs"
              >
              {{ item.name }}
         
         </li>
    
       </ul>
       <m-popup v-model="isVisible" data-test="test">
        <menu-vue @onItemClick="onItemClick" ></menu-vue>
      </m-popup>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useScroll } from '@vueuse/core'
import { useStore } from 'vuex';
import {ALL_CATEGORY_ITEM } from '@/constans/index.js'
import MenuVue from '@/views/main/components/menu/index.vue'
const store = useStore();
//  const props = defineProps({
//     data:{
//         type:Array,
//         required:true
//     }
//   })

  //滑块
 const sliderStyle =   ref({
    transform: 'translateX(0)',
    width:'60px'

 })
 //默认选中滑块的下标
 const currentCategoryIndex = ref(0);

 const ulTarget = ref(null)
 //通过vueuse的useScroll获取ul的滚动距离（是响应式的）
 const { x } = useScroll(ulTarget)

 //所有选项的集合
 const itemRefs = ref([])

 store.commit('app_/changeCurrentCategory',ALL_CATEGORY_ITEM)

 const clickItem = (item) => {

    store.commit('app_/changeCurrentCategory',item)
    const index = store.getters.getCurrentCategoryIndex;


    const {left,width} = itemRefs.value[index].getBoundingClientRect()
    //滑块的位置 = ul 横向滚动的位置 + 当前元素的left - ul的左padding(这里如果要计算真实的PADDING 可以用 getComputedStyle)
    sliderStyle.value.transform = `translateX(${x.value + left - 10}px)`;
    sliderStyle.value.width = width + 'px';
 }

 const isVisible = ref(false);

 const onShowPop = () => {
    isVisible.value = true;   
 }

 const onItemClick = (index) => {
    clickItem(index);
    isVisible.value = false;
 }

</script>