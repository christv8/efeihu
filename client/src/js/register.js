require(["config"], function() {

    require(["jquery", "idcode", "jquery.validation", "additional.methods", "md5"], function() {

        $(function() {
            $.idcode.setCode();

            $("#myform").validate({
                submitHandler: function() {
                    if ($.idcode.validateCode()) {
                        $.ajax({
                            url: "../../server/register.php",
                            type: "post",
                            data: {
                                uname: $("[name='uname']").val(),
                                upwd: $("[name='upwd']").val(),
                            },
                            dataType: "json"
                        }).then(function(res) {
                            if (res.status == 1) {
                                if (confirm("注册成功,是否立即登录")) {
                                    window.location.assign("login.html")
                                }

                            } else {
                                alert(res.msg)
                            }
                        })
                    } else {
                        alert("验证码错误")
                    }
                    return false;
                },


                rules: {
                    uname: {
                        'required': true,
                        'rangelength': [6, 18],
                        remote: {
                            type: "get",
                            url: "../../server/IsExistUser.php",
                        }
                    },
                    upwd: {
                        'required': true,
                        'rangelength': [6, 18]
                    },
                    upwd1: {
                        equalTo: "#upwd"
                    },
                    email: {
                        required: true,
                        email: true
                    },

                },
                messages: {
                    uname: {
                        required: "用户名必填",
                        rangelength: "用户名长度必须6-18之间",
                        remote: "该用户名已经存在"
                    },
                    upwd: {
                        required: "密码必填",
                        rangelength: "密码长度必须6-18之间"
                    },
                    upwd1: {
                        equalTo: '2次密码不一致'
                    },
                    email: {
                        required: "请输入一个正确的邮箱",
                        email: "请输入合法邮箱"
                    }
                }
            })



        })

    })

})