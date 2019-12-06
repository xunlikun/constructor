<template>
    <div v-if="data">
         <List>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" :description="data.projectCode" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" :description="data.projectName" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" :description="data.projectManager" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" :description="data.projectAccountant" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" :description="data.bankAccount" />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title"  />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title"  />
            </ListItem>
            <ListItem>
                <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title"  />
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