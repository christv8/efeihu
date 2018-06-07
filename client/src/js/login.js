require(["config"], function() {
    require(["jquery", "jquery.validation"], function() {
        $("#myform").validate({
            submitHandler: function() {
                $.ajax({
                    url: "http://127.0.0.1/efeihu/server/login.php",
                    data: {
                        uname: $("[name=uname").val(),
                        upwd: $("[name=upwd]").val()
                    },
                    type: "post",
                    dataType: "json"
                }).done(function(res) {
                    if (res.status == 1) {
                        sessionStorage.setItem('userinfo', JSON.stringify(res.data));
                        window.location.assign("index1.html")
                    }
                    alert(res.msg)
                })
            }
        })
    })
})