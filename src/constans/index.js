export const PC_DEVICE_WIDTH = '1280'

export const MAX_FONT_SIZE = 40

export const ALL_CATEGORY_ITEM = {
    id:'all',
    name:'全部'
}

//按钮风格
// type 可选项：
export const typeEnum = {
    primary:
      'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
    main: 'text-white  bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
    info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 '
}


// size 可选项：表示按钮大小。区分文字按钮和icon按钮
export const sizeEnum = {
    default: {
      button: 'w-8 h-4 text-base',
      icon: '' //这个icon是用于icon按钮中的icon图标样式
    },
    'icon-default': {
      button: 'w-4 h-4',
      icon: 'w-1.5 h-1.5'
    },
    small: {
      button: 'w-7 h-3 text-base',
      icon: ''
    },
    'icon-small': {
      button: 'w-3 h-3',
      icon: 'w-1.5 h-1.5'
    }
}


// 暗黑主题
export const THEME_DARK = 'dark'
// 浅色主题
export const THEME_LIGHT = 'light'
// 系统主题
export const THEME_SYSTEM = 'system'


//category初始化数据，（防止闪烁）
export const INIT_CATEGORY =  [
  {
      "id": "web_app_icon",
      "name": "UI/UX",
      "col": 1,
      "urlname": "web_app_icon"
  },
  {
      "id": "design",
      "name": "平面",
      "col": 1,
      "urlname": "design"
  },
  {
      "id": "illustration",
      "name": "插画/漫画",
      "col": 1,
      "urlname": "illustration"
  },
  {
      "id": "photography",
      "name": "摄影",
      "col": 2,
      "urlname": "photography"
  },
  {
      "id": "games",
      "name": "游戏",
      "urlname": "games"
  },
  {
      "id": "anime",
      "name": "动漫",
      "urlname": "anime"
  },
  {
      "id": "industrial_design",
      "name": "工业设计",
      "col": 2,
      "urlname": "industrial_design"
  },
  {
      "id": "architecture",
      "name": "建筑设计",
      "urlname": "architecture"
  },
  {
      "id": "art",
      "name": "人文艺术",
      "urlname": "art"
  },
  {
      "id": "home",
      "name": "家居/家装",
      "col": 1,
      "urlname": "home"
  },
  {
      "id": "apparel",
      "name": "女装/搭配",
      "col": 1,
      "urlname": "apparel"
  },
  {
      "id": "men",
      "name": "男士/风尚",
      "col": 2,
      "urlname": "men"
  },
  {
      "id": "modeling_hair",
      "name": "造型/美妆",
      "urlname": "modeling_hair"
  }]


  // 兔小巢反馈地址
export const FEEDBACK_URL = 'https://support.qq.com/product/383681'

// 登录方式
export const LOGIN_TYPE_USERNAME = 'username'
export const LOGIN_TYPE_OAUTH_NO_REGISTER_CODE = 204
export const LOGIN_TYPE_QQ = 'QQ'
export const LOGIN_TYPE_WX = 'WX'