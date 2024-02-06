<template>
    
    <div style="display: flex; height: 100%;">
        <!-- 区域1  每个区域都有一个右键选择组件 包裹着区域内容（插槽） -->
        <menu-com-vue :menu="menu1" @select="selectMenu">        
            <div class="area1">{{label1}}</div>
        </menu-com-vue>
        
        <!-- 区域2 -->
        <menu-com-vue :menu="menu2" @select="selectMenu2">        
        <div class="area1">{{label2}}</div>
        </menu-com-vue>

    </div>

</template>
<script setup>
 import { ref} from 'vue'
 import menuComVue from './components/menu-com.vue'
 

 const label1 = ref('')
 const label2 = ref('')
 const menu1 = ref([
    {lable:'部门',id:1},
    {lable:'部门1',id:2},
    {lable:'部门2',id:3},
    {lable:'部门3',id:4},
    {lable:'部门4',id:5},
 ])


 const menu2 = ref([
    {lable:'员工1',id:1},
    {lable:'员工3',id:2},
    {lable:'员工3',id:3},
    {lable:'员工4',id:4},
    {lable:'员工5',id:5},
 ])

 const selectMenu = (item) => {
    label1.value= item;
 }

 const selectMenu2 = (item) =>{
    label2.value= item;
 }

</script>

<style>
    .area1 {
        background: #ccc;
        flex: 50% 0 0;
    }

    .area2 {
        background-color:bisque;
        flex: 50% 0 0;
    }
</style>

