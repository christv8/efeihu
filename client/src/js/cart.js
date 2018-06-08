require(["config"], function() {

    require(["jquery", "jquery.cookie"], function() {

        var currentUser = JSON.parse(sessionStorage.getItem("userinfo") || "{}");


        $(".login").html("欢迎<a>" + currentUser.uname + "</a><a href='javascript:;' class='exit'>退出登录</a>")

        $(".exit").on("click", function() {
            sessionStorage.removeItem("userinfo");
            $(".login").html("<a href='login.html'>安全登录</a>")
        })

    })


})