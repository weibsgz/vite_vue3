### 初始化安装

- package.json 中 设置 `"dev": "vite --host",` 可设置本地 IP 地址

### 关于 tailwindcss

- 根据 tailwindcss 官网 配置`https://tailwindcss.com/docs/guides/vite#vue`
- 设置HTML的PX  （因为tailwindcss使用的是REM）
```
/**
 * 动态指定REM基准值 最大是40px
 * 
 */
export const useREM = ()=>{
    document.addEventListener('DOMContentLoaded',()=>{

        const html = document.querySelector('html');
        html.style.fontSize = window.innerWidth / 10 > MAX_FONT_SIZE ? MAX_FONT_SIZE + 'px' : window.innerWidth / 10 + 'px'

    })
}

//main.js
useREM()


//还没完，我们发现 tailwindcss的 预设字体还是太大了，我们需要自己修改他的预设字体大小
tailwindcss.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs:['0.25rem','0.35rem'],
        sm:['0.35rem','0.45rem'],
        base:['0.45rem','0.55rem'],
        lg:['0.55rem','0.65rem'],
        xl:['0.65rem','0.75rem'],
      }
    }
  },
  plugins: []
}
```

- 如果预设的CSS类名无法满足可以自定义
```
1.第一种情况
比如 right-0  无法满足  可以写成 right-[-1px] 他会自己解析成 right:-1px;

2.第二种情况
我想自己设置一个阴影的样式，就需要再tailwindcss.config.js 中配置
 boxShadow: {
    'l-white':'-10px 0 10px white',
 }

 这样设置后我们就可以在 加类名时候加上自己这个定义的 shadow-l-white

```

- last:mr-4 可以设置最后一个元素

- 通过给父元素设置 一个 group 类，在子元素的类添加 `group-hover:bg-white` 可以让鼠标经过父元素时候改变子元素的样式
```
 <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
   <input
          class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100
             group-hover:bg-white dark:group-hover:bg-zinc-900
                group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
            type="text"
            placeholder="搜索"           
    />
 </div>

```

- tailwind 换肤
1. 在 tailwind.config.js 中设置 `darkMode: 'class'` 
2. 在样式的class中 增加`dark:bg-zinc-800` 然后给html 增加`class="dark"`  or `class="light"`

- 如果想写媒体查询，比如你想针对PC的时候写一个样式（最小宽度是1280的时候）
`xl:mt-4`  xl代表@media 这就代表 最小宽度是1280时（PC端） margin-top:1rem



### 关于VueUse

- 提供了很多有用的vue方法 `https://vueuse.org/`
- 下面的列子是通过 useWindowSize的方法实时获取浏览器的宽

```
export const { width:windowWidth } = useWindowSize()


export const isMobile = computed(() => {
    // 实时的宽就代替了下面这种写法，可以动态的比较当前屏幕的宽和 PC_DEVICE_WIDTH 这个常量的宽
//   return document.documentElement.clientWidth < PC_DEVICE_WIDTH
    return windowWidth.value < PC_DEVICE_WIDTH
})


  //通过useScroll 可以获取滚动条滚动的距离
  const ulTarget = ref(null)
  const { x,y } = useScroll(ulTarget)


  //锁定滚动条

  const isLocked = useScrollLock(document.body);
  watch(() => props.modelValue, (value) => {
    isLocked.value = value
  }, { immediate: true });


  //点击目标区域以外的元素
  
  const containerRef = ref(null)
  onClickOutside(containerRef, (event) => isFocus.value = false)


  //useIntersectionObserver 来判断元素是否在可视范围
    用来做图片懒加载 / 滚动到列表底部触发loading（见到loading图标） 时候用



```

- 记录浏览器上次滚动的位置，回退时候回到该位置
```
/**
 * 记录页面滚动位置
 */
 const containerTarget = ref(null)
 const { y: containerTargetScrollY } = useScroll(containerTarget)
 // 被缓存的组件再次可见，会回调 onActivated 方法
 onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})



```





### 关于VITE

- vite构建的项目中`defineProps`无需导入，可以直接使用

- vite 想处理SVG还需要安装插件 `npm i --save-dev vite-plugin-svg-icons@2.0.1`
```
vite.config.js    https://github.com/vbenjs/vite-plugin-svg-icons

  plugins: [  
    vue(), 
    createSvgIconsPlugin({
      //指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',  //这个就对应svg-icon组件中 const symbolId = computed(() => `#icon-${props.name}`)
    })
  ],


  main.js

  import 'virtual:svg-icons-register' 

```



- vite 导入文件(类似于webpack的require.context) 需要结合 defineAsyncComponent

```
// import svgIcon from './svg-icon/index.vue'
// import popup from './popup/index.vue'
import {defineAsyncComponent} from 'vue'


const componets = import.meta.glob('./*/index.vue')
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

```






### 关于VUE3

- vite中创建一个全局组件

```

1. 导入组件并注册 

import svgIcon from './svgIcon/index.vue'

export default {
    install(app) {
        app.component('m-svg-icon', svgIcon)
    }
}

2. main.js中use
createApp(App).use(mLibs).mount('#app')




```

- webpack 中创建全局组件

```
import SvgIcon from "@/components/SvgIcon";

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context
const svgRequire = require.context("./svg", false, /\.svg$/);
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
console.log(svgRequire.keys()); //所有的SVG图标文件
svgRequire.keys().forEach((svgIcon) => {
  // console.log("..", svgRequire(svgIcon)); //接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
  svgRequire(svgIcon); //注册所有SVG图标 基于项目的真实路径
});

