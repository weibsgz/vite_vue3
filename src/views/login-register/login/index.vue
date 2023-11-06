<template>
    <div
       class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
     >
        <!-- 头部图标：PC端 -->
        <div class="hidden pt-5 h-8 xl:block">
            <img
            v-lazy
            class="m-auto"
            src="https://res.lgdsunday.club/signlogo.png"
            alt=""
            />
        </div>
        <!-- 头部图标：移动端 -->
        <div class="h-[111px] xl:hidden">
            <img
                v-lazy
                class="dark:hidden"
                src="https://res.lgdsunday.club/login-bg.png"
                alt=""
            />
            <img
                v-lazy
                class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
                src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
                alt=""
                srcset=""
            />
        </div>
        <!-- 表单区 -->
        <div class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
            <h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">
                账号登录
            </h3>

            <VeeForm @submit="onLoginHandler">
                <VeeField 
                    :rules="validateUsername" 
                     v-model="loginForm.username"
                     name="username" 
                     placeholder="用户名" 
                     autocomplete="on"
                     class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900" 
                />
                <VeeErrorMessage name="username"  class="text-sm text-red-600 block mt-0.5 text-left" ></VeeErrorMessage>

                <VeeField  
                    class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
                    type="password" 
                    v-model="loginForm.password"
                    name="password" 
                    placeholder="密码" 
                    autocomplete="on" 
                    :rules="validatePassword"
                />
                <VeeErrorMessage name="password" class="text-sm text-red-600 block mt-0.5 text-left"></VeeErrorMessage>
                <!-- 注册按钮 -->
                <div class="pt-1 pb-3 leading-[0px] text-right">
                    <a
                        class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
                        @click="onToRegister"
                    >
                        去注册
                    </a>
                </div>
                <m-button
                    class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
                    :loading="loading"
                    :isActiveAnim="false"
                    >
                    登录
                </m-button>
        
            </VeeForm>
            <div class="flex justify-around mt-4">
                <!-- QQ -->
                <m-svg-icon
                    class="w-4 cursor-pointer"
                    name="qq"
                    @click="onQQLogin"
                ></m-svg-icon>
                <!-- 微信 -->
                <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
            </div>


        </div>
        <!-- 人类行为验证模块 -->
        <sliderCaptcha 
            v-if="isSliderCaptchaVisible"
            @close="isSliderCaptchaVisible = false"
            @success="onCaptchaSuccess"
        >
        
        </sliderCaptcha>
        
    </div>
</template>


<script setup>
import {ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { 
            Field as VeeField, 
            Form as VeeForm, 
            ErrorMessage as VeeErrorMessage
        } from 'vee-validate';
import sliderCaptcha from './slider-captcha.vue';
import { LOGIN_TYPE_USERNAME } from '@/constans/index.js'

const store = useStore()
const router = useRouter()

/**
 * 验证规则
 */

const validateUsername = (value) => {
    if (!value) {
        return '用户名为必填的' 
    }

    if(value.length < 3 || value.length > 12){
        return '用户名为3~12位'
    }
    return true;
}
const validatePassword = (value) => {
  if (!value) {
    return '密码为必填的'
  }

  if (value.length < 6 || value.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}

/**
 * 登录逻辑
 * 
 */
// 登录时的 loading
const loading = ref(false)
// 用户输入的用户名和密码
const loginForm = ref({
  username: 'LGD_Sunday',
  password: '123123'
})

 // 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref(false)


const onLoginHandler = (val) => {
  console.log(val)
  isSliderCaptchaVisible.value = true;
}

/**
 * 人类行为验证通过
 */
 const onCaptchaSuccess = () => {
    isSliderCaptchaVisible.value = false
    // 登录操作
    onLogin()
}


const onLogin = () => {
    loading.value = true
    
    try{
        store.dispatch('user_/login', {
            ...loginForm.value,
            loginType: LOGIN_TYPE_USERNAME
        })

    }catch(e){
        
    }finally{
        loading.value = false
    }
    router.push('/')
}

const onToRegister = () => {
    store.commit('app_/changeRouterType', 'push')
    router.push('/register')
}

</script>