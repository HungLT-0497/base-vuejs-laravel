<template>
    <a-drawer
        title="Lọc"
        placement="right"
        :visible="visible_filter"
        width="450px"
        class="funtap-drawer"
        @close="close"
    >
        <a-spin tip="Đang tìm kiếm" :spinning="spinning">
            <a-form-model :model="form" layout="vertical" class="form-filter">
                <a-form-model-item v-for="item in convert_filter" :label="item.title" :key="item.data_index">
                    <a-input v-if="item.type == 'text'" v-model="form[item.data_index]"></a-input>
                    <a-select v-if="item.type == 'select'" v-model="form[item.data_index]"
                              :mode="item.default ? 'multiple' : 'default'" allowClear>
                        <a-select-option v-for="item_option in item.option" :key="item_option.data_index"
                                         :value="item_option.data_index">
                            <StatusComponent :data="item_option.data_index" :option="item.option"></StatusComponent>
                        </a-select-option>
                    </a-select>
                    <a-date-picker :locale="locale" v-if="item.type == 'time'"
                                   :default-value="item.default ? moment(item.default, item.format) : null"
                                   v-model="form[item.data_index]" show-time style="width: 100%"/>
                </a-form-model-item>
            </a-form-model>
            <div
                :style="{
              position: 'fixed',
              right: 0,
              bottom: 0,
              width: '450px',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 1,
            }"
            >
                <a-button
                    :style="{ marginRight: '8px', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }"
                    type="danger" @click="resetFilter">
                    Bỏ lọc
                    <a-icon type="delete"></a-icon>
                </a-button>
                <a-button type="primary" @click="filterData">
                    Lọc
                    <a-icon type="filter"></a-icon>
                </a-button>
            </div>
        </a-spin>
    </a-drawer>
</template>
<script>
import StatusComponent from "./Module/StatusComponent";
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN';
import {mapGetters} from 'vuex'
import moment from "moment";

export default {
    name: 'FFilter',
    props: ['filter', 'config_filter'],
    computed: {
        ...mapGetters({
            visible: 'getVisibleFilter'
        })
    },
    components: {
        StatusComponent
    },
    watch: {
        visible: function () {
            this.visible_filter = this.visible
        },
        convert_filter: {
            handler() {
                this.initFormData()
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.convertColumnFilter(this.filter.columns, this.config_filter[0], this.config_filter[1])
    },
    data() {
        return {
            locale,
            labelCol: {span: 8},
            wrapperCol: {span: 16},
            spinning: false,
            convert_filter: [],
            form: {},
            visible_filter: false,
            template_struct: {
                data_index: '',
                title: '',
                type: 'text',
                default: '',
                multiple: false,
                option: [],
                format: ''
            }
        };
    },
    methods: {
        moment,
        convertDataBeforeUpdate(){
            var data = {...this.form}
            this.convert_filter.forEach(item => {
                if(item.type == "time" && data[item.data_index]){
                    data[item.data_index] = data[item.data_index].format(item.format)
                }
            })
            return data
        },
        filterData(){
           var data = this.convertDataBeforeUpdate()
            this.$emit('change_filter', data)
            this.close()
        },
        async resetFilter() {
            this.initFormData()
            this.$emit('change_filter', {})
            setTimeout(() => {
                this.close()
            }, 300)
        },
        initFormData() {
            var temp = {}
            this.convert_filter.forEach(item => {
                temp[item.data_index] = item.multiple ? item.default : ''
            })
            this.form = {...temp}
        },
        close() {
            this.$store.commit('setVisibleFilter', !this.visible)
        },
        convertColumnFilter(column, all, slots) {
            this.convert_filter = column.map(item => {
                let detail_cl = all.find(detail => {
                    return detail.dataIndex == item.data_index
                })
                var column_ = {...this.template_struct}
                column_.data_index = item.data_index
                if (detail_cl) {
                    column_.title = detail_cl.title
                    column_.default = item.info ? (item.info.default || '') : ''
                    if (detail_cl.scopedSlots) {
                        let slot_cl = slots.find(slot => {
                            return detail_cl.scopedSlots.customRender == slot.name
                        })
                        if (slot_cl && slot_cl.name.indexOf('status_') != -1) {
                            column_.type = 'select'
                            if (Array.isArray(column_.default))
                                column_.multiple = true
                            else
                                column_.multiple = item.info ? (item.info.multiple || false) : false
                            if (column_.multiple)
                                column_.default = []
                            column_.option = slot_cl.value
                        } else if (slot_cl && slot_cl.name.indexOf('time_') != -1) {
                            column_.type = 'time'
                            column_.format = slot_cl.value || 'YYYY-MM-DD HH:mm:ss'
                        }
                    }
                } else {
                    column_.title = item.data_index
                }
                return column_
            })
        }
    },
};
</script>
<style scoped>
.stepFormText {
    margin-bottom: 0px;
}

.stepFormText .ant-form-item-label, .ant-form-item-control {
    line-height: 22px;
}

.form-filter {
    margin: 20px 20px 80px 20px;
}

.form-filter >>> .ant-form-item {
    padding: 0;
}

.form-filter >>> .ant-form-item-label {
    padding: 0;
    font-weight: 500;
    font-family: Roboto, -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
}

.ant-form-item >>> .ant-form-item-label {
    font-weight: bold;
    text-align: left;
}

.funtap-drawer {
    margin-top: 90px;
}

.form-item {
    margin: 24px;
}
</style>
