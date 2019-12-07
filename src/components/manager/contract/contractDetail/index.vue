<template>
<div class='main'>
    <div style="text-align:center">
        <Row>
            <Col span="12">
            <Button type="primary" @click='preContract'>
                <Icon type="ios-arrow-back" />
                上一份合同
            </Button>
           </Col>
            <Col span="12">
            <Button type="primary" @click='nexContract'>
                下一份合同
                <Icon type="ios-arrow-forward" />
            </Button>
            </Col>
        </Row>
    </div>
    <div class='pdf_view'>
        <Row>
            <Col span="24" style='text-align:center;margin-top:50px;'>
                <div style='position:relative;display:inline-block;width=55.5%;border:1px solid #ccc'>
                    <img :src='currentContract' width='100%'/>
                        <Row style='position:absolute;top:-32px;right:0'>
                            <Col span="12">
                                <Button type="primary">
                                    下载
                                </Button>
                            </Col>
                            <Col span="12">
                                <Button type="primary">
                                    签订
                                </Button>
                            </Col>
                    </Row>
                </div>
           </Col>
        </Row>
    </div>
</div>
</template>
<script>
import track from '@/utils/track.js'
import { getContractDetail,getNextContract,getPreviousContract } from '@/api/contract.js'
export default {
    data() {
        return {
            pre:{},
            nex:{},
            currentContract:'',
            currentContractTime:''
        }
    },
    created() {
        this.init()
    },
    methods: {
        @track.loading
        async init(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){

                }else{
                    delete query[key]
                }
            }

            let data = (await getContractDetail(query)).data
                this.currentContract = data.contractPath
                this.currentContractTime = data.createDate
        },
        @track.loading
        async preContract(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){
                    if(key == 'id')delete query[key]   
                }else{
                    delete query[key]
                }
            }
            query['createDate'] = this.currentContractTime

            let data = (await getPreviousContract(query)).data
                this.currentContract = data.contractPath
                this.currentContractTime = data.createDate
        },
        @track.loading
        async nexContract(){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            for (const key in query) {
                if(query[key]){
                    if(key == 'id')delete query[key]   
                }else{
                    delete query[key]
                }
            }
            query['createDate'] = this.currentContractTime

            let data = (await getNextContract(query)).data
                this.currentContract = data.contractPath
                this.currentContractTime = data.createDate
        }
    },
} 
</script>
<style lang="scss">
    
</style>