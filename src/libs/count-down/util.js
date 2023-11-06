import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration  from 'dayjs/plugin/duration'

dayjs.locale('zh-cn')
//安装插件 持续时间插件用来获取时分秒
dayjs.extend(duration)

export default dayjs