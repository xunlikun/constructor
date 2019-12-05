import request from '@/utils/request'

export function getContractList(data){
    return request({
        url:'/api/constructor/contract/list',
        method:'post',
        data
    })
}
export function getContractDetail(data){
    return request({
        url:'/api/constructor/contract/getContractDetail',
        method:'post',
        data
    })
}