<template>
    <div>
        <div v-if="data_pagination.total" class="f-pagination">
            <div class="footer-right">
            <a-pagination class="pagination-tt funtap" show-quick-jumper :default-current="current_page_convert"
                          :page-size="page_size_convert" :total="total_convert"
                          @change="$emit('change_pagination',$event)"/>
                <div v-if="get_column_total.length != 0" class="total_more">
                    <span>Tổng </span>
                    <a-select @change="changeTotal" class="select-option">
                        <a-select-option v-for="item in get_column_total" :value="item.dataIndex" :key="item.name">{{item.title}}</a-select-option>
                    </a-select>
                    <span>:</span>
                    <a-spin :spinning="spinning_total"><span class="total">{{data_total}}</span></a-spin>
                </div>
            </div>
            <span class="">Hiển thị {{ this.data_pagination.data.length}} trong tổng số {{ total_convert }} bản ghi</span>
        </div>
        <div v-else class="customize-pagination">
            <a-button class="left" :disabled="data_pagination.current_page == 1 || !data_pagination.prev_page_url" @click="getPage(data_pagination.prev_page_url)"><a-icon type="left"/></a-button>
            <a-button class="right" :disabled="!data_pagination.next_page_url" @click="getPage(data_pagination.next_page_url)"><a-icon type="right"/></a-button>
        </div>
    </div>
</template>

<script>
import Icon from "ant-design-vue/lib/icon";
import Service from "../../JS/Utils/Service";

export default {
    name: "Pagination",
    props: ['data_pagination', 'column_pagination', 'slot_pagination', 'link_total'],
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
            get_column_total: [],
            data_total: 'null',
            spinning_total: false,
            current_page_convert: 1,
            total_convert: 15,
            page_size_convert: 15,
        }
    },
    created() {
     this.convertColumnTotal()
    },
    methods: {
       async changeTotal(value){
            this.spinning_total = true
            try {
                var link_slot = this.link_total.replace('index','get_total') + '\\' + value
               await Service.get(link_slot).then(data => {
                    this.data_total = data.data.data
                })
            } catch (e) {
                window.handleErrors()
            }
            this.spinning_total = false
        },
        convertColumnTotal(){
            this.slot_pagination.forEach(item => {
                if (item.have_total){
                    var result = this.column_pagination.find(item1 => {
                        if (item1.scopedSlots)
                            return item1.scopedSlots.customRender == item.name
                        return false
                    })
                    this.get_column_total.push(result)
                }
            })
        },
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
.footer-right{
    display: flex;
    min-width: 400px;
    align-content: center;
    align-items: center;
}
.total{
    min-height: 20px;
    min-width: 20px;
}
.select-option{
    width: 120px;
}
.pagination-tt{
    margin-right: 100px;
}
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
.total_more{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
}
.total_more > *{
    margin-right: 10px;
}
</style>
