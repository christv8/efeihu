// 放大镜
function Jzoom(o) {
    Jzoom.$newNum++;
    this.$namespace = ".Jzoom" + Jzoom.$newNum;

    if (!o) { return false; }

    if (o.obj !== undefined) {
        this.obj = $(o.obj);
    }
    if (o.jzoomdivMax !== undefined) {
        this.jzoomdivMax = o.jzoomdivMax;
    }
    if (o.bigIMGURL !== undefined) {
        this.bigIMGURL = o.bigIMGURL;
    }
}
Jzoom.prototype.init = function() {
    var othis = this;
    othis.imgWidth = parseInt(othis.obj.width());
    othis.imgHeight = parseInt(othis.obj.height());
    othis.imgLeft = parseInt(othis.obj.css("paddingLeft"));
    othis.imgTop = parseInt(othis.obj.css("paddingTop"));

    othis.obj.mouseenter({ othis: othis }, function(event) {
        var othis = event.data.othis;
        othis.eventX = event.pageX;
        othis.eventY = event.pageY;
        othis.obj.orialLeft = parseInt(othis.obj.offset().left) + othis.imgLeft + parseInt(othis.obj.css("borderLeftWidth"));
        othis.obj.orialTop = parseInt(othis.obj.offset().top) + othis.imgTop + parseInt(othis.obj.css("borderTopWidth"));

        var zoomPupSet = {};
        zoomPupSet.orialX = othis.imgLeft;
        zoomPupSet.orialY = othis.imgTop;
        zoomPupSet.rangeWidth = othis.imgWidth;
        zoomPupSet.rangeHeight = othis.imgHeight;
        zoomPupSet.endX = zoomPupSet.orialX + zoomPupSet.rangeWidth;
        zoomPupSet.endY = zoomPupSet.orialY + zoomPupSet.rangeHeight;
        othis.zoomPupSet = zoomPupSet;

        othis.jzoomPup = $("<div class='vi_zoomPup'></div>");
        othis.jzoomPup.appendTo(othis.obj);
        zoomPupSet.width = othis.jzoomPup.outerWidth();
        zoomPupSet.height = othis.jzoomPup.outerHeight();

        if (othis.eventX - othis.obj.orialLeft < zoomPupSet.width / 2) {
            othis.eventX = zoomPupSet.orialX + zoomPupSet.width / 2;
        } else if (zoomPupSet.rangeWidth + othis.obj.orialLeft < othis.eventX + zoomPupSet.width / 2) {
            othis.eventX = zoomPupSet.endX - zoomPupSet.width / 2;
        } else {
            othis.eventX = othis.eventX - othis.obj.orialLeft + zoomPupSet.orialX;
        }

        if ((othis.eventY - othis.obj.orialTop) < zoomPupSet.height / 2) {
            othis.eventY = zoomPupSet.orialY + zoomPupSet.height / 2;
        } else if (zoomPupSet.rangeHeight + othis.obj.orialTop < othis.eventY + zoomPupSet.height / 2) {
            othis.eventY = zoomPupSet.endY - zoomPupSet.height / 2;
        } else {
            othis.eventY = othis.eventY - othis.obj.orialTop + zoomPupSet.orialY;
        }

        othis.jzoomPup.css({ "left": othis.eventX - zoomPupSet.width / 2 });
        othis.jzoomPup.css({ "top": othis.eventY - zoomPupSet.height / 2 });

        othis.jzoomdiv = $("<div class='vi_zoomdiv'><img src='' /></div>");
        var strimg = othis.obj.find("img").eq(0).attr("src");
        othis.jzoomdivImg = othis.jzoomdiv.find("img").eq(0);

        othis.jzoomdivImg.attr("src", othis.bigIMGURL + strimg.slice(strimg.lastIndexOf("/") + 1));
        othis.jzoomdiv.appendTo("body");
        othis.jzoomdiv.css({ "left": parseInt(othis.obj.offset().left) + parseInt(othis.obj.outerWidth()) });
        othis.jzoomdiv.css({ "top": parseInt(othis.obj.offset().top) });
        othis.jzoomdivImg.css({ "left": -(othis.eventX - zoomPupSet.width / 2 - zoomPupSet.orialX) * othis.jzoomdivMax / (zoomPupSet.rangeWidth) });
        othis.jzoomdivImg.css({ "top": -(othis.eventY - zoomPupSet.height / 2 - zoomPupSet.orialY) * othis.jzoomdivMax / (zoomPupSet.rangeHeight) });


        $(document.body).bind("mousemove" + othis.$namespace, { othis: othis }, function(event) {
            var othis = event.data.othis;
            othis.eventX = event.pageX;
            othis.eventY = event.pageY;

            if (othis.eventX - othis.obj.orialLeft < zoomPupSet.width / 2) {
                othis.eventX = zoomPupSet.orialX + zoomPupSet.width / 2;
            } else if (zoomPupSet.rangeWidth + othis.obj.orialLeft < othis.eventX + zoomPupSet.width / 2) {
                othis.eventX = zoomPupSet.endX - zoomPupSet.width / 2;
            } else {
                othis.eventX = othis.eventX - othis.obj.orialLeft + zoomPupSet.orialX;
            }

            if ((othis.eventY - othis.obj.orialTop) < zoomPupSet.height / 2) {
                othis.eventY = zoomPupSet.orialY + zoomPupSet.height / 2;
            } else if (zoomPupSet.rangeHeight + othis.obj.orialTop < othis.eventY + zoomPupSet.height / 2) {
                othis.eventY = zoomPupSet.endY - zoomPupSet.height / 2;
            } else {
                othis.eventY = othis.eventY - othis.obj.orialTop + zoomPupSet.orialY;
            }

            othis.jzoomPup.css({ "left": othis.eventX - zoomPupSet.width / 2 });
            othis.jzoomPup.css({ "top": othis.eventY - zoomPupSet.height / 2 });

            othis.jzoomdivImg.css({ "left": -(othis.eventX - zoomPupSet.width / 2 - zoomPupSet.orialX) * othis.jzoomdivMax / (zoomPupSet.rangeWidth) });
            othis.jzoomdivImg.css({ "top": -(othis.eventY - zoomPupSet.height / 2 - zoomPupSet.orialY) * othis.jzoomdivMax / (zoomPupSet.rangeHeight) });
        });
    });

    othis.obj.mouseleave({ othis: othis }, function(event) {
        try {
            $(document.body).unbind("mousemove" + othis.$namespace);
            othis.jzoomPup.remove();
            othis.jzoomdiv.remove();
        } catch (e) {

        }
    });
}
Jzoom.$newNum = 0;
Jzoom.play = function(o) {
    var oJzoom = new Jzoom(o);
    oJzoom.init();
    return oJzoom;
}






