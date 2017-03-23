$(function () {
    $('#login-box').on('submit',(e)=>{
        e.preventDefault();
        let username = $('#username').val(),
            password = $('#password').val();
        if(!username || !password){
            $('#notice').text('用户名或密码错误')
            return;
        }
        $.ajax({
            url:'/admin/login',
            method:'POST',
            data:$('#login-box').serialize(),
            dataType:'json',
            success:(res)=>{
                if(res){
                    if(res.code){
                        $('#notice').text(res.msg).css({'color':'green'})
                        location.href = "/admin"
                    }else{
                        $('#notice').text(res.msg).css({'color':'red'})
                    }
                }
            },
            error:(err)=>{
                layer.msg('登录失败');
            }
        })
    })
})