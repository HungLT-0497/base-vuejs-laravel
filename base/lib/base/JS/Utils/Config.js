import Util, {castGameToOption} from './Table'
var config_columns = [
    {
        data_index: 'order_no',
        title: 'Mã giao dịch',
        action: {
            type: 'detail',
            key: 'id'
        }
    },
    {
        data_index: 'order_id',
        title: 'Mã đối tác'
    },
    {
        data_index: 'amount',
        title: 'Số tiền',
        info: {
            type: 'text',
            value: (value) => {
                return value + '$'
            }
        }
    },
    {
        title: 'User ID',
        data_index: 'user_id',
    },
    {
        title: 'Phương thức thanh toán',
        data_index: 'type_payment',
        info: {
            type: 'status',
            value: [
                {
                    data_index: 1,
                    icon: 'google',
                    title: 'GOOGLE'
                },
                {
                    data_index: 2,
                    icon: 'apple',
                    title: 'APPLE'
                }
            ]
        }
    },
    {
        title: 'Game',
        data_index: 'game_id',
        info:{
          type: 'status',
          value: castGameToOption()
        }
    },
    {
        title: 'Thời gian mua hàng',
        data_index: 'purchaseTimeMillis',
        filter: 'timestampToDatetime'
    },
    {
        title: 'Thời gian Refund',
        data_index: 'voidedTimeMillis',
        filter: 'timestampToDatetime'
    },
]
var config_detail = {
    columns_more: [
    ],
    tabs: [
        {
            'name': 'Chi tiết giao dịch',
            'column':
                ['order_no', 'order_id', 'game_id', 'user_id', 'amount', 'type_payment', 'purchaseTimeMillis', 'voidedTimeMillis']
        }
    ],
    link: '/orders/log_refund_orders/show',
}
var config_filter = {
    columns_more: [
        {
            data_index: 'time_pur_start',
            title: 'Thời gian bắt đầu mua hàng',
            info: {
                type: 'time',
                value: 'YYYY-MM-DD HH:mm:ss'
            }
        },
        {
            data_index: 'time_pur_end',
            title: 'Thời gian kết thúc mua hàng',
            info: {
                type: 'time',
                value: 'YYYY-MM-DD HH:mm:ss'
            }
        },
        {
            data_index: 'time_refund_start',
            title: 'Thời gian bắt đầu refund',
            info: {
                type: 'time',
                value: 'YYYY-MM-DD HH:mm:ss'
            }
        },
        {
            data_index: 'time_refund_end',
            title: 'Thời gian kết thúc refund',
            info: {
                type: 'time',
                value: 'YYYY-MM-DD HH:mm:ss'
            }
        }
    ],
    columns: [
        {
            data_index: 'game_id',
        },
        {
            data_index: 'type_payment',
        },
        {
            data_index: 'time_pur_start',
        },
        {
            data_index: 'time_pur_end',
        },
        {
            data_index: 'time_refund_start',
        },
        {
            data_index: 'time_refund_end',
        }
    ]
}


var  config_edit = {
    columns_more: [
        {
            column_type: 'status_type',
            title: 'Loại game',
            data_index: 'type',
            convert_status: [
                {
                    'value': 1,
                    'value_convert': 'HongHa'
                },
                {
                    'value': 2,
                    'value_convert': 'Funtap',
                },
                {
                    'value': 3,
                    'value_convert': 'Copub',
                }
            ]
        },
        {
            column_type: 'status_type',
            title: 'Bật giftcode',
            data_index: 'enable_giftcode',
            convert_status: [
                {
                    'value': 1,
                    'value_convert': 'Bật'
                },
                {
                    'value': 2,
                    'value_convert': 'Tắt',
                }
            ]
        },
        {
            column_type: 'status_type',
            title: 'Trạng thái',
            data_index: 'status',
            convert_status: [
                {
                    'value': 0,
                    'value_convert': 'Chưa ra mắt'
                },
                {
                    'value': 1,
                    'value_convert': 'Đã ra mắt',
                },
                {
                    'value': 2,
                    'value_convert': 'Đóng cửa',
                }
            ]
        },
        {
            title: 'Link tải game',
            data_index: 'url_download',
            column_type: 'text'
        },
        {
            title: 'Link trang chủ',
            data_index: 'url_homepage',
            column_type: 'text'
        },
        {
            title: 'Ảnh',
            data_index: 'url_avatar',
            column_type: 'image'
        },
        {
            title: 'T/G tạo',
            data_index: 'created_at',
            column_type: 'text'
        },
        {
            title: 'T/G Cập nhật',
            data_index: 'updated_at',
            column_type: 'text'
        }

    ],
    tabs: [
        {
            'name': 'Thông tin game',
            'column':
                [
                    {
                        'index': 'id',
                        'type': 'disable'
                    },
                    {
                        'index': 'game_name',
                        'type': 'disable'
                    },
                    {
                        'index': 'game_alias',
                        'type': 'disable'
                    },
                    {
                        'index': 'url_download',
                        'type': 'normal'
                    },
                    {
                        'index': 'url_homepage',
                        'type': 'normal'
                    },
                    {
                        'index': 'url_avatar',
                        'type': 'normal'
                    },
                    {
                        'index': 'tag',
                        'type': 'normal'
                    }
                ]
        },
        {
            'name': 'Tích hợp'
        },
        {
            'name': 'Thiết lập thêm'
        }
    ],
    link: '/game-config',
}
export default {
    config_edit,
    config_detail,
    config_filter,
    config_columns
}
