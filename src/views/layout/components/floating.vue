<template>
    <div class="fixed bottom-10 right-2">
      <!-- 引导页 -->
      <div
        class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        @click="onGuideClick"
      >
        <m-svg-icon
          name="guide"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
        ></m-svg-icon>
      </div>
      <!-- 反馈 -->
      <m-popover class="flex items-center guide-feedback" placement="top-left">
        <template #reference>
          <div
            class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
          >
            <m-svg-icon
              name="feedback"
              class="w-2 h-2"
              fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
            ></m-svg-icon>
          </div>
        </template>
  
        <div class="w-[140px] overflow-hidden">
          <div
            class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
            @click="onToFeedback"
          >
            <m-svg-icon
              name="feedback"
              class="w-1.5 h-1.5 mr-1"
              fillClass="fill-zinc-900 dark:fill-zinc-300"
            ></m-svg-icon>
            <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
          </div>
        </div>
      </m-popover>
    </div>
  </template>
  
  <script setup>
  import  { driver } from 'driver.js'
  import 'driver.js/dist/driver.css'
//   import steps from './steps'
  import { onMounted } from 'vue'
  import { FEEDBACK_URL } from '@/constans/index.js'
  
   /**
    * 引导页处理
    */

  const steps =  [
    {
        // 在哪个元素中高亮
        element: '.guide-home',
        // 配置对象
        popover: {
        // 标题
        title: 'logo',
        // 描述
        description: '点击可返回首页'
        }
    },
    {
        element: '.guide-search',
        popover: {
        title: '搜索',
        description: '搜索您期望的图片'
        }
    },
    {
        element: '.guide-theme',
        popover: {
        title: '风格',
        description: '选择一个您喜欢的风格',
        // 弹出的位置
        position: 'left'
        }
    },
    {
        element: '.guide-my',
        popover: {
        title: '账户',
        description: '这里标记了您的账户信息',
        position: 'left'
        }
    },
    {
        element: '.guide-start',
        popover: {
        title: '引导',
        description: '这里可再次查看引导信息',
        position: 'left'
        }
    },
    {
        element: '.guide-feedback',
        popover: {
        title: '反馈',
        description: '您的任何不满都可以在这里告诉我们',
        position: 'left'
        }
    }
    ]



  

    const driverObj = driver({
        // 禁止点击蒙版关闭
        allowClose: false,
        doneBtnText: '完成',
        nextBtnText: '下一个',
        prevBtnText: '上一个',
        steps
    });

   
  
  
//   /**
//    * 开始引导
//    */
  const onGuideClick = () => {
    driverObj.drive()
  }
  
//   /**
//    * 反馈处理
//    */
  const onToFeedback = () => {
    window.open(FEEDBACK_URL, '_blank')
  }
  </script>
  
  <style scoped>
  .driver-fix-stacking {
    position: fixed;
    z-index: 100004 !important;
  }
  </style>