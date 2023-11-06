import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import {useREM} from '@/utils/flexlble.js'
import mLibs from '@/libs/index.js'
import mDirectives from '@/directives/index.js'
import './permission.js'

//注册svg-icon https://github.com/vbenjs/vite-plugin-svg-icons
import 'virtual:svg-icons-register'

useREM()
//用createApp(app).use(fn) 那么这个FN里必须包含一个install
createApp(App).use(router).use(store).use(mDirectives).use(mLibs).mount('#app')
