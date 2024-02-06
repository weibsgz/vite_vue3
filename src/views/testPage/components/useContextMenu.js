
import {ref , onMounted  ,onUnmounted} from 'vue'

export default function useContextMenu(container) {
     

    console.log('use-container',container)
    //菜单的位置信息 是否可见
    const x = ref(0);
    const y = ref(0);
    const isVisible = ref(false)

    //打开菜单
    function showMenu(e) {
     
        e.preventDefault();

        //写这个阻止冒泡是为了那种嵌套区域的菜单 防止打开俩菜单。
        e.stopPropagation()
        x.value = e.pageX;
        y.value = e.pageY;
        isVisible.value = true;
        console.log('触发右键', x.value)
    }

    //关闭菜单
    function closeMenu() {
        isVisible.value = false
    }


    onMounted(() => {
        //关闭菜单的情况 1，点击菜单，2 打开一个新的菜单
        // 先关闭所有的，再打开,需要在捕获阶段执行。否则先打开菜单 又冒泡到window上被关闭了。等于没打开菜单

        window.addEventListener('contextmenu',closeMenu,true)
        window.addEventListener('click',closeMenu,true)
        container.value.addEventListener('contextmenu',showMenu)

        
      })

    onUnmounted(()=>{
        container.value.removeEventListener('contextmenu',showMenu)
    })

    return {
        x:x,
        y:y,
        menuVis:isVisible
    }
}