<template>
    <!-- 因为瀑布流是脱离文档流的，所以容器的高度撑不起来，所以需要计算高度 -->
    <div class="relative"  ref="containerTarget"
        :style="{height:containerHeight+'px'}"
    >
        <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
        <template v-if="columnWidth  && data.length">
            <!-- 通过动态的 style 来去计算对应的列宽、left、top -->
            <div
                class="m-waterfall-item absolute duration-300"
                :style="{
                    width: columnWidth + 'px',
                    left: item._style?.left + 'px',
                    top: item._style?.top + 'px'
                }"
                v-for="(item, index) in data"
                :key="nodeKey ? item[nodeKey] : index"
            >
            <slot :item="item" :width="columnWidth" :index="index" />
            </div>
        </template>
        <!-- 加载中 -->
        <div v-else>加载中...</div>
    </div>
</template>


<script setup>
    import {ref , computed, onMounted,nextTick ,watch,onUnmounted} from 'vue'
    import { getImgElements, getAllImg,onCompleteImgs,getMaxHeight,getMinHeightColumn,getMinHeight } from './utils.js'

    // import itemVue from '@/views/main/components/list/item.vue'
// data代表传入瀑布流的数据，nodeKey 是循环绑定的key  column是列数  picturePreLoading是否需要预加载图片
    const props = defineProps({
        data: {
            type: Array,
            required: true
        },
        nodeKey: {
            type: String
        },
        column: {
            default: 2,
            type: Number
        },
        //列间距
        columnSpacing: {
            default: 20,
            type: Number
        },
        //行间距
        rowSpacing: {
           default: 20,
           type: Number 
        },
        picturePreLoading: {
            type: Boolean,
            default: false
        }
    })


    //容器总高度 = 最高的列高度
    const containerHeight = ref(0)
    //记录每列高度
    const columnHeightObj = ref({})
    /**
     * 构建记录各列的高度的对象。
     * key 是所在列  value 是所在列的高度
     */
    const useColumnHeightObj  = () => {
        columnHeightObj.value = {}
        for(let i = 0; i < props.column; i++) {
            columnHeightObj.value[i] = 0
        }
      
    }

    // 容器实例
    const containerTarget = ref(null)
    // 容器总宽度(不包含 padding、margin、border)   
    const containerWidth = ref(0)
    // 容器左边距，计算 item left 时，需要使用定位
    const containerLeft = ref(0)

    /**
     * 计算容器宽度
     */
    const useContainerWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(
        containerTarget.value,
        null
    )
    // 容器左边距
    containerLeft.value = parseFloat(paddingLeft)
    // 容器宽度
    containerWidth.value =
        containerTarget.value.clientWidth -
        parseFloat(paddingLeft) -
        parseFloat(paddingRight)
    }

    // 计算每一列的宽度，每一列等宽！
    const columnWidth = ref(0)
    // 列间距合计
    const columnSpacingTotal = computed(() => {
    // 如果是5列，则存在 4 个列间距
        return (props.column - 1) * props.columnSpacing
    })

    /**
     * 开始计算
     */

     const useColumnWidth = () => {
        // 获取容器宽度
        useContainerWidth()
        // 计算 每列宽
        columnWidth.value =
            (containerWidth.value - columnSpacingTotal.value) / props.column

    
     }

     onMounted(() => {
        // 计算列宽
        useColumnWidth()
        
     })


     //处理需要预加载图片的情况

     //1. item 高度集合
     let itemHeights = []
     /**
      * 监听图片加载完成(需要图片预加载的情况)
      */
     const waitImgComplete = () => { 
        //获取所有瀑布流元素
        const itemElements = [...document.getElementsByClassName('m-waterfall-item')];
      
  
        //获取所有IMG标签
        const imgElements = getImgElements(itemElements);
      
       console.log('imgElements',imgElements)
        //获取所有IMG图片
        const allImgs = getAllImg(imgElements)
       console.log('allImgs',allImgs)
   
        //等待图片加载完成
        onCompleteImgs(allImgs).then(()=>{
            //图片加载完成，可以获取每个图片的高度
            itemElements.forEach(el=>{
                itemHeights.push(el.offsetHeight)
            })
          
            //渲染瀑布流每个元素的位置
            useItemLocation()
        })
        
     }

     /**
      * 不需要图片预加载
      */

      const useItemHeight = () => {
        console.log('useItemHeight')
         //获取所有瀑布流元素
         const itemElements = [...document.getElementsByClassName('m-waterfall-item')];
         itemElements.forEach(el=>{
                itemHeights.push(el.offsetHeight)
         })

         useItemLocation()
      }


     /**
      * 渲染瀑布流每个元素的位置
      */

      const useItemLocation = () => {
        console.log('useItemLocation')
        // 遍历数据源
        props.data.forEach((item, index) => {
            // 避免重复计算
            if (item._style) {
                return
            }
            // 生成 _style 属性
            item._style = {}
            // left
            item._style.left = getItemLeft()
            // top
            item._style.top = getItemTop()
            // 每次插入一个ITEM 后 列高度自增
            increasingHeight(index)
        })

        // 指定容器高度
        containerHeight.value = getMaxHeight(columnHeightObj.value)
      }






        /**
         * 返回下一个 item 的 left
         */
        const getItemLeft = () => {
            // 假射第一行已经插完了，那么下一个要插的元素的 left 就是 上一列最小高度所在的列 * (列宽 + 间距)

            //拿到 最小高度的列
            const column = getMinHeightColumn(columnHeightObj.value)
            return (
                column * (columnWidth.value + props.columnSpacing) + containerLeft.value
            )
        }

        /**
         * 返回下一个 item 的 top
         */
        const getItemTop = () => {
            // 列高对象中的最小的高度
            return getMinHeight(columnHeightObj.value)
        }


         /**
         * 指定列高度自增
         */
        const increasingHeight = (index) => {
            // 最小高度所在的列 插入ITEM后 需要增加高度
            const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
            // 该列高度自增
            columnHeightObj.value[minHeightColumn] +=
            itemHeights[index] + props.rowSpacing
        }

        /**
         * 在组件销毁时，清除所有的 _style
         */
        onUnmounted(() => {
            props.data.forEach((item) => {
                delete item._style
            })
        })


      watch(()=>props.data,(newVal)=>{
            console.log('watch props.data')
        // //第一次获取数据时，构建高度记录容器 如果所有数据都不包含style 则开始构建
            const resetColumnHeight = newVal.every((item) => !item._style)
            if (resetColumnHeight) {
                // 构建高度记录容器
                useColumnHeightObj()
            }

            nextTick(() => {
                console.log('nextTick',props.picturePreLoading)
                if(props.picturePreLoading){
                    waitImgComplete()
                }else {
                    useItemHeight()
                }
            })


      },{
        deep:true,
        immediate:true
     })


     /**
         * 响应式布局 监听列数变化，重新构建瀑布流
     */

     const reset = () => {
        console.log('reset')
        setTimeout(() => {
            // 重新计算列宽
            useColumnWidth()
            // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
            props.data.forEach((item) => {
                item._style = null
            })
        }, 200)
     }

     watch(()=>props.column,(newVal)=>{
        console.log('watch props.column')
        if(props.picturePreLoading){
            // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
            columnWidth.value = 0
            // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
            nextTick(reset)
        }else {
            reset()
        }
        
     })

</script>