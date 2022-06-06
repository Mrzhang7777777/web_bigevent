$(function() {

    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;

    //定义美化事件的过滤器
    template.defaults.imports.dataFormat = function(data) {

        let dt = new Date(data)


        let y = dt.getFullYear()

        let m = padZero(dt.getMonth() + 1)

        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())

        let mm = padZero(dt.getMinutes())

        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '-' + '' + hh + ':' + mm + ':' + ss
    }



    //定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n


    }






    //定义一个查询的参数对象 将来发请求给  需要提交给服务器


    let q = {
        pagenum: 1, //	页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', //	文章的状态，可选值有：已发布、草稿
    }

    initTable()

    initCate()




    //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)


                renderPage(res.total)



            }
        })
    }



    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表分类失败')
                }

                //调用模板引擎渲染分类可选项

                let htmlStr = template('tpl-cate', res)


                $('[name=cate_id]').html(htmlStr)



                //重新渲染表单区域
                form.render()

            }
        })

    }



    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            //获取表单中选中项的值
        let cate_id = $('[name=cate_id]').val()

        let state = $('[name=state]').val()

        // 为查询对象Q中对应属性赋值
        q.cate_id = cate_id
        q.state = state
        initTable()


    })



    //定义渲染分页的方法
    function renderPage(total) {

        laypage.render({
            elem: 'pageBox', //分页容器的ID
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认选中第几页

            layout: ['count', 'limit',
                'prev', 'page', 'next', 'skip'
            ],
            limits: [2, 3, 5, 10],



            //分页发生切换时 触发jump回调函数
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            },



        })
    }


    //通过代理的方式，给删除按钮绑定事件
    $('tbody').on('click', '.btn-delete', function() {
        //获取删除按钮的个数
        let len = $('.btn-delete').length



        let id = $(this).attr('data-id')


        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                        //此时页码值还是不变
                        // 需要判断这一页还有没有剩余数据，没有页码值的话需要页码值-1再重新调用initTable

                    if (len > 1) {
                        initTable()
                    }

                    q.pagenum = q.pagenum - 1

                    initTable()





                }



            })

            layer.close(index);
        });


    })


})