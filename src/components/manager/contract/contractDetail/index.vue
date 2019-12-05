<template>
<div class='main'>
    <div style="text-align:center">
        <Row>
            <Col span="12">
            <Button type="primary">
                <Icon type="ios-arrow-back" />
                上一份合同
            </Button>
           </Col>
            <Col span="12">
            <Button type="primary">
                下一份合同
                <Icon type="ios-arrow-forward" />
            </Button>
            </Col>
        </Row>
    </div>
    <div class='pdf_view'>

    </div>
</div>
</template>
<script>
import track from '@/utils/track.js'
export default {
    data() {
        return {
            op:{}
        }
    },
    methods: {
        @track.loading
        init(){
            let query = JSON.parse(JSON.stringify(this.op))
            for (const key in op) {
                if(op[key]){

                }else{
                    delete op[key]
                }
            }


        }
    },
} 
</script>
<style lang="scss">
    
</style>