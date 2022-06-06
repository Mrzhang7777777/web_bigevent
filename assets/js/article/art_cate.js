$(function() {
    let layer = layui.layer
    let form = layui.form

    initArtCateList()



    //获取文章分类的列表

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {

                let htmlStr = template('tpl-table', res)



                $('tbody').html(htmlStr)





            },




        })




    }
    //为添加类别按钮绑定点击事件

    let indexAdd = null


    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()


        })


    })




    //通过代理方式 为FORM-ADD 表单绑定submit事件



    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }

                initArtCateList()



                layer.msg('新增分类成功')
                layer.close(indexAdd)

                initArtCateList()


            }
        })
    })



    //通过代理方式给编辑按钮绑定点击事件

    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {



        //弹出一个文章修改类别的弹出层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()


        })



        let id = $(this).attr('data-id')

        //发起请求获取对应分类的数据

        $.ajax({

            method: 'GET',
            url: '/my/article/cates/' + id,

            success: function(res) {

                form.val('form-edit', res.data)



            }


        })


    })


    //通过代理 为修改分类的表单绑定submit事件


    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('更新数据失败')
                }

                layer.msg('更新数据成功')
                layer.close(indexEdit)

                initArtCateList()
            }

        })






    })


    //通过代理方式给删除按钮绑定点击事件

    $('tbody').on('click', '.btn-cle', function() {
        let id = $(this).attr('data-id')

        //提示用户是否需要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('文章分类删除失败')
                    }

                    layer.msg('文章分类删除成功')
                    layer.close(index);

                    initArtCateList()

                }




            })


        });



    })





})