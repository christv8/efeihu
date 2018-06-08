// require(["config"], function() {

//     require(["jquery", "jquery.cookie"], function() {

//         var currentUser = JSON.parse(sessionStorage.getItem("userinfo") || "{}");
//         console.log(currentUser);

//         $("#ulogin").html("欢迎<a>" + currentUser.uname + "</a><a href='javascript:;' class='exit'>退出登录</a>")

//         $(".exit").on("click", function() {
//             sessionStorage.removeItem("userinfo");
//             $("#ulogin").html("<a href='login.html'>安全登录</a>")
//         })



//     })


// })