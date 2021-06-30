import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import {Vietnamese} from "flatpickr/dist/l10n/vn";
Vue.use(Vuex)


const event_types = [
    'Event mới', 'Event hot', 'Gửi notification cho all user', 'facebook', 'Khách hàng thân thiết'
]
const giftcode_types = [
    {

        key: "for_one",
        value: 'Code riêng'
    },
    {
        key: 'for_many',
        value: 'Code chung'
    }
]
const condition_types = [
    {
        key: 'like-in',
        value: 'Like bài viết trong sự kiện',
        tag: 'facebook'
    },
    {
        key: 'after-end',
        value: 'Code được phát sau khi kết thúc sự kiện.',

    },
    {
        key: 'comment-in',
        value: 'Bình luận bài viết trong sự kiện',
        tag: 'facebook'
    },
    {
        key: 'play',
        value: 'Chơi game',
    },
    {
        key: 'vip',
        value: 'Đạt cấp vip',
        tag: 'khtt'
    },
    {
        key: 'vip-play',
        value: 'Chơi game và là vip',
        tag: 'khtt'
    },
    {
        key: 'pay',
        value: 'Đạt tổng nạp tối thiểu',
    },
    {
        key: 'birth-month',
        value: 'Sinh nhật trong tháng',
    },

    {
        key: 'complete-profile',
        value: 'Cập nhật đủ thông tin',
    },
    {
        key: 'outside',
        value: 'Phát code ngoài hệ thống',
    },

    {
        key: 'new-player',
        value: 'Sự kiện dành cho Tân Thủ',
    },
    // {
    //     key: 'time',
    //     value: 'Điều kiện thời gian'
    //
    // },
    // {
    //     key: 'answer',
    //     value: 'Trả lời câu hỏi'
    //     tag: 'facebook'
    // }
]
const vip_types = [
    "Default",
    "Silver1",
    "Silver2",
    "Silver3",
    "Gold1",
    "Gold2",
    "Gold3",
    "Platinum",
]

const weeks = [
    {
        key: '1',
        value: 'Thứ 2',
    },
    {
        key: '2',
        value: 'Thứ 3',
    },
    {
        key: '3',
        value: 'Thứ 4 ',
    },
    {
        key: '4',
        value: 'Thứ 5',
    },
    {
        key: '5',
        value: 'Thứ 6',
    },
    {
        key: '6',
        value: 'Thứ 7',
    },
    {
        key: '7',
        value: 'Chủ nhật',
    },

]
const months = [
    {
        key: '1',
        value: 'Tháng 1',
    },
    {
        key: '2',
        value: 'Tháng 2',
    },
    {
        key: '3',
        value: 'Tháng 3',
    },
    {
        key: '4',
        value: 'Tháng 4',
    },
    {
        key: '5',
        value: 'Tháng 5',
    },
    {
        key: '6',
        value: 'Tháng 6',
    },
    {
        key: '7',
        value: 'Tháng 7',
    },
    {
        key: '8',
        value: 'Tháng 8',
    },
    {
        key: '9',
        value: 'Tháng 9',
    },
    {
        key: '10',
        value: 'Tháng 10',
    },
    {
        key: '11',
        value: 'Tháng 11',
    },
    {
        key: '12',
        value: 'Tháng 12',
    },

]

const filters_event = {
    // title: undefined,
    start_at: undefined,
    end_at: undefined,
    game_id: undefined,
    gc_expire_at: undefined,
    tag_titles: [],
    tag_ids: '',
    tab: undefined,
    tags: undefined,
    condition_type: undefined

}
const event_tabs = [
    {
        key: 'event_publish',
        value: 'Công khai'
    },

    {
        key: 'event_active',
        value: 'Đang diễn ra'
    },

    {
        key: 'event_pending',
        value: 'Chờ xử lý'
    },
    {
        key: 'event_beta',
        value: 'Beta'
    },
    {
        key: 'event_alpha',
        value: 'Alpha'
    }
]

const filters_giftcode = {
    user_id: undefined,
    event_id: undefined,
    game_id: undefined,
    code: undefined,
    has_used: '',
    order_by: 'created_at',
    sort_type: 'desc'
}
const inventories_filter = {
    game_id: undefined,
}
const configFlatPickr = {
    enableTime: true,
    dateFormat: 'd-m-Y H:i',
    locale: Vietnamese,
    wrap: true,
    time_24hr: true,
}
const event_states = [
    {
        key: '0',
        value: 'pending',
    },
    {
        key: '1',
        value: 'alpha',
    },
    {
        key: '2',
        value: 'beta',
    },
    {
        key: '3',
        value: 'publish',
    },
]
const events_giftcode = [
    {
        key: 1,
        value: 'Fun VIP'
    },
    {
        key: 2.1,
        value: 'Fun VIP gói 200k'
    },
    {
        key: 2.2,
        value: 'Fun VIP Custom'
    },
    {
        key: 3,
        value: 'Birthday'
    },
    {
        key: 4,
        value: 'Update Profile'
    },
    // {
    //     key: 5,
    //     value: 'FB Chatbot'
    // },
    {
        key: 6.1,
        value: 'Fun VIP tập Vip1'
    },
    {
        key: 6.2,
        value: 'Fun VIP tập Vip2'
    },
    {
        key: 6.3,
        value: 'Fun VIP tập Vip3'
    },
    {
        key: 6.4,
        value: 'KHTT Code Custom'
    },
    // {
    //     key: 7,
    //     value: 'After Event (Like)'
    // },
    // {
    //     key: 8,
    //     value: 'In Event (Like)'
    // },
    {
        key: 9,
        value: 'After Event (CMT)'
    },
    {
        key: 10,
        value: 'In Event (CMT)'
    },
    {
        key: 11,
        value: 'After Event (Like & Cmt)'
    },
    {
        key: 12,
        value: 'In Event (Like & Cmt)'
    },
    {
        key: 13,
        value: 'Phát code ngoài hệ thống'
    },
    {
        key: 14,
        value: 'Sự kiện dành cho Tân Thủ'
    },
    {
        key: 99,
        value: 'Custom'
    },

]

const state = {
    event_types,
    giftcode_types,
    condition_types,
    vip_types,
    months,
    weeks,
    filters_event,
    configFlatPickr,
    filters_giftcode,
    event_states,
    event_tabs,
    events_giftcode,
    inventories_filter

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})



