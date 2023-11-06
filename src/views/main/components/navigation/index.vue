<template>
   <mobileNav v-if="isMobile"></mobileNav>
   <pcNav v-else></pcNav>
</template>

<script setup>
import { isMobile } from '@/utils/flexlble';
import mobileNav from './mobile/index.vue';
import pcNav from './pc/index.vue';
// import {getCategory} from '@/api/category'
// import {ALL_CATEGORY_ITEM} from '@/constans/index.js'
import {ref} from 'vue'
import {useStore} from 'vuex'

// const categoryData= ref([])

// const getCategoryList = async () => {
//     const res = await getCategory()
//     const {categorys} = res;
//     categoryData.value = [ALL_CATEGORY_ITEM,...categorys]
   
// }

// getCategoryList()


const store = useStore()
store.dispatch('category_/useCategoryData')
</script>