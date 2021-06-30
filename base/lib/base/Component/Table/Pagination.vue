<template>
    <div>
        <div v-if="data_pagination.total" class="f-pagination">
            <span class="">Hiển thị {{ this.data_pagination.data.length}} trong tổng số {{ total_convert }} bản ghi</span>
            <a-pagination class="f-pagination" show-quick-jumper :default-current="current_page_convert"
                          :page-size="page_size_convert" :total="total_convert"
                          @change="$emit('change_pagination',$event)"/>
        </div>
        <div v-else class="customize-pagination">
            <a-button class="left" :disabled="data_pagination.current_page == 1 || !data_pagination.prev_page_url" @click="getPage(data_pagination.prev_page_url)"><a-icon type="left"/></a-button>
            <a-button class="right" :disabled="!data_pagination.next_page_url" @click="getPage(data_pagination.next_page_url)"><a-icon type="right"/></a-button>
        </div>
    </div>
</template>

<script>
import Icon from "ant-design-vue/lib/icon";

export default {
    name: "Pagination",
    props: ['data_pagination'],
    watch: {
        data_pagination: {
            handler: function () {
                this.current_page_convert = this.data_pagination.current_page
                this.total_convert = this.data_pagination.total
                this.page_size_convert = this.data_pagination.per_page
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            current_page_convert: 1,
            total_convert: 15,
            page_size_convert: 15,
        }
    },
    methods: {
        getPage(page){
            let array_str = page.split('page=')
            this.$emit('change_pagination',array_str[1])
        },
        getIconsProps(prefixCls) {
            var h = this.$createElement;

            var prevIcon = h(
                'a',
                { 'class': prefixCls + '-item-link' },
                [h(Icon, {
                    attrs: { type: 'left' }
                })]
            );
            var nextIcon = h(
                'a',
                { 'class': prefixCls + '-item-link' },
                [h(Icon, {
                    attrs: { type: 'right' }
                })]
            );
            return {
                prevIcon: prevIcon,
                nextIcon: nextIcon
            };
        },
    }
}
</script>

<style scoped>
.f-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.f-pagination .ant-pagination {
    border-bottom: none;
}
.customize-pagination{
    margin-top: 10px;
    justify-content: center;
    display: flex;
}
.left{
    line-height: 0px;
    margin-right: 10px;
}
.right{
    line-height: 0px;
}

</style>
