  

  <!--这个组件的意义是为了进入详情页后页面一刷新会空白情况-->
  
  
  <template>
    <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
      <pins-vue :id="$route.params.id" />
    </div>
  </template>
  
  <script setup>
  import pinsVue from './components/pins.vue'
  </script>
  