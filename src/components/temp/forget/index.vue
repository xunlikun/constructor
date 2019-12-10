<template>
<div class="login_main">
    <div class='title'>
        <h1>系统标题</h1>
    </div>
    <div class='login'>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="loginName">
                <Input type="text" v-model="formInline.loginName" placeholder="登录名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="verificationCode">
                <Input type="text" v-model="formInline.verificationCode" placeholder="手机验证码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align:right">
                <!-- <router-link to="/reset"> -->
                    <Button type="primary" @click="handleSubmit('formInline')">
                        下一步
                    </Button>
                <!-- </router-link> -->
            </FormItem>
        </Form>
        <div class="caculate">
            <ul>
                <li> <router-link to="/login">返回登录</router-link> </li>
            </ul>
        </div>
    </div>
</div>
    
</template>
<script>
    export default {
        data () {
            const validateAuth = (rule, value, callback) => {

                checkVerificationCode({mobile:this.data.mobile,verificationCode:value,type:'resetPassWord'}).then(res => {
                    if(res.status == '200'){
                        this.SET_TEMP_TOKEN(res.data)
                        callback();
                        
                    }else{
                        
                        callback(new Error('验证码出错!'));
                    }
                })
                

            };
            const validateLoginName = (rule, value, callback) => {

                checkVerificationCode({mobile:this.data.mobile,verificationCode:value,type:'resetPassWord'}).then(res => {
                    if(res.status == '200'){
                        this.SET_TEMP_TOKEN(res.data)
                        callback();
                        
                    }else{
                        
                        callback(new Error('验证码出错!'));
                    }
                })
                

            };
            return {
                formInline: {},
                ruleInline: {
                    loginName: [
                        { validator: validateLoginName, trigger: 'blur' }
                    ],
                    verificationCode: [
                        { validator: validateAuth, trigger: 'input' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        
                    } else {
                        this.$Message.error('失败!');
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login{
        border-radius: 4px;
        background-color:#fff;
        padding: 50px 20px 30px 20px;
        width:333px;
        margin: 60px auto 0 auto;
        >div.caculate{
            >ul{
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                >li{
                    
                }
            }
        }
    }
</style>