<template>
    <div class="overflow-auto relative flex flex-col items-center">
        <!-- M端下的删除按钮 -->
      <m-svg-icon
        v-if="isMobile"
        name="close"
        class="w-3 h-3 p-0.5 m-1 ml-auto"
        fillClass="fill-zinc-900 dark:fill-zinc-200 "
        @click="close"
      ></m-svg-icon>
  
      <img class="" ref="imageTarget" :src="blob" />
  
      <m-button
        class="mt-4 w-[80%] xl:w-1/2"
        :loading="loading"
        @click="onConfirmClick"
      >
        确定
      </m-button>
    </div>
</template>

<script>
const EMITS_CLOSE = 'close'

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>

<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { isMobile } from '@/utils/flexlble'
    import 'cropperjs/dist/cropper.css';
    import Cropper from 'cropperjs';


    defineProps({
        blob: {
            type: String,
            required: true
        }
    })

    const emits = defineEmits([EMITS_CLOSE])

    /**
     * 确定按钮点击事件
    */
    const loading = ref(false)
    const onConfirmClick = () => {
        loading.value = true
        // 获取裁剪后的图片 通过canvas.toBlob获取
        cropper.getCroppedCanvas().toBlob((blob) => {
            // 裁剪后的 blob 地址
            console.log(URL.createObjectURL(blob),new File([blob], "test.png", {type:"image/png"}))
            // putObjectToOSS(blob)
        })
    }




    /**
     * 处理图片裁剪
     */
    const imageTarget = ref(null)
    let cropper = null
    onMounted(() => {
        cropper = new Cropper(imageTarget.value, isMobile.value ? mobileOptions : pcOptions);
    })


    /**
        * 关闭事件
    */
    const close = () => {
        emits(EMITS_CLOSE)
    }
</script>