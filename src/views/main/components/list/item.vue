<template>
   <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">    
        <div class="relative w-full rounded cursor-zoom-in group"
             :style="{backgroundColor: createRandomColor()}"
             @click="onToPinsClick"
        >   
         <!-- 图片根据传进来的宽度，计算出实际的高度（宽高比） -->
            <img  
                v-lazy      
                ref="imgTarget"
                class="w-full rounded bg-transparent"
                :src="data.photo" 
                :style="{
                    height:(width/data.photoWidth) * data.photoHeight + 'px',
                }"
            />
            <!-- 遮罩层 hidden 是移动端下隐藏，xl:block pc端显示-->
            <div
                class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
            >
                <m-button class="absolute top-1.5 left-1.5" @click=""
                >分享</m-button
                >
                <m-button
                class="absolute top-1.5 right-1.5"
                type="info"
                icon="heart"
                iconClass="fill-zinc-900 dark:fill-zinc-200"
                />
                <m-button
                class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
                type="info"
                size="small"
                icon="download"
                iconClass="fill-zinc-900 dark:fill-zinc-200"
                @click="onDownload"
                />
                <m-button
                class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
                type="info"
                size="small"
                icon="full"
                iconClass="fill-zinc-900 dark:fill-zinc-200"
                @click="onFullScreen"
                />
            </div>
        </div>
        <!-- 标题 -->
        <p
            class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1"
            alt
        >
        {{ data.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
            <img v-lazy   class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
            <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
        </div>
    </div>
</template>


<script setup>
import {onMounted,ref} from 'vue'
import FileSaver  from 'file-saver'

import {createRandomColor} from '@/utils/color'
import {message} from '@/libs/message'


const emits = defineEmits(['clickPic'])

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    width: {
        type: Number,
    }
})

onMounted(() => {
    message('success', '图片下载中')
})

const onDownload = () => {
    /**
     * params1 : 图片地址
     * params2 : 图片名称
     */
    
    FileSaver.saveAs(props.data.photoDownLink);
}



/**
 * 全屏
 */
const imgTarget = ref(null)


// 点击全屏
const onFullScreen = () => {
    console.log(imgTarget)
  if (imgTarget.value.requestFullscreen) {
    imgTarget.value.requestFullscreen();
  } else if (imgTarget.value.mozRequestFullScreen) { /* Firefox */
    imgTarget.value.mozRequestFullScreen();
  } else if (imgTarget.value.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    imgTarget.value.webkitRequestFullscreen();
  } else if (imgTarget.value.msRequestFullscreen) { /* IE/Edge */
    imgTarget.value.msRequestFullscreen();
  }
}


/**
 * 点击图片进入详情页
 * 需要记录点击图片中心点的位置  比如横向的位置，是 图片距离左边的距离+ 图片的宽度的一半
 */

const onToPinsClick = () => {

    const {left,width,height,top} = imgTarget.value.getBoundingClientRect();
 
    emits('clickPic', {
        id: props.data.id,
        location:{
            translateX: parseInt(left + width / 2),
            translateY: parseInt(top + height / 2)
        }
    })

    
}


</script>