export default (app) => {
  app.component("svg-icon", SvgIcon);
};


```


- 通过`v-for`循环时候，用ref 设置循环体列表的所有元素的引用ref (https://cn.vuejs.org/guide/essentials/template-refs.html#refs-inside-v-for)
```
 <li v-for="item in list" ref="itemRefs">
      {{ item }}
 </li>

<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
//index是当前点击的元素的索引
const {left,width} = itemRefs.value[index].getBoundingClientRect()

</script>

```

- CSS可以使用 v-bind 绑定动态变量
```
<script setup>
  const duration = '0.5s'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
</style>
```

 - `libs/transition-router-view` 组件来单独处理移动端组件切换过渡效果
   1. 这个组件内部根据 vue-router官网提供给的方案 是自带<router-view />的，所以需要替换`APP.vue`里的 router-view `<m-transition-router-view :routerType="$store.getters.getRouterType" ></m-transition-router-view>`
   2. PC端下是不需要跳转动画的，这个`routerType`就代表 我们把动画分成三种类型 `push back none`,每个都有不同的样式特效，使用VUEX管理
   3. 在组件中需要 `router.push()`的地方 触发`store.commit('app_/changeRouterType', 'push')`
   4. 在组件中需要 `router.back()`的地方  触发`store.commit('app_/changeRouterType', 'back')`
   5. 在transition-router-view组件中 `<component class="fixed top-0 left-0 w-screen z-50" :is="Component" />` 增加这个样式
      的是因为在组件切换的时候，第一个组件在消失的过程中会把第二个组件顶到下边去
  
 - 关于`keep-alive`的页面缓存。这里的思路是（我感觉都给缓存了也问题不大啊，不太明白。）
 1. 首页永远在缓存。
 2. 使用一个数组记录组件，入栈出栈的情况。`<keep-alive :include="KeepAliveArr">`
 3. 每次进入一个新的组件。把新的组件push进KeepAliveArr，点击router.back的时候 pop这个数组最后一项出栈
 4. 避免都缓存了，假如 c 是文章详情页面，如果缓存了 c 则会导致你进入任何一个 c 都是同一个文章的详情
 5. 因为详情页的router只是ID不同，为了避免进入id不同的详情页出现缓存问的情况 还需要加入key，这样可以让
  vue-rourter识别出是不同的页面
 `<component :is="Component" :key="$route.fullPath"/>`







### 关于PC 和  M 的响应式处理

- 本项目判断PC 和 M 是 在`utils/flexlble.js` 中 通过屏幕宽度判断的
- 比如导航部分，采取的响应式策略是：
1. 两套代码，抽离公共部分 `views/main/components/navigation`
2. 需要的数据 通过VUEX管理




## 其他

- 如果因为数据请求慢 导致页面闪烁，可以先做一份假数据初始化时候渲染，然后存到storge里，下次进来从storge取
- 本项目使用了`vuex-persistedstate`来做数据持久化 ，他的作用是把vuex存入到缓存中，并在下次进页面时，从缓存中读取数据。
这个插件其实可以自己写 就是在store中写个plugins ,监听页面卸载时候 存 ，
```
const store = createStore({
  plugins:[fn]
})


export default funciton(store) {
  window.addEventLisener('beforeunload',()=>{
    localstorge.setItem(key,JSON.stringify(store.state))
  })

  const localdata = localstorge.getItem(key)
  if(localdata) {
    store.replaceState(JSON.parse(localdata))
  }
}

```


- 可通过 `window.matchMedia('(prefers-color-scheme: dark)').matches` 获取当前系统的主题是深色还是浅色
- `window.matchMedia('(prefers-color-scheme: dark)').onchange` 来监听当前系统的主题色的改变


- libs/confirm组件是通过render函数渲染的。他内部所引入的外部组件不能通过全局注册，必须单独引入。

- 小文件下载 file-saver
- 大文件下载 streamsaver


- vue-router的过渡动销，必须是组件间的切换才能生效，这是官网的列子
  ```
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  ```
  1. 从代码中可以看到，动画切换的关键是 <transition> 中 组件切换才能实现动画
  2. 本项目中 HOME 页面是一个 图片列表，他们其中某一张图片点击进入详情页，并不是两个组件间整体切换。而是某一部份（某张图）点击后打开一个新的组件
  3. 这种实用vue-router 的组件切换过渡动效不能生效
  3. 我们的解决方式是 ， 不去做真实的路由跳转 而是
  4. 第一步 先改变浏览器的URL （history.pushState()） 第二步实用GSAP 来实现动画。
  5. 如果已经点击打开了详情页弹窗，那么再刷新页面会导致白屏，这是因为没有对应的router来指定详情页的路由，我们就需要在router里设置详情页的路由



  - 使用vee-validate 作为表单验证插件

  - 比如一个input框 你连续两次选择相同的图片他第二次不会触发。
    需要手动清除input的value

    ```
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


    ```
    或者传统方法 先设置一个变量

    ```
      var isFirstSelection = true;
      
     document.getElementById("imageInput").addEventListener("change", function() {
        if (isFirstSelection) {
          isFirstSelection = false;
        } else {
          document.getElementById("imageInput").value = "";
        }

        var selectedFile = document.getElementById("imageInput").files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
          document.getElementById("selectedImage").src = e.target.result;
        }

        reader.readAsDataURL(selectedFile);
      });


    ```

- 使用dayjs做倒计时功能，需要引入dayjs的duration插件。来显示持续时间的格式（小时，分，秒）