<template>
    <div class="w-full guide-search">
        <m-search v-model="inputValue" @searchClick="onSearchHandler">
            <template #dropdown>
               
                <div>   
                     <!-- 搜索提示 -->                 
                    <hint :searchText="inputValue" v-show="inputValue" @onItemClick="onSearchHandler"></hint>
                    <!-- 搜索历史 -->
                    <history v-show="!inputValue"  @onItemClick="onSearchHandler"></history>
                    <!-- 主题 -->
                    <theme></theme>
                </div>
            </template>
        </m-search>


      
    </div>
</template>


<script setup>

import { ref } from 'vue';
import { useStore} from 'vuex'
import hint from './hint.vue';
import history from './history.vue';
import theme from './theme.vue';

const inputValue = ref('');

const store = useStore()

const onSearchHandler = (val) => {
    inputValue.value = val;

    if(val)
        store.commit('search_/addHistory',val)
        store.commit('app_/changeSearchText',val)
}


</script>