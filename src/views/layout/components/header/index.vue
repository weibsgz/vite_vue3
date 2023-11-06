<template>
    <div class="w-full duration-500 bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1">
        <div v-lazy class="flex items-center">
            <img class="h-4 cursor-pointer mr-2 guide-home" 
               src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" 
               @click="toHome"
            />
            <header-search class="mr-1"></header-search>
            <header-theme class="mr-1"></header-theme>
            <header-my></header-my>
        </div>
    </div>
</template>


<script setup>
import headerSearch from './header-search/index.vue';
import headerMy from './header-my.vue';
import headerTheme from './header-theme.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toHome = () => {
    console.log('toHome')
   router.push({
       path: '/'
   })
}

</script>