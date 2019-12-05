import request from '@/utils/request'

export function getEmployeeList(data){
    return request({
        url:'/api/constructor/employee/list',
        method:'post',
        data
    })
}