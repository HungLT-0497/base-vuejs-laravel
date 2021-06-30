import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/vi'
moment.locale('vi')

Vue.filter('NumberFormat', function (value) {
    if (!value) {
        return '0'
    }
    const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

Vue.filter('ConvertDateTime', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (dataStr)
        return moment(dataStr,pattern).format('HH:mm:ss DD-MM-YYYY')
    return ''
})
Vue.filter('timestampToDatetime', function (value) {
    var dateString = moment.unix(value).format("HH:mm:ss MM/DD/YYYY");
    return dateString
})
