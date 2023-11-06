<template>
    <div
      class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
    >
      <div
        class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
      >
        <!-- 移动端 navbar -->
        <m-navbar sticky v-if="isMobile" :clickLeft="onNavbarLeftClick">
          个人资料
        </m-navbar>
        <!-- pc 端 -->
        <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
          个人资料
        </div>
        <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
          <!-- 头像 -->
          <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
            <span
              class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
              >我的头像</span
            >
            <!-- 头像部分 -->
            <div
              class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
              @click="onAvatarClick"
            >
              <img
                v-lazy
                :src="$store.getters.getUserInfo.avatar"
                alt=""
                class="rounded-[50%] w-full h-full xl:inline-block"
              />
              <div
                class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block"
              >
                <m-svg-icon
                  name="change-header-image"
                  class="w-2 h-2 m-auto mt-2"
                ></m-svg-icon>
                <div
                  class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
                >
                  点击更换头像
                </div>
              </div>
            </div>
            <!-- 隐藏域 -->
            <input
              v-show="false"
              ref="inputFileTarget"
              type="file"
              accept=".png, .jpeg, .jpg, .gif"
              @change="onSelectImgHandler"
            />
            <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
              支持 jpg、png、jpeg 格式大小 5M 以内的图片
            </p>
          </div>
          <!-- 用户名 -->
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
              >用户名</span
            >
            <m-input
              v-model="userInfo.nickname"
              class="w-full"
              type="text"
              max="20"
            ></m-input>
          </div>
          <!-- 职位 -->
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
              >职位</span
            >
            <m-input
              v-model="userInfo.title"
              class="w-full"
              type="text"
            ></m-input>
          </div>
          <!-- 公司 -->
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
              >公司</span
            >
            <m-input
              v-model="userInfo.company"
              class="w-full"
              type="text"
            ></m-input>
          </div>
          <!-- 个人主页 -->
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
              >个人主页</span
            >
            <m-input
              v-model="userInfo.homePage"
              class="w-full"
              type="text"
            ></m-input>
          </div>
          <!-- 个人介绍 -->
          <div class="py-1 xl:flex xl:my-1">
            <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
              >个人介绍</span
            >
            <m-input
              v-model="userInfo.introduction"
              class="w-full"
              type="textarea"
              max="50"
            ></m-input>
          </div>
          <!-- 保存修改 -->
          <m-button
            class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
            :loading="loading"
            @click="onChangeProfile"
            >保存修改</m-button
          >
          <!-- 移动端退出登录 -->
          <m-button
            v-if="isMobile"
            class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
            @click="onLogoutClick"
          >
            退出登录
          </m-button>
        </div>
      </div>
  
      <!-- PC 端 -->
      <m-dialog v-if="!isMobile" v-model="isDialogVisible">      
        <change-avatar-vue
          :blob="currentBolb"
          @close="isDialogVisible = false"
        ></change-avatar-vue>
      </m-dialog>
      
      <!-- 移动端-->
      <m-popup  v-else
                :class="{ 'h-screen': isDialogVisible }"
                v-model="isDialogVisible"
      >
        <change-avatar-vue
          :blob="currentBolb"
          @close="isDialogVisible = false"
        ></change-avatar-vue>
      </m-popup>
    </div>
  </template>

<script>
export default {
  name: 'profile'
}
</script>

<script setup>
    import { ref, watch } from 'vue'
    import { putProfile } from '@/api/sys'
    import { isMobile } from '@/utils/flexlble'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { message, confirm } from '@/libs'
    import changeAvatarVue from './components/change-avatar.vue'

    console.log('message', message)
    const store = useStore()
    const router = useRouter()
    /**
     * 数据本地的双向同步，增加一个单层深拷贝
     * 因为 template 上不能直接绑定vuex里的值，如果那样的话会造成VUEX的值不是通过mutation改变的
     */
    // 头像 dialog 展示
    const isDialogVisible = ref(false)

    const userInfo = ref({ ...store.getters.getUserInfo })
    /**
     * 修改个人信息
     * 
     */

     const loading = ref(false)
     const onChangeProfile = async () => {
        loading.value = true    
        try{
            await putProfile(userInfo.value)
            message('success','用户信息修改成功')
            store.commit('user_/setUserInfo',userInfo.value)
        }catch(err){
            message('error','修改失败')
        }
        finally{
            loading.value = false
        }
        
        
      
    }



    /**
     * 头像选择之后的回调
     */

    // 选中的图片
    const currentBolb = ref('')
    const inputFileTarget = ref(null)

    const onAvatarClick = () => {
        console.log('onAvatarClick')
        inputFileTarget.value.click()
    }


    const onSelectImgHandler = (e) => {
        // 获取选中的文件
        const imgFile = inputFileTarget.value.files[0]

        console.log(e.target.files[0],imgFile) //一样

        // 生成 blob 对象
        const blob = URL.createObjectURL(imgFile)
        console.log(blob)
        // 获取选中的图片
        currentBolb.value = blob
        // 展示 Dialog
        isDialogVisible.value = true
    }

    /**
     * 当连续2次选择同一张图片的时候，input 的  change不会被触发
     * 
     */
     watch(isDialogVisible, (val) => {
        if (!val) {
            // 防止 change 不重复触发
            inputFileTarget.value.value = null
        }
    })




    /**
     * 移动端：退出登录
    */
    const onLogoutClick = () => {
        confirm('确定要退出登录吗？').then(() => {
            store.dispatch('user_/logout')
        })
    }

    /**
    * 移动端后退处理
    */
    const onNavbarLeftClick = () => {
        // 配置跳转方式
        store.commit('app_/changeRouterType', 'back')
        router.back()
    }



</script>