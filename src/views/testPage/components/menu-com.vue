<template>
    <div ref="containerRef"  class="container"> 
        {{ menuVis }} {{ x }}

        <!--包裹内容区域的插槽-->
        <slot></slot>

        <!-- 使用 Teleport 将右键菜单放到BODY 因为他是设置的fiexd 如果他的父元素有transform 就不生效了-->

        <Teleport to="body">           
            <div class="context-menu" v-if="menuVis" :style="{'top':y  + 'px','left':x  + 'px'}">
            <ul>
                    <li v-for="item in menu" @click="clickItem(item)">
                        {{ item.lable }}
                    </li>
            </ul>
            </div>           
        </Teleport>
        
    </div>
</template>

<script setup>
 import {ref} from 'vue'

 import useContextMenu from './useContextMenu.js'
 const emits = defineEmits(['select'])

const containerRef = ref(null)

console.log('主页中onMounted',containerRef,containerRef.value)

//使用这个HOOKS 去取得当前鼠标的X,Y 以及是否显示菜单。
const {x,y,menuVis} = useContextMenu(containerRef)

// watchEffect(()=>{
//     const {x,y,menuVis} = useContextMenu(containerRef.value)
// },{
//     flush:'post'
// })
    

const props = defineProps({
    // 数据源
    menu: {
      type: Array,
      required: true
    }
  
  })

 

  const clickItem = (item)=>{
    emits('select',item.lable)
  }
        
</script>

<style>
    .context-menu {

        position: fixed;
        left:v-bind(x + 'px');
        top:v-bind(y  + 'px');
        width: 200px;
        height: auto;
        border: 1px solid #000;
        font-size: 14px;
        text-align: center;
    }
</style>