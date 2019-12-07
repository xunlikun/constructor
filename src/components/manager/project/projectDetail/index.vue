<template>
    <div v-if="data">
         <List>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="项目编号" :description="data.projectCode" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="项目部名称" :description="data.projectName" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="项目经理" :description="data.projectManager" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="项目财务" :description="data.projectAccountant" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="银行账号" :description="data.bankAccount" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="状态" :description="data.status == 0 ? '在建':'完工'" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="创建日期" :description="data.createDate"/>
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="完工日期" :description="data.status == 0 ? '未完工' : data.finishTime"/>
            </ListItem>
        </List>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import { getProjectDetail } from '@/api/project.js'
export default {
    data() {
        return {
            data:''
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
                    this.data = res.data
                }
            })

        }
    },
} 
</script>
<style lang="scss">
    
</style>