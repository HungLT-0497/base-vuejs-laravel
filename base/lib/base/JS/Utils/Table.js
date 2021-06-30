class Table {
    convertDataToStruct(get_action, data, data_detail = null, data_edit = null ) {
        if (data_detail)
         data = data.concat(data_detail)
        if (data_edit)
        data = data.concat(data_edit)
        var columns = []
        var slot = []
        data.forEach(value => {
            var key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
            var sub_column = {
                dataIndex: value.data_index,
                title: value.title,
                key: key
            }

            var name_slot = ''
            if (value.action && get_action) {
                [slot, name_slot] = convertAction(value, key, slot)
            } else {
                if (value.info && value.info.type == 'status'){
                    name_slot += 'status_' + key
                    slot.push({
                        name: name_slot,
                        value: value.info.value
                    })
                }
                if (value.info && value.info.type == 'time'){
                    name_slot += 'time_' + key
                    slot.push({
                        name: name_slot,
                        value: value.info.value
                    })
                }
            }
            if (name_slot) {
                sub_column.scopedSlots = {customRender: name_slot}
            }
            if (value.info && value.info.type == 'text') {
                sub_column.customRender = value.info.value
            }

            if (sub_column.scopedSlots && sub_column.scopedSlots.customRender && sub_column.scopedSlots.customRender.indexOf('action_') != -1){
                var result = columns.find(item => {
                    if (item.scopedSlots && item.scopedSlots.customRender)
                        return item.scopedSlots.customRender.indexOf('action_') != -1
                })
                if (!result){
                    columns.push(sub_column)
                }
            }
            else{
              columns.push(sub_column)
            }
        })
        return [columns, slot]
    }

    getDetailColumn(column, all){

    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertAction(value, key, slot) {
    let name_slot = ''
    if (value.action.type == 'detail') {
        name_slot += 'detail_' + key
        slot.push({
            name: name_slot,
            value: {
                key: value.action.key,
                link: value.action.link,
            }
        })
    }
    if (value.action.type == 'delete' || value.action.type == 'edit') {
        name_slot += 'action_' + key
        var result = slot.find(item => {
            return item.name.indexOf('action_') != -1
        })
        if (result) {
            result.value.push(value.action)
        } else {
            slot.push({
                name: name_slot,
                value: [
                    value.action
                ]
            })
        }
    }
    return [slot, name_slot]
}

function convertNotAction(value) {
    var item = {
        title: value.title,
        dataIndex: value.data_index,
        key: Math.random().toString(36).substring(7)
    }
    if (value.column_type == 'text' && value.customize) {
        item.customRender = value.customize
    }
    if (value.column_type == 'detail') {
        item.scopedSlots = {customRender: 'slot_detail_' + item.key}
        var slot = {
            name: 'slot_detail_' + item.key,
            key: value.column_key
        }
    }
    if (value.column_type == 'status_type') {
        item.scopedSlots = {customRender: 'slot_status_' + item.key}
        let item_convert = value.convert_status.map((x) => {
            return {
                index: x.value_convert,
                value: x.value,
                icon: x.icon ? x.icon : '',
                background_icon: x.background_icon ? x.background_icon : '',
                type_icon: x.icon ? (x.icon.indexOf('<') != -1 ? 'normal' : 'antd') : ''
            }
        })
        var slot = {
            name: 'slot_status_' + item.key,
            config_icon: item_convert
        }
    }
    return [item, slot]
}

export default new Table()
