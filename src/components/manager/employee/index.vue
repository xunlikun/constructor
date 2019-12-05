<template>
    <div>
        <Row :style='{paddingBottom:"50px"}'>
            <Col offset="23">
            <Button type="primary">
                新增
            </Button>
            </Col>
        </Row>
        <Table :data="employeeData" :columns="tableColumns" stripe :style='{minHeight:"500px"}'></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            op:{},
            total:100,
            current:1,
            employeeData:[],
            tableColumns: [
                    {
                        title: '编号',
                        key: 'employeeCode'
                    },
                    {
                        title: '职务',
                        key: 'position'
                    },
                    {
                        title: '项目经理',
                        key: 'name'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile'
                    },
                    {
                        title: '身份证号',
                        key: 'idNumber'
                    },
                    {
                        title: '操作',
                        key: 'calculate',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
 
                    }
                ]
        }
    },
    created() {
        this.init()
    },
    methods: {
        ...mapActions(['getEmployeeList']),
        @track.loading
        async init(){
            let query = JSON.parse(JSON.stringify(this.op))
            for (const key in query) {
                if(query[key]){

                }else{
                    delete query[key]
                }
            }

          let data = (await this.getEmployeeList(query)).data
          this.employeeData = data.records
          this.total = data.total
          this.current = data.page
        },
        changePage (page) {
            this.op.current = page
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            this.init();
        }
    },
}
</script>
<style scoped>
    
</style>