<template>
    <div class="container-fluid">
        <div class="form-group" v-for="item in column_detail" :key="item">
            <span v-for="item_column in getLabel(item)">
                <a-row type="flex">
                <a-col flex="200px" class="label-detail">{{ item_column.title || item }}: </a-col>
                <a-col flex="auto" class="content-detail">
                    <span v-if="item_column.scopedSlots && item_column.scopedSlots.customRender.indexOf('status_') != -1">
                        <span v-for="item_slot in config_detail[1]"
                              v-if="item_slot.name == item_column.scopedSlots.customRender">
                            <StatusComponent :data="data[item]" :option="item_slot.value"></StatusComponent>
                        </span>
                    </span>
                    <span v-else>
                        {{ format(data[item], getFilter(item_column.scopedSlots.customRender)) }}
                    </span>
                </a-col>
           </a-row>
            </span>
        </div>
    </div>
</template>
<script>
import StatusComponent from "./StatusComponent";
import Vue from "vue";

export default {
    components: {
        StatusComponent
    },
    name: 'SubDetailComponent',
    props: ['config_detail', 'data', 'column_detail'],
    filters: {
        compactText(text) {
            if (text)
                return text.length > 30 ? text.substring(0, 30) + '...' : text
        }
    },
    watch: {},
    data() {
        return {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
            spinning: false,
            columns_convert: []
        };
    },
    methods: {
        getFilter(name_slot){
            return this.config_detail[1].find(item => {
                return item.name == name_slot
            }).filter
        },
        format(value, filter){
            if (filter){
                var result = Vue.filter(filter)(value)
                if (result)
                    return result
            }
            return value
        },
        getLabel(index) {
            var result = this.config_detail[0].find(x => {
                return x.dataIndex == index
            })
            return result ? [result] : []
        },
        getStatus(index, option) {
            var result = option.find(x => {
                return x.data_index == index
            })
            return result ? [result] : []
        }
    },
};
</script>
<style scoped>
.form-group {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.label-detail {
    font-weight: 500;
}

.content-detail {
    margin-left: 5px;
}
</style>
