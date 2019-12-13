<template>
<div>
    <div class='filter'>
        <Form ref="op" :model="op" :rules="ruleCustom" :label-width="80" inline>
            <FormItem label="合同编号" prop="contractCode">
                <Input size="small" type="text" v-model="op.contractCode"></Input>
            </FormItem>
            <FormItem label="合同标题" prop="contractTitle">
                <Input size="small" type="text" v-model="op.contractTitle"></Input>
            </FormItem>
            <FormItem label="对方" prop="partyB">
                <Input size="small" type="text" v-model="op.partyB"></Input>
            </FormItem>
            <FormItem label="状态">
                <Select v-model="op.isSigned">
                    <Option value="1">已签订</Option>
                    <Option value="0">待签订</Option>
                </Select>
            </FormItem>
            <FormItem label="创建日期">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="开始日期" @on-change='(format)=>{op.createDateMin = format.replace(/-/ig,"/")}'></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <DatePicker type="date" placeholder="结束日期" @on-change='(format)=>{op.createDateMax = format.replace(/-/ig,"/")}'></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="签署日期">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="开始日期" @on-change='(format)=>{op.signedTimeMin = format.replace(/-/ig,"/")}'></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <DatePicker type="date" placeholder="结束日期" @on-change='(format)=>{op.signedTimeMax = format.replace(/-/ig,"/")}'></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('op')">检索</Button>
            </FormItem>
        </Form>
    </div>
    <div class='multiple_asing'>
        <Button type="success" @click='confirm'>批量签约</Button>
    </div>
    <Table @on-selection-change='selection' :data="contractData" :columns="tableColumns" :style='{minHeight:"500px"}' stripe></Table>
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
        const validateText = (rule, value, callback) => {
                // if (value === '') {
                //     callback(new Error('请输入！'));
                // } else {
                    callback();
                // }
            };
        return {
            op: {
                    contractCode:'',
                    contractTitle:'',
                    partyB:'',
                    isSigned:'',
                    createDateMin:'',
                    createDateMax:'',
                    signedTimeMin:'',
                    signedTimeMax:''
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
            contractData:[],
            currentSelections:[],
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '合同编号',
                        key: 'contractCode',
                        render:(h, params) => {
                            return h('a', {on:{
                                click: () => {
                                    this.gotoDetail({contractType:params.row.contractType,id:params.row.id})
                                }
                            }},params.row.contractCode);
                        }
                    },
                    {
                        title: '合同标题',
                        key: 'contractTitle'
                    },
                    {
                        title: '我方',
                        key: 'partyA'
                    },
                    {
                        title: '对方',
                        key: 'partyB'
                    },
                    {
                        title: '状态',
                        key: 'contractStatus',
                        render: (h, params) => {
                            return h('div', {},params.row.isSigned ? '已签订' : '待签订');
                        }
                    },
                    {
                        title: '创建日期',
                        key: 'createDate'
                    },
                    {
                        title: '签订日期',
                        key: 'signedTime',
                        render: (h, params) => {
                            return h('div', {},params.row.isSigned ? params.row.signedTime.slice(0,19).replace('T',' ') : '');
                        }
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
                                }, '下载'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index)
                                        }
                                    }
                                }, '签约')
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
        ...mapActions(['getContractList']),
        @track.loading
        async init(){
            let query = JSON.parse(JSON.stringify(this.op))
            for (const key in query) {
                if(query[key]){

                }else{
                    delete query[key]
                }
            }

          let data = (await this.getContractList(query)).data
          this.contractData = data.records
          this.total = data.total
          this.current = data.page
        },
        @track.loading
        gotoDetail(query){
            this.$router.push({path:'/manager/contract/contractDetail',query:query})
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
        },
        selection(selections){
            this.currentSelections = selections
        },
        confirm () {
                this.$Modal.confirm({
                    title: '签约',
                    content: '<p>您将要执行批量签订？</p>',
                    onOk: () => {
                        if(this.currentSelections.length == 0){
                            return this.$Message.warning('请先选择！');
                        }
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
            }
    },
}
</script>
<style scoped>
    .multiple_asing{
        padding: 0 0 10px 10px;
    }
</style>
