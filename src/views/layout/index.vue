<template>
    <div class="h-screen">
        <header-vue class="h-pcHeader"></header-vue>
        <main-vue class="h-pcMain"></main-vue>
        <floating-vue></floating-vue>
    </div>
</template>


<script setup>
import headerVue from './components/header/index.vue'
import mainVue from './components/main.vue';
import floatingVue from './components/floating.vue';
</script>