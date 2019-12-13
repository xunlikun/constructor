<template>
    <div>
        <template v-if="token && userInfo.userStatus == 0">
            <Temp></Temp>
        </template>
        <template v-else-if="token">
            <div class='filter'>
                <Form ref="op" :model="op" :rules="ruleCustom" :label-width="80" inline>
                <FormItem label="项目编号" prop="projectCode">
                    <Input size="small" type="text" v-model="op.projectCode"></Input>
                </FormItem>
                <FormItem label="项目名称" prop="projectName">
                    <Input size="small" type="text" v-model="op.projectName"></Input>
                </FormItem>
                <FormItem label="项目经理" prop="projectManager">
                    <Input size="small" type="text" v-model="op.projectManager"></Input>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="op.projectStatus">
                        <Option value="1">完成</Option>
                        <Option value="0">在建</Option>
                    </Select>
                </FormItem>
                <FormItem label="创建日期">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="开始日期" @on-change='(format)=>{op.startTimeMin = format.replace(/-/ig,"/")}'></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <DatePicker type="date" placeholder="结束日期" @on-change='(format)=>{op.startTimeMax = format.replace(/-/ig,"/")}'></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="完工日期">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="开始日期" @on-change='(format)=>{op.finishTimeMin = format.replace(/-/ig,"/")}'></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <DatePicker type="date" placeholder="结束日期" @on-change='(format)=>{op.finishTimeMax = format.replace(/-/ig,"/")}'></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('op')">检索</Button>
                </FormItem>
            </Form>
            </div>
            <Table :data="projectData" :columns="tableColumns" :style='{minHeight:"500px"}' stripe></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :current="current" @on-change="changePage"></Page>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import Temp from '@/components/temp/waitingPeriod'
import { mapGetters, mapActions } from 'vuex'
export default {
    components:{Temp},
    data() {
        const validateText = (rule, value, callback) => {
                // if (value === '') {
                //     callback(new Error('请输入！'));
                // } else {
                    callback();
                // }
            };
        return {
            op:{
                projectCode:'',
                projectName:'',
                projectManager:'',
                projectStatus:'',
                startTimeMin:'',
                startTimeMax:'',
                finishTimeMin:'',
                finishTimeMax:''
            },
            ruleCustom: {
                    contractCode: [
                        { validator: validateText}
                    ],
                    contractTitle: [
                        { validator: validateText}
                    ],
                    partyB: [
                        { validator: validateText}
                    ],
                    isSigned: [
                        { validator: validateText}
                    ],
                    createDateMin: [
                        { validator: validateText}
                    ],
                    createDateMax: [
                        { validator: validateText}
                    ],
                    signedTimeMin: [
                        { validator: validateText}
                    ],
                    signedTimeMax: [
                        { validator: validateText}
                    ]
                },
            total:100,
            current:1,
            projectData:[],
            tableColumns: [
                    {
                        title: '项目编号',
                        key: 'projectCode',
                        render:(h, params) => {
                            return h('a', {on:{
                                click: () => {
                                    this.gotoDetail({id:params.row.id})
                                }
                            }},params.row.projectCode);
                        }
                    },
                    {
                        title: '项目名称',
                        key: 'projectName'
                    },
                    {
                        title: '项目经理',
                        key: 'projectManager'
                    },
                    {
                        title: '状态',
                        key: 'projectStatus',
                        render: (h, params) => {
                            return h('div', {},params.row.projectStatus == 0 ? '在建' : '完工');
                        }
                    },
                    {
                        title: '创建日期',
                        key: 'startTime'
                    },
                    {
                        title: '完工日期',
                        key: 'finishTime',
                        render: (h, params) => {
                            return h('div', {},params.row.projectStatus == 1 ? params.row.finishTime : '');
                        }
                    }
                ]
        }
    },
    created() {
        this.init()
    },
    computed: {
        ...mapGetters(['token','userInfo'])
    },
    methods: {
        ...mapActions(['getCompanyInfo','getProjectList']),
        @track.loading
        async init(){
            if(this.userInfo.userStatus == 0){
                this.getCompanyInfo()
            }else{
                this.getCompanyInfo()
                let query = JSON.parse(JSON.stringify(this.op))
                for (const key in query) {
                    if(query[key]){

                    }else{
                        delete query[key]
                    }
                }
                let data = (await this.getProjectList(query)).data
                    this.projectData = data.records
                    this.total = data.total
                    this.current = data.page
            }
        },
        @track.loading
        gotoDetail(query){
            this.$router.push({path:'/manager/project/projectDetail',query:query})
        },
        changePage (page) {
            this.op.current = page
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            this.init();
        },
        handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.init()
                    } else {
                        this.$Message.error('失败!');
                    }
                })
        }
    },
}
</script>