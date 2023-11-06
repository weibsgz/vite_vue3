// import svgIcon from './svg-icon/index.vue'
// import popup from './popup/index.vue'
import {defineAsyncComponent} from 'vue'

//这些组件是用vnode + render 方式导出的
export {confirm} from './confirm/index.js'
export {message} from './message/index.js'


const componets = import.meta.glob('./*/index.vue')

// console.log(Object.entries(componets))
export default {
    install(app) {
        // app.component('m-svg-icon', svgIcon)
        // app.component('m-popup', popup)

        for (const [path,fn] of Object.entries(componets)) {
            const componetName = path.split('/')[1]
      
            app.component('m-'+componetName, defineAsyncComponent(fn))
        }

    }
}