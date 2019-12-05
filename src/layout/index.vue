<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%',top:'0',zIndex:'1000'}">
                <Menu mode="horizontal" theme="dark" :active-name="currentMenuItemNum" @on-select='loading'>
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" to='/manager/project'>
                            <Icon type="ios-navigate"></Icon>
                            项目管理
                        </MenuItem>
                        <MenuItem name="2" to='/manager/contract'>
                            <Icon type="ios-keypad"></Icon>
                            合同管理
                        </MenuItem>
                        <MenuItem name="3" to='/manager/employee'>
                            <Icon type="ios-analytics"></Icon>
                            人员管理
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '33px 20px 0', background: '#fff', minHeight: '600px',textAlign:'left'}">
                <router-view></router-view>
            </Content>
            <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
        </Layout>
    </div>
</template>
<script>
import track from '@/utils/track.js'
    export default {
        data() {
            return {
                
            }
        },
        beforeRouteLeave(to,from,next){
            next(false)
        },
        computed: {
            currentMenuItemNum:{
                get(){
                    let op = {
                        "contract":'2',
                        "project":'1',
                        "employee":'3'
                    }
                    for (const key in op) {
                        if(key == this.$route.name.toLocaleLowerCase()){
                            return op[key]
                        }
                    }
                    return '1'
                },
                set(value){
                    return value
                }
            }
        },
        methods: {
            @track.loading
            loading(name){
                this.currentMenuItemNum = name
            }
        },
    }
</script>
