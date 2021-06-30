<template>
    <span class="status">
        <span class="group-icon-status">
            <span v-if="type == 'normal'" v-html="icon"></span>
        </span>
        <a-icon style="margin-right: 4px" v-if="type == 'ant' && icon" :type="icon"></a-icon>
        <span class="content-status">
            {{ content }}
        </span>
    </span>
</template>
<script>
export default {
    name: 'StatusComponent',
    props: ['data', 'option'],
    watch: {
        change_value: {
            handler() {
                if (this.data && this.option)
                    this.getStatus(this.data, this.option)
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        change_value: function () {
            return [this.data, this.option]
        }
    },
    data() {
        return {
            icon: '',
            type: '',
            content: ''
        };
    },
    methods: {
        getStatus(index, option) {
            var result = option.find(x => {
                return x.data_index == index
            })
            if (result) {
                this.icon = result.icon
                if (this.icon.indexOf('<') != -1) {
                    this.type = 'normal'
                } else {
                    this.type = 'ant'
                }
                this.content = result.title
            }
        }
    },
};
</script>
<style scoped>
.status{
    display: flex;
    align-items: center;
    align-content: center;
}
.status > span{
    margin-right: 4px;
}
.group-icon-status{
    height: 24px;
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>
