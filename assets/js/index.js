;
(function() {

    let layer = layui.layer
        //获取用户的基本信息
    getUserInfo()

    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空本地存储的 TOkend
            localStorage.removeItem('token')


            //重新跳转到登录页面
            location.href = '/login.html'


            layer.close(index);
        });

    })


    function getUserInfo() {
        $.ajax({
            method: 'GET',

            url: '/my/userinfo',

            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },

            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }

                renderAvatar(res.data)

            },

            //不论成功还是失败都会调用complete函数

            complete: function(res) {
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
    }

    //渲染用户的信息
    function renderAvatar(user) {
        let name = user.nickname || user.username

        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }





})();