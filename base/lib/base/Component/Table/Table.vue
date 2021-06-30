<template>
    <div class="f-container">
        <a-config-provider :locale="locale">
            <a-spin tip="Đang tải" :spinning="spinning">
                <a-table :columns="columns_convert" :data-source="data_convert" rowKey="id" :pagination='false' size="small">
                    <template v-for="item in slot" :slot="item.name" slot-scope="text, record">
                    <!-- handle slot detail-->
                        <div v-if="item.name.indexOf('detail_') != -1" @click="openDetail(record[item.value.key])">
                            <a href="javascript:void(0);"
                               title="Show">
                                <a-tooltip>
                                    <span slot="title">
                                        Chi tiết
                                    </span>
                                    {{ text }}
                                </a-tooltip>
                            </a>
                        </div>
                    <!-- handle slot edit-->
                        <div v-if="item.name.indexOf('action_') != -1" @click="openDetail(record[item.value.key])" class="group-icon" >
                            <a-tooltip v-for="item_action in item.value" :key="item_action.type">
                                <template slot="title">
                                   {{item_action.type == 'edit' ? 'Sửa' : 'Xóa'}}
                                </template>
                                <a-icon v-if="item_action.type == 'edit'" type="edit" @click="openEdit(record[item_action.key])"></a-icon>
                                <a-icon v-if="item_action.type == 'delete'" type="delete" @click="actionDelete(record[item_action.key])"></a-icon>
                            </a-tooltip>
                        </div>

                        <!-- handle slot status-->
                        <div v-if="item.name.indexOf('status_') != -1" >
                            <StatusComponent :data="text" :option="item.value"></StatusComponent>
                        </div>
                    </template>
                </a-table>
                <f-pagination :data_pagination="data_all_convert" @change_pagination="(page) => changePage(page)">
                </f-pagination>
            </a-spin>
        </a-config-provider>
    </div>
</template>

<script>
import Service from "../../JS/Utils/Service";
import Pagination from './Pagination';
import StatusComponent from "../Module/StatusComponent";
import vi from 'ant-design-vue/es/locale/vi_VN';

export default {
    components: {
        'f-pagination': Pagination,
        StatusComponent
    },
    name: 'f-table',
    props: {
        config_list: {type: Array},
        link: {type: String},
        filter: {
            type: Object
        }
    },
    watch: {
        filter: {
            handler(val) {
                if (val){
                    this.changePage(this.current_page)
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
    },
    data() {
        return {
            locale: vi,
            columns_convert: [],
            slot: [],
            data_all: '',
            data_convert: [],
            data_all_convert: {},
            spinning: false,
            current_page: localStorage.getItem('current_page') || 1
        }
    },
    created() {
        this.changePage(this.current_page);
        [this.columns_convert, this.slot] = this.config_list
    },
    methods: {
        actionDelete(id){
            console.log(id)
        },
        openDetail(id) {
            this.$emit('detail', id)
        },
        openEdit(id) {
            this.$emit('edit', id)
        },
        changePage(event) {
            this.spinning = true
            let data = {
                page: event,
                ...this.filter
            }
            Service.get(this.link, data).then(data => {
                this.$store.commit('setCurrentPage', event)
                this.convertData(data.data.data)
                this.spinning = false
            }).catch(() => {
                this.spinning = false
            })
        },
        convertStatus(data, option){
            return  [option.find(item => {
                return item.data_index == data
            })]
        },
        convertData(data) {
            this.data_convert = data.data
            this.data_all_convert = data
        }
    }
}
</script>

<style scoped>
.f-container {
    font-family: Roboto, -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
    color: #23282c;
    font-size: 13px;
}

.status_element {
    display: flex;
}

.status_element_value {
    margin-left: 3px;
}

.action-item {
    display: flex;
}

.action-sub-item {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    justify-items: center;
}
.group-icon{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.group-icon >>> .anticon:first-child{
    margin-right: 20px;
}
.action-sub-item > i {
    margin-right: 6px;
}

.table_custom > .ant-spin-nested-loading > .ant-spin-container > .ant-table-default > .ant-table-content > .ant-table-body > .ant-table-tbody > .ant-table-row > td {
    padding: 5px 5px;
    overflow-wrap: break-word;
}

</style>
