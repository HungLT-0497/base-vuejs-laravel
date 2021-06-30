var config_columns = [
    {
        data_index: 'game_id',
        title: 'Game ID',
        action: {
            type: 'detail',
            key: 'game_id'
        }
    },
    {
        data_index: 'game_name',
        title: 'Game'
    },
    {
        data_index: 'percentage',
        title: 'Tiến độ',
        info: {
            type: 'text',
            value: (value) => {
                return value + ' %'
            }
        }
    },
    {
        data_index: 'status_game',
        title: 'Trạng thái',
        info: {
            type: 'status',
            value: [
                {
                    data_index: 0,
                    icon: '<p class="badge badge-info badge-custom"><span class="fa fa-refresh"></span></p>',
                    title: 'Chưa ra mắt'
                },
                {
                    data_index: 1,
                    icon: '<p class="badge badge-success badge-custom"> <span class="fa fa-check"></span></p>',
                    title: 'Đã ra mắt'
                },
                {
                    data_index: 2,
                    icon: '<p class="badge badge-success badge-custom"> <span class="fa fa-check"></span></p>',
                    title: 'Đóng cửa'
                },
            ]
        }
    },
    {
        data_index: 'enable_payment',
        title: 'Bật nạp',
        info: {
            type: 'status',
            value: [
                {
                    data_index: 1,
                    icon: '<p class="badge badge-success badge-custom"><span class="fa fa-check"></span></p>',
                    title: 'Bật'
                },
                {
                    data_index: 0,
                    icon: '<p class="badge badge-danger badge-custom"><span class="fa fa-times"></span></p>',
                    title: 'Tắt'
                },
            ]
        }
    },
    {
        data_index: 'is_maintain',
        title: 'Bảo trì',
        info: {
            type: 'status',
            value: [
                {data_index: 1, icon: '', title: 'Có'},
                {data_index: 0, icon: '', title: 'Không'},
            ]
        }
    },
    {
        data_index: 'publisher',
        title: 'Publisher',
        info: {
            type: 'status',
            value: [
                {data_index: 1, icon: 'apple', title: 'Hồng Hà'},
                {data_index: 2, icon: 'android', title: 'Funtap'},
                {data_index: 3, icon: '', title: 'CoPub'},
                {data_index: 4, icon: '', title: 'IP Funtap'},
                {data_index: 5, icon: '', title: 'EN Funtap'},
            ]
        }
    },
    {
        title: 'T/G ra mắt',
        data_index: 'publish_at'
    },
    {
        title: 'Thao tác',
        action: {
            type: 'edit',
            key: 'id',
            link: '/game-config/id'
        }
    },
    {
        title: 'Thao tác',
        action: {
            type: 'delete',
            key: 'id',
            link: '/game-config/id'
        }
    }
]
var config_detail = {
    columns_more: [
        {
            data_index: 'id',
            title: 'ID',
        },
        {
            data_index: 'game_alias',
            title: 'Game alias',
        },
        {
            data_index: 'type',
            title: 'Loại game',
            info: {
                type: 'status',
                value: [
                    {data_index: 1, icon: '', title: 'Hồng Hà'},
                    {data_index: 2, icon: '', title: 'Funtap'},
                    {data_index: 3, icon: '', title: 'CoPub'}
                ]
            }
        },
        {
            data_index: 'enable_giftcode',
            title: 'Bật giftcode',
            info: {
                type: 'status',
                value: [
                    {data_index: 1, icon: '', title: 'Bật'},
                    {data_index: 2, icon: '', title: 'Tắt'}
                ]
            }
        },
        {
            title: 'Trạng thái',
            data_index: 'status_game',
            info: {
                type: 'status',
                value: [
                    {data_index: 0, icon: '', title: 'Chưa ra mắt'},
                    {data_index: 1, icon: '', title: 'Đã ra mắt'},
                    {data_index: 2, icon: '', title: 'Đóng cửa'}
                ]
            }
        },
        {
            title: 'Link tải game',
            data_index: 'url_download',
        },
        {
            title: 'Tag',
            data_index: 'tag',
        },
        {
            title: 'Link trang chủ',
            data_index: 'url_homepage',
        },
        {
            title: 'Ảnh',
            data_index: 'url_avatar'
        },
        {
            title: 'T/G tạo',
            data_index: 'created_at',
        },
        {
            title: 'T/G Cập nhật',
            data_index: 'updated_at'
        }

    ],
    tabs: [
        {
            'name': 'Thông tin game',
            'column':
                ['id', 'game_name', 'game_id', 'game_alias', 'publisher', 'type', 'url_download', 'url_homepage',
                    'url_avatar', 'enable_payment', 'enable_giftcode', 'tag', 'publish_at', 'created_at', 'updated_at'
                ]
        }
    ],
    link: '/game-config',
}
var config_filter = {
    columns_more: [
        {
            data_index: 'time_start',
            title: 'Thời gian bắt đầu',
            info: {
                type: 'time',
                value: 'YYYY-MM-DD HH:mm:ss'
            }
        },
        {
            data_index: 'time_end',
            title: 'Thời gian kết thúc',
            info: {
                type: 'time',
                value: 'YYYY-MM-DD HH:mm:ss'
            }
        }
    ],
    columns: [
        {
            data_index: 'status_game',
        },
        {
            data_index: 'enable_payment',
          /*  info: {
                multiple: true
            },*/
        },
        {
            data_index: 'enable_giftcode',
        },
        {
            data_index: 'publisher',
        },
      /*  {
            data_index: 'time_start',
        },
        {
            data_index: 'time_end',
        }*/
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
