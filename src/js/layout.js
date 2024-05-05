var deviceMode;

function orgVH() {
    var vh;

    $(window).on("load resize orientationchange",function() {
        vh = window.innerHeight * 0.01; 
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
}

function initHeader() {
    var header = $("header#header");
    var hHeight;
    var tit = header.find("h1");

    $(window).on("load resize orientationchange",function() {
        hHeight = header.outerHeight();

        if($(window).width() > 1370) {
            deviceMode = "pc"
        } else if($(window).width() <= 1370) {
            deviceMode = "mo"
        }

        $(window).scroll();
    })

    $(window).on("scroll",function() {
        if($(window).scrollTop() > 0 && $(window).scrollTop() < hHeight/1.5) {
            scaleDist = (1 + ($(window).scrollTop()/1.5))
            bgColorDist = 1 - ((($(window).scrollTop()/hHeight)*2))
            //console.log(scaleDist)
            tit.css({
                "position": "",
                "top": "",
                "bottom": "",
                "transform": "scale("+scaleDist+")",
                "backgroundColor": "rgba(0,0,0,"+bgColorDist+")",
                "opacity": 1
            })
        } else if($(window).scrollTop() == 0) {
            tit.css({
                "transform": "scale(1)",
                "backgroundColor": "rgba(0,0,0,1)"
            })
        } else if($(window).scrollTop() >= hHeight/1.5) {
            tit.css({
                "position": "absolute",
                "top": "auto",
                "bottom": "0px",
                "backgroundColor": "rgba(0,0,0,0)",
                "opacity": 0
            })
        }
    })
}

function initGNB() {
    var gnb = $("nav#gnb");
    var gList = gnb.find(">ul");
    var gItem = gList.find(">li");
    var container = $("main#container");
    var content = container.find("section.content");
    var contOfsTop = new Array();
    var contHeight = new Array();
    var contViewIs = new Array();
    var oldTargetIdx = 0;
    var newTargetIdx = 0;

    $(window).on("load resize orientationchange",function() {
        content.each(function(k) {
            gItem.eq(k).css({
                "transition-delay": k*0.1+"s"
            })
            contOfsTop[k] = content.eq(k).offset().top
            contHeight[k] = content.eq(k).outerHeight()
            contViewIs[k] = false
        })

        $(window).scroll();
    })

    $(window).on("scroll",function() {
        if($(window).scrollTop() > $(window).height()/2 - gnb.height() && gList.hasClass("on") == false) {
            gList.addClass("on")
        } else if($(window).scrollTop() <= $(window).height()/2 - gnb.height() && gList.hasClass("on") == true) {
            gList.removeClass("on")
        }

        content.each(function(i) {
            if($(window).scrollTop() > contOfsTop[i] - ($(window).height()/2) && $(window).scrollTop() <= contOfsTop[i] + contHeight[i] - ($(window).height()/2) && contViewIs[i] == false) {
                gItem.find("a").removeClass("active");
                gItem.eq(i).find("a").addClass("active");

                oldTargetIdx = i;
                newTargetIdx = i;

                contViewIs[i] == true;
            } else if($(window).scrollTop() <= contOfsTop[i] - ($(window).height()/2) && contViewIs[i] == true || $(window).scrollTop() > contOfsTop[i] + contHeight[i] - ($(window).height()/2) && contViewIs[i] == true) {
                gItem.eq(i).find("a").removeClass("active");

                oldTargetIdx = i;
                newTargetIdx = i;

                contViewIs[i] == false;
            }
        })
    })

    gItem.find(">a").on("click",function() {
        newTargetIdx = $(this).parent().index();

        $("html,body").animate({
            "scrollTop": Math.round(contOfsTop[newTargetIdx])
        },300*(Math.abs(newTargetIdx - oldTargetIdx)),function() {
            oldTargetIdx = newTargetIdx;
        })

        return false;
    })
}