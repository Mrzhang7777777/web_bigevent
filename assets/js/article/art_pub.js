$(function() {
    let layer = layui.layer
    let form = layui.form





    initCate()


    // 初始化富文本编辑器
    initEditor()




    // 定义加载文章分类的方法
    function initCate() {

        $.ajax({
            method: 'GET',
            url: '/my/article/cates',

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }

                //调用模板引擎渲染分类下拉菜单
                let htmlStr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlStr)

                form.render()




            }





        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //选择封面按钮绑定事件
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()



    })

    //监听coverFile的change事件，获取用户选择的图片
    $('#coverFile').on('change', function(e) {
        //获取到文件的列表数据
        let files = e.target.files

        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }

        // 根据文件，创建对应的URL地址

        let newImgURL = URL.createObjectURL(files[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



    })



    //定义文章的发布状态
    let art_state = '已发布'


    $('#btnSave2').on('click', function() {
        art_state = '草稿'


    })


    //位表单绑定submit事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()


        //基于表单快速创建FormDate对象

        let fd = new FormData($(this)[0])

        fd.append('state', art_state)

        //将封面裁剪后的图片 输出为一个文件对象

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作


                //将文件对象存储到 fd中
                fd.append('cover_img', blob)

                //发起数据请求
                publishArticle(fd)

            })


        function publishArticle(fd) {

            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,

                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('发布文章失败')
                    }
                    layer.msg('发布文章成功')

                    location.href = '/article/art_list.html'



                }


            })

        }







    })





})