<template>
    <div>
        <div class="header">
            <h1>等待审核</h1>
            
        </div>
        <div class="msg">
            <p>您的实名认证信息正在审核中，请耐心等待审核结果（最长3个工作日内完成审核）</p>
            <p><span>用户类型：</span><span></span></p>
            <p><span>认证方式：</span><span></span></p>
            <p><span>单位名称：</span><span>{{companyInfo.companyName}}</span></p>
            <p><span>单位证件号：</span><span></span></p>
            <p><span>提交时间：</span><span></span></p>
        </div>
    </div>
</template>
<script>
import { localStorages } from '@/utils/cache.js'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            userInfo:localStorages.get('basicInformation') ? JSON.parse(localStorages.get('basicInformation')) : '',
            companyInfo:localStorages.get('companyInfo') ? JSON.parse(localStorages.get('companyInfo')) : ''
        }
    },
    created(){
        this.init()
    },
    methods: {
        ...mapActions(['login']),
        init(){
            if(this.$route.name == 'WaitingPeriod'){
                this.$Message.success('5秒后将自动登录!');
                setTimeout(async ()=>{
                    await this.login({loginName:this.userInfo.loginName,password:this.userInfo.password})
                },5000)
            }
            
        }
    },
}
</script>
<style lang='scss' scoped>
    .msg{
        line-height: 35px;
    }
</style>