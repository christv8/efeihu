// require(["config"], function() {

//     require(["jquery", "jquery.cookie"], function() {




//     })
// })
// 
(function() {







    $(".vi_choose .vi_choose_amount .ui_quantity span").on("click", function() {
        if ($(this).text() == "+") {
            $(this).prev().val($(this).prev().val() - 0 + 1)
        } else {
            if ($(this).next().val() != 1) {
                $(this).next().val($(this).next().val() - 1)
            }
        }
    })
})();