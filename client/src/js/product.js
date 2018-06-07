(function() {
    var ojzoom = Jzoom.play({ obj: "#JimgZoom", jzoomdivMax: 800, bigIMGURL: "http://image.efeihu.com/images/pdtimage/img_middle/" });

    $("#JPreviewSmall .list li").mouseenter(function() {
        var othis = $(this);
        othis.closest(".content").find("li").removeClass("curr");
        othis.addClass("curr");
        var strsrc = othis.find("img").attr("src");
        var start = strsrc.lastIndexOf("/") + 1;
        $("#JimgZoom").find("img").eq(0).attr("src", strsrc.replace('pdtimage/img_small', 'android'));
    });
    $("#JPreviewSmall .list li").eq(0).trigger('mouseenter');



    var Jinformation = new efeihu.Tab({ eventType: 'click', triggers: ".ui_tab_triggers_item", panels: '.ui_tab_item ', par: '#Jinformation', currClass: 'ui_tab_triggers_curr' });


    // var jtaocan = $("#Jtaocan .ui_tab_triggers .ui_tab_triggers_item");
    // jtaocan.last().addClass('last');
    // if (jtaocan.length == 1) {
    //     jtaocan.addClass('first last');
    // }
    // 
    // 

    $(".vi_choose .vi_choose_amount .ui_quantity button").on("click", function() {

        console.log($(this).text() == "+");
        if ($(this).text() == "+") {

            $(this).prev().val($(this).prev().val() - 0 + 1)
        } else {
            if ($(this).next().val() != 1) {
                $(this).next().val($(this).next().val() - 1)
            }
        }
    })

})();