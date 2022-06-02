$(function() {
    let form = layui.form
    let layer = layui.layer




    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        regPwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不相同'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('重置密码失败')
                }

                layer.msg('重置密码成功')
                    //清空重制表单

                //$('.layui-form')[0]转化为原生DOM对象
                $('.layui-form')[0].reset()


            }



        })


    })



})