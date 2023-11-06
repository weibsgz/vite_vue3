<template>
    <div>
       
      <m-long-list v-model="loading" :isFinished="isFinished" @onload="getPexelsListData">
        <!--data代表传入瀑布流的数据，nodeKey 是循环绑定的key  column是列数  picturePreLoading是否需要预加载图片-->
        <m-waterfall  class="px-1 w-full"
                      :data="pexelsList"
                      nodeKey="id"
                      :column="isMobile ? 2 : 5"
                      :picturePreLoading="false"
                       

        >
            <!--
                作用域插槽 向组件内部的插槽提供 item数据和 每个图片的宽度
                在子组件内部可以获取每个ITEM 通过作用域插槽把他给父组件，父组件拿到这个ITEM 给 itemVue插件渲染 
                他之所以不在子组件内部直接引入itemVue这个组件，我感觉可能想分离瀑布流组件和 itemVue组件,这来组件
                确实应该分离定义。
            -->
            <template v-slot:default="{item,width}">
                <itemVue  :data="item" :width="width" @clickPic="onToPins"></itemVue>
            </template>
        </m-waterfall>
    </m-long-list>


   
    <!-- https://play.vuejs.org/#eNqNVF1v0zAU/SsmCHWT2iRrmZhCN8bQHkCIIdgDSHlxk5vUq2NbttN1qvrfuXaSNpmg7KnxuR/n+Nxbb4OPSoXrGoIkmJtMM2WJAVurq1SwSkltyZZoKMiOFFpWZISpo32oNFS1uPvEQCoyKQz2WMpHcukqT6yu4dRFilpklklBpLiBQmq4FRb0CfBTsk0F8d1CJEdk3CCEmIxy+JWQOJyej3vQ7wEkFc2YfUrImTvvkG3nPgaUHdmY5FJAn9LKPmNea+pKsFmfEDUMziigOx/YWwCogYSMgFNjWRYycVfbk2l4PiZnp6OuSHySleJgMdMJ6gkfyP4KdA1D2ak9KjsO371Q+CYhszh+iehO3X8cw5G03XLsg47EWP/MpI7viAHzqNlE3EE8WMA0agFPhMwXtbVozHXGWba6TIN20V653zS4updlyWEeNWm+ARbdayoMcxob7uuF378JuJ3AJoOFTIM26RAd4tyNxON+OB2eZMYgWlBuWswrRvqcrUmGvrqw82+ykJs0IOsJK9oboPJ5hGnNHaODXgTmUc8BPBr7xN1n2LVq5rCg2arUshZ5Ql6/nS4uLmbvHV5RXTIxsVIlZBqrjQcfWW6XbvrteQmsXNoesJA6Bz3RNGe1Sch5/AbhZjQtfTAOmldgUuFGPBgp8AnxStI2YNIg6XakubgD0mBprTJJFNVCrcowk1XkYh8qmde8dQ6ZdkhgDb4mBSuftccSxTjoO+UsGtJQzuXjF4+5h6ddNqxZQrb6C/5gcBRO1XcNBrQb5z5m0TqwTfj25zfY4Pc+2Mk9EvwBRvLar51Pu8HhoOxenlf72bvFRHlvbjcWcPLtpZxQ74bPTwN8e91/5l9XP8idhbO9i7s/pIvnyQ== -->
    <!-- https://cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks -->
    <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        :css="false"
    >
        <pins v-if="isVisible" :id = "currentItem.id"></pins>
    </Transition>

    </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels.js'
import itemVue from './item.vue'
import {ref,watch} from 'vue'
// import mWaterfall from '@/libs/waterfall/index.vue'
import {isMobile} from '@/utils/flexlble.js'
import gsap from 'gsap'
import {useStore} from 'vuex'
import pins from '@/views/pins/components/pins.vue'



const store = useStore()

let query = {
    page: 1,
    size:20
}
const pexelsList = ref([])

const loading = ref(false)
const isFinished = ref(false)

const getPexelsListData = async () => {
    console.log('getPexelsListData.............')
    if(isFinished.value) {
        return 
    }
    //完成第一次请求后，page自增1
    if(pexelsList.value.length > 0) {
        query.page += 1
    }
    const res = await getPexelsList(query)
    if(query.page=== 1) {
        pexelsList.value = res.list;
    }else {
        pexelsList.value = [...pexelsList.value,...res.list]
    }

    //判断数据是否全部加载完成
    if(res.total === pexelsList.value.length) {
        isFinished.value = true
    }
    //结束一次请求
    loading.value = false
    
}


const resetQuery = (newVal) => {
    query  =  {
        ...query,
        ...newVal
    }
    isFinished.value = false;
    pexelsList.value = []
}

//监听getters 需要用函数返回的形式

// 清空数据后，waterfall里边会根据数据改变，高度会归0，long-list会重新渲染
watch(() => store.getters.getCurrentCategory, (value) => {
    console.log('value',value)
    resetQuery({
        page: 1,
        categoryId:value.id
    })

})


//监听搜索文本的变化

watch(() => store.getters.getSearchText, (value) => {
    console.log('搜索文本变化')
    resetQuery({
        page: 1,
        searchText:value
    })
})

/**
 * 进入详情页
 * 需要记录点击图片中心点的位置  比如横向的位置，是 图片距离左边的距离+ 图片的宽度的一半
 * 
 */

 const isVisible = ref(false)
 const currentItem = ref({})

/**
 * 监听浏览器后退按钮事件
 */

window.addEventListener('popstate', function(event) {
  // 在这里执行刷新页面的逻辑
  // 例如，重新加载页面或执行其他操作

  isVisible.value = false
});




const onToPins = (item) => {
    /**
     * 详见README中的原因，这里通过修改URL 和 用GSAP 动画来实现进入详情页。
     * 
     * gsap.set()代表动画起始的状态  gsap.to()代表动画结束的状态，指定了这俩状态后gsap会基于这俩状态补全中间的动画。
     */
    history.pushState(null,null,`/pins/${item.id}`)
     isVisible.value = true;
     currentItem.value = item;

    console.log(item)

    
}


const onBeforeEnter = (el) => {
    //将GSAP动画的位置移动至 点击图片的中心点
    gsap.set(el,{
        scaleX:0,
        scaleY:0,
        transformOrigin:'0 0',
        translateX:currentItem.value.location.translateX,
        translateY:currentItem.value.location.translateY,
        opacity:0
    })
}

const onEnter = (el,done) => {
    //调用回调函数 done 表示过渡结束
    gsap.to(el,{
        scaleX:1,
        scaleY:1,
        duration:0.5,
        translateX:0,
        translateY:0,      
        opacity:1,
        onComplete:done
    })
}
//点击关闭详情页按钮，或者点击浏览器后退按钮触发LEAVE
const onLeave = (el,done) => {
    gsap.to(el,{
        scaleX:0,
        scaleY:0,
        duration:0.5,
        translateX:currentItem.value.location.translateX,
        translateY:currentItem.value.location.translateY,   
        opacity:0,
        onComplete:done
    })
}


</script>