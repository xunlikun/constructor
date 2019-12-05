<template>
<div class="login_main">
    <div class='title'>
        <h1>系统标题</h1>
    </div>
    <div class='login'>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user" >
                <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="text" >
                <Input type="text" v-model="formInline.text" placeholder="Auth">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align:right">
                <router-link to="/reset">
                    <Button type="primary" @click="handleSubmit('formInline')">
                        
                        下一步
                    </Button>
                </router-link>
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
            return {
                formInline: {
                    user: '',
                    password: '',
                    passwdCheck:'',
                    tel:''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于六位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
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