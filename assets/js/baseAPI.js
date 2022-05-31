//每次调用$.get() $.ajax时

// 都会先调用这个函数
// 这个函数中可以拿到我们给ajax提供的配置对象


$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url


    //为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一配置complete
    //不论成功还是失败都会调用complete函数
    options.complete = function(res) {
        console.log(res);
        //在complete中 可以使用responseJSON 拿到服务器响应回来的数据

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token')
                //强制跳转登录页面
            location.href = ('/login.html')
        }
    }



})