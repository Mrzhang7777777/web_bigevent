;
(function() {
    let form = layui.form
    let layer = layui.layer



    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }

    })


    initUserInfo()
        //从服务器获取渲染用户的信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }


                //调用form.val()给表单快速赋值

                form.val('formUserInfo', res.data)


            }

        })




    }


    //重置表单的数据
    $('#btn_reg').on('click', function(e) {
        //阻止表单的重制行为
        e.preventDefault()

        initUserInfo()


    })


    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }

                // console.log(res);
                layer.msg('更新用户信息成功')

                //调用父页面的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo()


            }






        })




    })











    // $('#btn_sub').on('click', function(e) {
    //     e.preventDefault()






    // })








})()