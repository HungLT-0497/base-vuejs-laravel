
var data_type = {
    data_index: 'id',
    title: 'id',
    action: {
        type: 'detail',
        key: 'id',
        link: '/game-config/id'
    },
    info: {
        type: 'text',
        value: (value) => {
            return value + '%'
        }
    }
}
var data_type_1 = {
    data_index: 'status',
    title: 'Trạng thái',
    info: {
        type: 'status',
        value: [{data_index: 1, icon: '', title: ''}]
    }
}
var data_type_2 = {
    title: 'Thao tác',
    action: {
        type: 'edit',
        key: 'id'
    }
}
var data_type_3 = {
    title: 'Thao tác',
    action: {
        type: 'delete',
        key: 'id',
        link: '/game-config/id'
    }
}
