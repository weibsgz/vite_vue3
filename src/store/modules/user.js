import md5 from 'md5'
import { loginUser, getProfile, registerUser } from '@/api/sys'
import { message } from '@/libs/message'


export default {
    //独立作用域
    namespaced: true,
    state:()=>{
        return {
           //登录的token
           token:'',
           //获取用户信息
           userInfo:{},
        }
    },
    mutations: {
        /**
         * 保存 token
        */
        setToken(state,token){
            state.token = token
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        }

    },
    actions: {

     /**
         * 注册
     */
     async register(context,payload){
        const {password} = payload

        return await registerUser({
            ...payload,
            password: password ? md5(password) : ''
        })
     },


       async login(context,payload){
            //加密密码
            const {password} = payload
            const data = await loginUser({
                ...payload,
                //因为微信登录和QQ登录是没有密码的
                password:password ? md5(password) : ''
            })  
            
            context.commit('setToken',data.token)
            context.dispatch('getProfile')
        },
        /**
         * 获取用户信息         * 
         */
        async getProfile(context){
            const data = await getProfile()
            context.commit('setUserInfo',data)
            message('success', `欢迎 ${data.vipLevel
                ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
                : data.nickname}`)
        },

        /**
         * 退出登录
         */
        logout(context){
            context.commit('setToken','')
            context.commit('setUserInfo',{})
            location.reload();
        }
    }
}