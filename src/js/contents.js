function initSectionContents() {
    var container = $("#container");
    var contents = container.find("section.content");

    contents.each(function() {
        if($(this).attr("id") == "about") { iscAbout(); }
        if($(this).attr("id") == "story") { iscStory(); }
        if($(this).attr("id") == "portfolio") { iscPortfolio(); }
        if($(this).attr("id") == "contact_us") { iscContactUs(); }
    })
}

function iscAbout() {
    var about = $("section#about");
    var abOfsTop;
    var abHeight;
    var abViewIs = false;
    var abTit = about.find("h2");
    var abtOfsTop;
    var abPhoto = about.find(".about_photo");
    var abpOfsTop;
    var abCont = about.find(".about_cont");
    var intro = about.find(".about_cont.intro")
    var iTxt = intro.find(".intro_inner>p");
    var abcHeight;
    var abcOfsTop = new Array();
    var abcViewIs = new Array();
    var profile = about.find(".about_cont.profile");
    var pfList = profile.find(">ul");
    var pfItem = pfList.find(">li");
    var skill = about.find(".about_cont.skill");
    var skList = skill.find(">ul");
    var skItem = skList.find(">li");

    iTxt.each(function(a) {
        iTxt.eq(a).css({
            "transition-delay": (a+1)*0.1+"s"
        })
    })
    pfItem.each(function(b) {
        pfItem.eq(b).css({
            "transition-delay": (b+1)*0.1+"s"
        })
    })
    skItem.each(function(c) {
        skItem.eq(c).css({
            "transition-delay": (c+1)*0.1+"s"
        })
        skItem.eq(c).find(".gauge .bar").css({
            "transition-delay": ((c+1)*0.1)+0.1+"s"
        })
    })

    $(window).on("load resize orientationchange",function() {
        abOfsTop = about.offset().top;
        abHeight = about.outerHeight();
        abtOfsTop = abTit.offset().top;
        abpOfsTop = abPhoto.offset().top;

        abCont.each(function(k) {
            abcHeight = $(window).height()/2
            if(deviceMode == "pc") {
                abcOfsTop[k] = abOfsTop + (abcHeight * k);
            } else if(deviceMode == "mo") {
                abcOfsTop[k] = abCont.eq(k).offset().top - (abcHeight*1.5);
            }
            abcViewIs[k] = false;
        })

        $(window).scroll();
    })

    $(window).on("scroll",function() {
        if($(window).scrollTop() >= abOfsTop && $(window).scrollTop() <= abOfsTop + abHeight - $(window).height() && abViewIs == false) {
            if(deviceMode == "pc") {
                abTit.css({
                    "position": "fixed",
                    "top": ""
                })
                abCont.css({
                    "position": "fixed",
                    "top": "",
                    "bottom": ""
                })
                abPhoto.css({
                    "position": "fixed",
                    "top": ""
                })
            } else if(deviceMode == "mo") {
                abTit.removeAttr("style")
                abCont.removeAttr("style")
                abPhoto.removeAttr("style")
            }

            abViewIs = true;
        } else if($(window).scrollTop() < abOfsTop) {
            if(deviceMode == "pc") {
                abTit.css({
                    "position": "",
                    "top": ""
                })
                abCont.css({
                    "position": "",
                    "top": "",
                    "bottom": ""
                })
                abPhoto.css({
                    "position": "",
                    "top": ""
                })
            } else if(deviceMode == "mo") {
                abTit.removeAttr("style")
                abCont.removeAttr("style")
                abPhoto.removeAttr("style")
            }

            abViewIs = false;
        } else if($(window).scrollTop() > abOfsTop + abHeight - $(window).height() && abViewIs == true) {
            if(deviceMode == "pc") {
                abTit.css({
                    "position": "absolute",
                    "top": $(window).scrollTop() - abOfsTop + (abtOfsTop - abOfsTop) + "px"
                })
                abCont.css({
                    "position": "absolute",
                    "top": $(window).scrollTop() - abOfsTop + "px"
                })
                abPhoto.css({
                    "position": "absolute",
                    "top": $(window).scrollTop() - abOfsTop + (abpOfsTop - abOfsTop) + "px"
                })
            } else if(deviceMode == "mo") {
                abTit.removeAttr("style")
                abCont.removeAttr("style")
                abPhoto.removeAttr("style")
            }

            abViewIs = false;
        }

        abCont.each(function(i) {
            if($(window).scrollTop() >= abcOfsTop[i] && $(window).scrollTop() <= abcOfsTop[i] + abcHeight && abcViewIs[i] == false) {
                abCont.removeClass("on");
                abCont.eq(i).addClass("on");
                abcViewIs[i] = true;
            } else if($(window).scrollTop() < abcOfsTop[i] && abcViewIs[i] == true || $(window).scrollTop() > abcOfsTop[i] + abcHeight && abcViewIs[i] == true) {
                abcViewIs[i] = false;
            }
        })
    })
}

