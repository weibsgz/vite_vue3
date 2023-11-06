<template>
    <div class="h-screen fixed top-0 left-0 w-screen"> 
   
      <!-- <router-view></router-view>     -->
      <m-transition-router-view 
          :routerType="$store.getters.getRouterType" 
          mainComponentName="home"
      >
      </m-transition-router-view>
    </div>
</template>

<script setup>
import {ref} from 'vue'
  
 
  const text = ref('')

</script>