/* ----------------------------------------------
@ BackTop :返回顶部
------------------------------------------------- */
function BackTop(o) {
    BackTop.$newNum++;
    this.$id = BackTop.$newNum;
    this.$namespace = ".BackTop" + this.$id;

    if (o == undefined) {
        return false;
    }
    if (o.obj) {
        this.obj = $(o.obj);
    }
}
BackTop.$newNum = 0;

BackTop.prototype.init = function() {
    var othis = this;
    othis.obj.click(function(event) {
        $(window).scrollTop(0);
        try {
            event.preventDefault();
        } catch (e) {}
        return false;
    });
}
BackTop.prototype.show = function() {
    var othis = this;

    $(window).bind("scroll" + othis.$namespace, { othis: othis }, function(event) {
        var othis = event.data.othis;
        var winH = parseInt($(window).height());
        var scrollTop = parseInt($(window).scrollTop());

        var isIE6 = !!($.browser.msie && Number($.browser.version) <= 6);
        if (isIE6) {
            othis.obj.css({ "top": scrollTop + winH });
        }

        if (scrollTop < Math.floor(winH / 2)) {
            othis.obj.fadeOut();
        } else {
            othis.obj.fadeIn();
        }
    });
}
BackTop.prototype.hide = function() {
    var othis = this;
    $(window).unbind("scroll" + othis.$namespace);
}
BackTop.play = function(o) {
    var obankTop = new BackTop(o);
    obankTop.init();
    obankTop.show();
    return obankTop;
}