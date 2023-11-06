import {createRouter,createWebHistory } from 'vue-router'
import {isMobile} from "@/utils/flexlble.js"
import mobileRoutes from '@/router/modules/m-router.js'
import pcRoutes from '@/router/modules/pc-router.js'

const router = createRouter({
  history: createWebHistory (),  
  routes: isMobile.value ? mobileRoutes : pcRoutes
})

export default router