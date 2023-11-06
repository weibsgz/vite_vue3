import router from '@/router'
import store from '@/store'


router.beforeEach((to, from, next) => {
    if(to.meta.user) {
        if(store.getters.getToken) {
            next()
        }else {
            next({
                path: '/login'               
            })
        }
    }else {
        next()
    }
})