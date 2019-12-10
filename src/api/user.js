import request from '@/utils/request'

export function login(data){
    return request({
        url:'/api/constructor/user/login',
        method:'post',
        data
    })
}
export function register(data){
    return request({
        url:'/api/constructor/user/registerByMobile',
        method:'post',
        data,
        headers:{'json':true}
    })
}
export function checkVerificationCode(data){
    return request({
        url:'/api/constructor/user/checkVerificationCode',
        method:'post',
        data
    })
}
export function sendVerificationCode(data){
    return request({
        url:'/api/constructor/user/sendVerificationCode',
        method:'post',
        data
    })
}
export function sendToOss(data){
    return request({
        url:'/api/constructor/user/sendToOss',
        method:'post',
        data
    })
}
export function getCompanyInfo(){
    return request({
        url:'/api/constructor/userEntity/getEntityInfo',
        method:'post'
    })
}
export function updataCompanyInfo(data){
    return request({
        url:'/api/constructor/userEntity/updateEntityInfo',
        method:'post',
        data
    })
}
export function resetUserInfo(data){
    return request({
        url:'/api/constructor/user/resetUserInfo',
        method:'post',
        data
    })
}