import request from '@/utils/request'

export function getProjectList(data){
    return request({
        url:'/api/constructor/project/list',
        method:'post',
        data
    })
}