function iscStory() {
    var story = $("section#story")
    var stOfsTop;
    var stHeight;
    var stViewIs;
    var stCont = story.find(">.story_cont");
    var stcOfsTop = new Array();
    var stcHeight = new Array();
    var stcViewIs = new Array();
    var footer = $("#footer");
    var fsOfsTop;

    $(window).on("load resize orientationchange",function() {
        stOfsTop = story.offset().top;
        stHeight = story.outerHeight();
        stViewIs = false;

        stCont.each(function(k) {
            stcOfsTop[k] = stOfsTop + (($(window).height()/2)*(k+1));
            stcHeight[k] = $(window).height()/2;
            stcViewIs[k] = false;

            stCont.removeAttr("style");
            stCont.eq(k).find(".sc_inner p").each(function(j) {
                stCont.eq(k).find(".sc_inner p").eq(j).css({
                    "transition-delay": (j+1)*0.15+"s"
                })
            })
        })

        fsOfsTop = $("#footer").offset().top;

        $(window).scroll();
    })

    $(window).on("scroll",function() {
        if($(window).scrollTop() > stOfsTop && $(window).scrollTop() <= fsOfsTop - $(window).height() && stViewIs == false) {
            story.removeClass("end");
            story.addClass("fixed");
            stViewIs = true
        } else if($(window).scrollTop() <= stOfsTop && stViewIs == true) {
            stCont.removeClass("on")
            story.removeClass("fixed");
            stViewIs = false
        } else if($(window).scrollTop() > fsOfsTop - $(window).height() && stViewIs == true) {
            story.removeClass("fixed");
            story.addClass("end");
            stViewIs = false
        }

        stCont.each(function(i) {
            if($(window).scrollTop() > stcOfsTop[i] && $(window).scrollTop() <= stcOfsTop[i] + stcHeight[i] && stcViewIs[i] == false) {
                stCont.eq(i).addClass("on")
                stcViewIs[i] = true
            } else if($(window).scrollTop() <= stcOfsTop[i] && stcViewIs[i] == true) {
                stCont.eq(i).removeClass("on")
                stcViewIs[i] = false
            } else if($(window).scrollTop() > stcOfsTop[i] + stcHeight[i] && stcViewIs[i] == true) {
                stcViewIs[i] = false
            }
        })
    })
}

