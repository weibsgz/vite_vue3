import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
console.log(__dirname,process.cwd())
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [  
    vue(), 
    createSvgIconsPlugin({
      //指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',  //这个就对应svg-icon组件中 const symbolId = computed(() => `#icon-${props.name}`)
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club',
        changeOrigin: true
      }
    }
  }
})
