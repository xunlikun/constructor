
const getters = {
    //app
    spinShow: state => state.app.spinShow,
    //user
    userInfo: state => state.user.userInfo,
    companyInfo: state => state.user.companyInfo,
    registerData: state => state.user.register,
    token: state => state.user.token
}

export default getters