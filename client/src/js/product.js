(function() {

    var currentUser = JSON.parse(sessionStorage.getItem("userinfo") || "{}");
    console.log(currentUser);
    console.log($("#login "))
    $(".login").html("欢迎<a>" + currentUser.uname + "</a><a href='javascript:;' class='exit'>退出登录</a>")

    $(".exit").on("click", function() {
        sessionStorage.removeItem("userinfo");
        $(".login").html("<a href='login.html'>安全登录</a>")
    })


    var ojzoom = Jzoom.play({
        obj: "#JimgZoom",
        jzoomdivMax: 800,
        bigIMGURL: "http://image.efeihu.com/images/pdtimage/img_middle/"
    });

    $("#JPreviewSmall .list li").mouseenter(function() {
        var othis = $(this);
        othis.closest(".content").find("li").removeClass("curr");
        othis.addClass("curr");
        var strsrc = othis.find("img").attr("src");
        var start = strsrc.lastIndexOf("/") + 1;
        $("#JimgZoom").find("img").eq(0).attr("src", strsrc.replace('pdtimage/img_small', 'android'));
    });
    $("#JPreviewSmall .list li").eq(0).trigger('mouseenter');



    var Jinformation = new efeihu.Tab({
        eventType: 'click',
        triggers: ".ui_tab_triggers_item",
        panels: '.ui_tab_item ',
        par: '#Jinformation',
        currClass: 'ui_tab_triggers_curr'
    });

    $.ajax({
        url: "../../server/goodsById.php",
        data: {
            "pid": 1604524,
            "title": "比得兔多功能削皮器套装PR-2496 绿色 5秒快速削皮 迷你型削水果机",
            "dis": "比得兔多功能削皮器套装",
            "price": "45",

            "img": "picture/793f273b-ccad-43c1-8100-70d3c876fa66.jpg",
        },
        dataType: "json",
    }).then(function(res) {
        console.log(res.data)

        if (res.status == 1) {

            delete(res.data.dis);
            delete(res.data.imgList);
            $("#JbuyNow").attr("data-info", JSON.stringify(res.data))


        }

    })



    $(".vi_choose .vi_choose_amount .ui_quantity button").on("click", function() {


        if ($(this).text() == "+") {

            $(this).prev().val($(this).prev().val() - 0 + 1)
        } else {
            if ($(this).next().val() != 1) {
                $(this).next().val($(this).next().val() - 1)
            }
        }
    })
    $("#JbuyNow").on("click", function() {

        let currentData = $(this).data("info");

        if (currentUser.uid) {

            currentData["num"] = $(this).parent().siblings().find("input").val();
            currentData["uid"] = currentUser.uid;

            console.log(currentData)

            $.ajax({
                url: "../../server/addCart.php",
                data: currentData,
                type: "post",
                dataType: "json"
            }).then(function(res) {

                console.log(res)
                if (res.status == 1) {
                    if (confirm("是否立即结算")) {
                        window.location.assign("cart.html")
                    }
                }

                alert(res.msg)
            })


        } else {
            let cartCookie = JSON.parse($.cookie("cart") || '[]');
            console.log(cartCookie)
            let bFlag = true;
            cartCookie.forEach((ele, index) => {
                if (ele.pid == currentData.pid) {
                    ele.num = parseInt(ele.num) + parseInt($(this).parent().siblings().find("input").val())
                    bFlag = false;

                }
            })

            if (bFlag == true) {
                currentData['num'] = $(this).parent().siblings().find("input").val();
                cartCookie.push(currentData);
            }

            $.cookie("cart", JSON.stringify(cartCookie));
            if (confirm("是否结算")) {
                window.location.href = "cart.html"
            }
        }
    })




})();