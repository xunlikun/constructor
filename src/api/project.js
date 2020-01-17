import request from '@/utils/request'

export function getProjectList(data){
    return request({
        url:'/api/constructor/project/list',
        method:'post',
        data
    })
}
export function getProjectDetail(data){
    return request({
        url:'/api/constructor/project/getProjectDetail',
        method:'post',
        data
    })
}
export function saveProjectDetail(data){
    return request({
        url:'/api/constructor/project/save',
        method:'post',
        data
    })
}