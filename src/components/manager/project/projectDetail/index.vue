<template>
    <div class='main' v-if="data">
         <template v-if='$route.query.calculate == "search"'>
            <List style="width:500px;margin:0 auto">
                <header>
                    <h1 style="line-height:50px;text-align:center;color:#2d8cf0;opacity:.6;margin-top:0">项目详情</h1>
                </header>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/bianhao.png')" title="项目编号" :description="data.projectCode" />
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/shebeimingcheng.png')" title="项目部名称" :description="data.projectName" />
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/chengshijinglixianxing.png')" title="项目经理" :description="data.projectManager" />
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/caiwubaobiao.png')" title="项目财务" :description="data.projectAccountant" />
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/changyongicon-.png')" title="银行账号" :description="data.bankAccount" />
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/fazhuangtai.png')" title="状态" :description="data.projectStatus == 0 ? '在建':'完工'" />
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/riqi.png')" title="创建日期" :description="data.createDate"/>
                </ListItem>
                <ListItem>
                    <ListItemMeta :avatar="require('@/assets/images/list/riqi.png')" title="完工日期" :description="data.projectStatus == 0 ? '未完工' : data.finishTime"/>
                </ListItem>
            </List>
        </template>
        <template v-else-if='$route.query.calculate == "editor"'>
            <Tabs size="small">
                <TabPane label="更新信息">
                    <div style="width:500px;margin:0 auto">
                        <Form ref="data" :model="data" :rules="ruleInline">
                            <FormItem prop="projectCode" label="工程编号">
                                <Input type="text" v-model="data.projectCode" placeholder="工程编号">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="projectName" label="工程名称">
                                <Input type="text" v-model="data.projectName" placeholder="工程名称">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="bankAccount" label="银行账户">
                                <Input type="text" v-model="data.bankAccount" placeholder="银行账户">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="projectStatus" label="工程状态">
                                <Select v-model="data.projectStatus">
                                    <Option value="0">在建</Option>
                                    <Option value="1">完工</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop="projectManagerCode" label="项目经理">
                                <Select
                                    v-model="data.projectManagerCode"
                                    filterable
                                    remote
                                    :remote-method="remoteMethod1"
                                    :loading="loading1">
                                    <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.userName}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop="projectAccountantCode" label="项目财务">
                                <Select
                                    v-model="data.projectAccountantCode"
                                    filterable
                                    remote
                                    :remote-method="remoteMethod1"
                                    :loading="loading1">
                                    <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.userName}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop="startTime" label="开工日期">
                                <DatePicker v-model="data.startTime" type="datetime" placeholder="Select date and time" @on-change='(format)=>{data.startTime = format}' style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem prop="finishTime" label="完工日期" v-if="data.projectStatus == 1">
                                <DatePicker v-model="data.finishTime" type="datetime" placeholder="Select date and time" @on-change='(format)=>{data.finishTime = format}' style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem style="text-align:right">
                                <!-- <router-link to="/companyInfo"> -->
                                <Button type="primary" @click="handleSubmit('data')">更新</Button>
                                <!-- </router-link> -->
                                
                            </FormItem>
                        </Form>
                    </div>
                </TabPane>
            </Tabs>
        </template>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import { getProjectDetail } from '@/api/project.js'
import { saveProjectDetail,getEmployeeInfo } from '@/api/project.js'
export default {
    data() {
        const validateText = (rule, value, callback) => {
                if (value == '' && !value) {
                    callback(new Error('请输入！'));
                } else {
                    callback();
                }
            };
        const timeStart = (rule, value, callback) => {
                if (typeof value == 'object') {
                    this.data.startTime = this.getMyDate(value.getTime())
                    callback();
                } else {
                    callback();
                }
                callback();
            };
        const timeFinish = (rule, value, callback) => {
                if (typeof value == 'object') {
                    this.data.finishTime = this.getMyDate(value.getTime())
                    callback();
                } else {
                    callback();
                }
                callback();
            };
        return {
            data:{startTime:''},
            loading1:false,
            options1:[],
            ruleInline:{
                projectCode: [
                    { validator: validateText}
                ],
                projectName: [
                    { validator: validateText}
                ],
                bankAccount: [
                    { validator: validateText}
                ],
                projectStatus: [
                    { validator: validateText}
                ],
                projectManagerCode: [
                    { validator: validateText}
                ],
                projectAccountantCode: [
                    { validator: validateText}
                ],
                startTime:[
                    {validator:timeStart}
                ],
                finishTime:[
                    {validator:timeFinish}
                ]
            }
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

            getProjectDetail(query).then( res => {
                if(res.status == 200){
                    if(this.$route.query.calculate == 'editor'){
                        this.data = res.data
                        this.data.projectStatus = this.data.projectStatus + ''
                    }else{
                        this.data = res.data
                    }
                    
                }
            })

        },
        remoteMethod1(query){
                    this.loading1 = true;
                    getEmployeeInfo().then(res => {
                       
                       this.options1 = res.data
                       this.loading1 = false
                    })
                    
        },
        async saveProjectDetail(){
            let status = (await saveProjectDetail(this.data)).status
                        if(status == 200){
                           this.$Message.success('成功!'); 
                        }else{
                            this.$Message.error('服务器开小差去啦!');
                        }
        },
        async handleSubmit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        await this.saveProjectDetail()
                        
                    } else {

                        this.$Message.error('请补充信息!');
                        
                    }
                })
            },
    getMyDate(str){  
      var date = new Date(str),  
      oYear = date.getFullYear(), //年  
      oMonth = date.getMonth()+1, //月  
      oDay = date.getDate(),  //日
      h = date.getHours(),//小时
      m = date.getMinutes(),//分钟
      s = date.getSeconds();//秒数
      // 以自己需要的方式拼接
      var oTime = oYear +'-'+ this.getZero(oMonth) +'-' + this.getZero(oDay)+' ' + this.getZero(h) + ':' +  this.getZero(m)+ ':' +  this.getZero(s);//最后拼接时间  
      return oTime;  
    },
    getZero(num){  
      // 单数前面加0
      if(parseInt(num) < 10){  
        num = '0'+num;  
      }  
      return num;  
    }
    },
} 
</script>
<style lang="scss" scoped>
    .main{
        margin: 0 auto;
        box-shadow: 0 0 10px 1px #eee;
    }
</style>