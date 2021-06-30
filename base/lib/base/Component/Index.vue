<template>
    <div>
            <FTable :config_list="config_list" :link="link"
                    :filter="filter_setup"
                    @detail="(id) => { detail_value = id, visible_detail = true}"
                    @edit="(id) => $emit('edit_gameconfig',id)"></FTable>
            <FDetail v-if="detail" :detail="detail" :config_detail="config_detail" :detail_value="detail_value"
                     :visible="visible_detail" @set_visible="() => visible_detail = !visible_detail"></FDetail>
            <FFilter v-if="filter" :filter="filter" :config_filter="config_filter" @change_filter="(data) => {filter_setup = data }"></FFilter>
            <EditGameConfig/>
    </div>
</template>
<script>
import FTable from './Table/Table'
import FDetail from './Detail'
import FFilter from './Filter'
import EditGameConfig from './../../components/gameconfig/EditGameConfig'
import Table from "../JS/Utils/Table";
export default {
    components: {
        FTable,
        EditGameConfig,
        FDetail,
        FFilter
    },
    props: ['columns', 'detail', 'link', 'filter'],
    data() {
        return {
            detail_value: 0,
            visible_detail: false,
            config_list: [],
            filter_setup: {},
            config_detail: [],
            config_filter: [],
        };
    },
    created() {
        this.config_list = Table.convertDataToStruct(true, this.columns)
        this.config_detail = Table.convertDataToStruct(false, this.columns, this.detail.columns_more)
        this.config_filter = Table.convertDataToStruct(false, this.columns, this.detail.columns_more, this.filter.columns_more)
    }
};
</script>