function iscPortfolio() {
    var portfolio = $("section#portfolio");
    var pfOfsTop;
    var pfHeight;
    var pfContInner = portfolio.find(".pf_cont_inner");
    var pfTit = pfContInner.find(">h2");
    var pfYearTit = pfContInner.find(">.pf_year");
    var pfSummary = pfContInner.find(".summary");
    var pfsItem = pfSummary.find(">ul>li");
    var pfiMarginTop;
    var pfsGauge = pfSummary.find(".gauge");
    var pfsGaugeBar = pfsGauge.find(".bar");
    var pfDegail = pfContInner.find("ul.detail");
    var pfdItem = pfDegail.find(">li");
    var pfInit = portfolio.find(".pf_init");
    var pfiBlock = pfInit.find(".block");
    var pfbOfsTop = new Array();
    var pfbHeight = new Array();
    var oldScrTop;
    var newScrTop;

    $(window).on("load resize orientationchange",function() {
        pfOfsTop = portfolio.offset().top;
        pfHeight = portfolio.outerHeight();

        if(deviceMode == "pc") {
            pfsItem.each(function(a) {
                pfbOfsTop[a] = pfiBlock.eq(a).offset().top;
                pfbHeight[a] = pfiBlock.eq(a).height();
            })
            pfiMarginTop = parseInt(pfsItem.last().css("margin-top"))

            pfsGauge.css({
                "height": (pfsItem.last().offset().top - pfsItem.first().offset().top) + "px"
            })

            oldScrTop = $(window).scrollTop();
            newScrTop = $(window).scrollTop();
        } else if(deviceMode == "mo") {
            pfdItem.each(function(n) {
                pfbOfsTop[n] = pfdItem.eq(n).offset().top
                pfbHeight[n] = pfdItem.eq(n).height();
            })

            pfsItem.removeClass("active")
            pfsGaugeBar.removeAttr("style")
            pfSummary.removeAttr("style")
        }

        $(window).scroll();
    })

    $(window).on("scroll",function() {
        pfScrollEnd = function() {
            if(deviceMode == "pc") {
                return pfHeight - $(window).height();
            } else if(deviceMode == "mo") {
                return pfHeight - pfdItem.last().outerHeight();
            }
        } 
        newScrTop = $(window).scrollTop();

        //레이아웃 Fixed
        if($(window).scrollTop() >= pfOfsTop && $(window).scrollTop() <= pfOfsTop + pfScrollEnd() && pfContInner.hasClass("fixed") == false) {
            //console.log(pfOfsTop)
            pfContInner.addClass("fixed")
            if(deviceMode == "pc") {
                pfContInner.css({
                    "top": ""
                })
            }

        } else if($(window).scrollTop() < pfOfsTop && pfContInner.hasClass("fixed") == true) {
            pfContInner.removeClass("fixed")

            pfsItem.removeClass("active")
            pfsItem.eq(0).addClass("active")
            pfdItem.removeClass("active")
            pfdItem.eq(0).addClass("active")

            if(deviceMode == "pc") {
                pfsGaugeBar.css({
                    "height": "0px"
                })
                pfSummary.css({
                    "margin-top": "0px"
                })
            }

        } else if($(window).scrollTop() > pfOfsTop + pfScrollEnd() && pfContInner.hasClass("fixed") == true) {
            pfContInner.removeClass("fixed")
            if(deviceMode == "pc") {
                pfContInner.css({
                    "top": pfScrollEnd() + "px"
                });
            }

            pfsItem.removeClass("active")
            pfsItem.eq(pfdItem.last().index()).addClass("active")
            pfdItem.removeClass("active")
            pfdItem.eq(pfdItem.last().index()).addClass("active")

            if(deviceMode == "pc") {
                pfsGaugeBar.css({
                    "height": "100%"
                })
                pfSummary.css({
                    "margin-top": "-"+(pfSummary.height() - pfsItem.last().height())+"px"
                })
            }
        }

        pfsItem.each(function(i) { 
            //Summary Item On
            if(i > 0) {
                if($(window).scrollTop() >= pfbOfsTop[i] && pfsItem.eq(i).hasClass("on") == false) {
                    pfsItem.eq(i).addClass("on")
                } else if($(window).scrollTop() < pfbOfsTop[i] && pfsItem.eq(i).hasClass("on") == true) {
                    pfsItem.eq(i).removeClass("on")
                }
            }

            //Summary Item Active
            if($(window).scrollTop() >= pfbOfsTop[i] && $(window).scrollTop() <= pfbOfsTop[i] + pfbHeight[i] && pfsItem.eq(i).hasClass("active") == false) {
                pfsItem.removeClass("active")
                pfsItem.eq(i).addClass("active")
                pfYearTit.text(pfsItem.eq(i).attr("data-year"));
                pfdItem.removeClass("active")
                pfdItem.eq(i).addClass("active")

                if(deviceMode == "pc") {
                    pfsGaugeBar.css({
                        "height": (pfsItem.eq(i).height()*(pfsItem.eq(i).index()) + (pfiMarginTop*i))+"px"
                    })

                    pfSummary.css({
                        "margin-top": "-"+(pfsItem.eq(i).height()*(pfsItem.eq(i).index()) + (pfiMarginTop*i))+"px"
                    })
                }
            }
        })
    })
}

function iscContactUs() {
    var contactUs = $("#contact_us");
    var sendmailForm = contactUs.find(".sendmail_form");
    var sfField = {
        username: sendmailForm.find("#sf_username"),
        email: sendmailForm.find("#sf_email"),
        subject: sendmailForm.find("#sf_subject"),
        message: sendmailForm.find("#sf_message"),
    }
    var sendmailResult = contactUs.find(".sendmail_result");
    var srMessage = sendmailResult.find(".sr_message");
    var srMessageOK = sendmailResult.find(".sr_message.ok");
    var srMessageError = sendmailResult.find(".sr_message.error");
    var btnSr = srMessage.find(".btn_set button");

    sendmailForm.on("submit",function(e) {
        e.preventDefault();
        var params = {
            username: sfField.username.val(),
            email: sfField.email.val(),
            subject: sfField.subject.val(),
            message: sfField.message.val(),
        };

        emailjs.send("service_sdvzwe8", "template_38okytt", params)
        .then(function(response) {
            srMessage.hide()
            srMessageOK.show()
            sendmailResult.addClass("on")

            console.log('SUCCESS!', response.status, response.text);
         }, function(error) {
            srMessage.hide()
            srMessageError.show()
            sendmailResult.addClass("on")

            console.log('FAILED...', error);
         });
    })

    btnSr.on("click",function() {
        if($(this).hasClass("ok")) {
            sfField.username.val("")
            sfField.email.val("")
            sfField.subject.val("")
            sfField.message.val("")
            sendmailResult.removeClass("on")
        } else if($(this).hasClass("error")) {
            sendmailResult.removeClass("on")
        }
    })
}