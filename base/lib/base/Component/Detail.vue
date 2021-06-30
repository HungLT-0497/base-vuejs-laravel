<template>
    <a-drawer
        title="Chi tiết"
        placement="right"
        :visible="visible"
        width="560px"
        class="funtap-drawer"
        @close="close"
    >
        <a-spin tip="Đang tải" :spinning="spinning">
            <a-tabs type="card" class="tabs" v-if="detail.tabs.length > 1">
                <a-tab-pane v-for="(tab, index) in detail.tabs" :key="index" :tab="tab.name">
                    <SubDetailComponent :column_detail="detail.tabs[0].column" :data="data"
                                        :config_detail="config_detail"></SubDetailComponent>
                </a-tab-pane>
            </a-tabs>
            <div v-else>
                <SubDetailComponent :column_detail="detail.tabs[0].column" :data="data"
                                    :config_detail="config_detail"></SubDetailComponent>
            </div>
        </a-spin>
    </a-drawer>
</template>
<script>
import SubDetailComponent from "./Module/SubDetailComponent";
import Service from "../JS/Utils/Service";

export default {
    name: 'Detail',
    props: ['detail', 'visible', 'config_detail', 'id', 'detail_value'],
    components: {
        SubDetailComponent
    },
    filters: {
        compactText(text) {
            if (text)
                return text.length > 30 ? text.substring(0, 30) + '...' : text
        }
    },
    watch: {
        detail_value: {
            handler(val) {
                if (val != 0 && val)
                    this.getDetailService(val)
            },
            deep: true
        },
        config_detail: {
            handler(val) {
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
            spinning: false,
            data: {},
            columns_convert: []
        };
    },
    methods: {
        close(event) {
            this.$emit('set_visible')
        },
       async getDetailService(value) {
            this.spinning = true
            try {
              await Service.get(this.detail.link + '/' + value).then(data => {
                    if (data.data.code == 0) {
                        this.data = data.data.data
                    } else {
                        window.handleError(data.data.message)
                    }
                })

            } catch (e) {
                window.handleError(e)
            }
            this.spinning = false
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
