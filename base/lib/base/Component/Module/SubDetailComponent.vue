<template>
    <div class="container-fluid">
        <div class="form-group" v-for="item in column_detail" :key="item">
            <span v-for="item_column in getLabel(item)">
            <div class="label-detail">{{item_column.title || item }}: </div>
            <div class="content-detail">
                <span v-if="item_column.scopedSlots">
                    <span v-for="item_slot in config_detail[1]" v-if="item_slot.name == item_column.scopedSlots.customRender">
                        <StatusComponent :data="data[item]" :option="item_slot.value"></StatusComponent>
                    </span>
                </span>
                <span v-else>
                    {{data[item]}}
                </span>
            </div>
            </span>
        </div>
    </div>
</template>
<script>
import StatusComponent from "./StatusComponent";
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
    watch: {
    },
    data() {
        return {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
            spinning: false,
            columns_convert: []
        };
    },
    methods: {
        getLabel(index){
            var result = this.config_detail[0].find(x => {
                return x.dataIndex == index
            })
            return result ?  [result] : []
        },
        getStatus(index, option){
            var result = option.find(x => {
                return x.data_index == index
            })
            return result ?  [result] : []
        }
    },
};
</script>
<style scoped>
.form-group{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
    display: flex;
}
.label-detail{
    float: left;
    font-weight: bold;
    flex: 1;
}
.content-detail{
    margin-left: 5px;
    float: left;
    flex: 3;
}
</style>
