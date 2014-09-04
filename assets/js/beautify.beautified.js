function init(e, t, n, r, i) {
    e.find("a[rel=polaroid]").length > 0 ? $("body").addClass("info_about") : $(".info_about").removeClass("info_about");
    if ($(e).find("#filter").is("*") && Filter) {
        var s = {
            column: $(e).find("#current"),
            container: $(e).find("#filter"),
            options: $(e).find("#filter .option")
        }, o = new Filter(s);
        $(e).find(".tags_list a").click(function(e) {
            var s = o.sources[$(this).parents(".post_box").data(o.selector)];
            if (s && s.open) {
                o.close(s, function() {
                    setBodyHeight();
                });
                return !1;
            }
            o.open($(this).parents(".post_box"), function(e) {
                e.close.click(function() {
                    o.close(e, function() {
                        setBodyHeight();
                    });
                });
                e.trigger.click(function() {
                    var s = o.formatKeys(e), u = e.trigger.data("path") + "tags/" + s + "/";
                    s != "" && n.load(u, function(e) {
                        e = $(e).filter(".current_container");
                        t.add(e, "after", function() {
                            $(".covers").is("*") && initAlbums();
                            $(".filter_img").is("*") && initSetMultiply(e, r);
                            setMinFinalHeight();
                            t.run("next", function(s) {
                                init(e, t, n, r, i);
                                setBodyHeight();
                                $(window).scrollTop(0);
                                n.transitionable = !0;
                            });
                        });
                    });
                });
                e.toggle.click(function(t) {
                    o.toggleKey(e, $(this));
                    t.preventDefault();
                });
            }, function() {
                setBodyHeight();
            });
            return !1;
        });
    }
    $(e).find(".load-link").is("*") && $(e).find(".load-link").click(function(e) {
        $("#background_show.hidden").is("*") && $("#background_show").removeClass("hidden");
        $("#content_container.hidden").is("*") && $("#content_container").removeClass("hidden");
        var s = $(this), o = $(this).hasClass("previous") ? "before" : "after", u;
        $(this).hasClass("topLevel") && typeof i != "undefined" && (o = i.location($(this)));
        u = o === "before" ? "previous" : "next";
        n.load($(this).attr("href"), function(e) {
            e = $(e).filter(".current_container");
            t.add(e, o, function() {
                $(".covers").is("*") && initAlbums();
                $(".filter_img").is("*") && initSetMultiply(e, r);
                setMinFinalHeight();
                t.run(u, function(o) {
                    init(e, t, n, r, i);
                    setBodyHeight();
                    $(window).scrollTop(0);
                    n.transitionable = !0;
                    if (s.hasClass("topLevel")) {
                        $(".topLevel.active").removeClass("active");
                        s.addClass("active");
                    }
                });
            });
        });
        e.preventDefault();
    });
    jQuery.isFunction(initClippingScripts) && initClippingScripts();
    $.colorbox.remove();
    var u = ($(window).width() < $(window).height() ? $(window).width() : $(window).height()) - 20;
    $("a[rel=polaroid]").colorbox({
        transition: "none",
        maxWidth: u,
        maxHeight: u,
        onOpen: function() {
            lightbox_open = !0;
        },
        onClosed: function() {
            lightbox_open = !1;
        }
    });
    heightTimeOut && window.clearTimeout(heightTimeOut);
    setBodyHeight();
}

function setMinFinalHeight() {
    var e = $("header").height(), t = $(".current_container").last().height(), n = $(window).height();
    if (t + e < n) {
        $("#filler").remove();
        $("<div>", {
            id: "filler",
            height: n - (t + e) - 2
        }).appendTo(".current_container .scroll-content").last();
        $("#current").css({
            minHeight: n - e
        });
        setBodyHeight();
    }
}

function initSetMultiply(e, t) {
    t.clear();
    $(e).find(".filter_img").is("*") && $.each($(e).find(".filter_img"), function() {
        $(this).hasClass("loaded") ? t.colorize(this) : $(this).load(function() {
            t.colorize(this);
        });
    });
}

function initAlbums() {
    var e = 300, t = 0;
    if ($(".drawer").length == 1) var n = $($(".drawer")[0]); else var n = $($(".drawer")[1]);
    n.find(".album_type").each(function() {
        t += $(this).width();
    });
    var r = n.find("ul.covers");
    if (r.find(".selected").length > 0) {
        r.width(t);
        r.css("left", -Math.floor(r.find(".selected").position().left / n.find(".gallery_wrap").width()) * n.find(".gallery_wrap").width());
        r.position().left - n.find(".gallery_wrap").width() <= -r.width() && n.find(".next").addClass("disabled");
        r.position().left >= 0 && n.find(".prev").addClass("disabled");
    }
    $("p.continued").text("");
    $("p.continued").fadeOut(0);
    updateContinuedText();
    album_drawer_open || $("#covers_nav .drawer").animate({
        height: "toggle"
    }, 0, "swing", function() {
        stretchContainer($("#albumsWrapper"));
    });
    $("#covers_nav .underlined_link, #covers_nav div.drawer .close").click(function(t) {
        $("#covers_nav .drawer").css("display") == "none" ? album_drawer_open = !0 : album_drawer_open = !1;
        $("#covers_nav .drawer").animate({
            height: "toggle"
        }, e, "swing", function() {
            setBodyHeight();
            stretchContainer($("#albumsWrapper"));
        });
        t.preventDefault();
    });
    $(window).resize(function() {
        stretchContainer($("#albumsWrapper"));
    });
    $(".drawer .next").click(function(t) {
        if ($(this).hasClass("disabled") || $("ul.covers").is(":animated")) return !1;
        var n = $("ul.covers").position().left, r = $(this), i = $("ul.covers");
        $("p.continued").text("");
        $("p.continued").fadeOut(0);
        i.animate({
            left: n - $(".gallery_wrap").width()
        }, e, "swing", function() {
            updateContinuedText();
            $(".prev").removeClass("disabled");
            i.position().left - $(".gallery_wrap").width() <= -i.width() && r.addClass("disabled");
        });
        t.preventDefault();
    });
    $(".drawer .prev").click(function(t) {
        if ($(this).hasClass("disabled") || $("ul.covers").is(":animated")) return !1;
        var n = $("ul.covers").position().left, r = $(this), i = $("ul.covers");
        $("p.continued").text("");
        $("p.continued").fadeOut(0);
        i.animate({
            left: n + $(".gallery_wrap").width()
        }, e, "swing", function() {
            updateContinuedText();
            $(".next").removeClass("disabled");
            i.position().left >= 0 && r.addClass("disabled");
        });
        t.preventDefault();
    });
    $(".other-page").die();
    $(".other-page").live("click", function(t) {
        t.stopPropagation();
        t.preventDefault();
        var n = $(this), r = n.hasClass("back") ? $(".front") : $(".back"), i, s = $("#albumsWrapper").position().left;
        n.hasClass("back") ? i = -430 : i = 430;
        n.fadeTo(e, 1);
        r.fadeTo(e, .25);
        $("#albumsWrapper").animate({
            left: s + i
        }, e, "swing", function() {
            $(".other-page").removeClass("other-page");
            r.addClass("other-page");
            r.attr("style", "");
        });
    });
    var i = $(".back").length == 1 ? $(".back") : $($(".back")[1]);
    if (i.find(".track_titles li a").length > 0) {
        var s = $(i.find(".track_titles li a")[0]).parent("li");
        s.addClass("selected");
        $(".track_words").height($(i.find(".track_words li")[0]).height());
    }
    $("div.back:not(.other-page) .track_titles a").die();
    $("div.back:not(.other-page) .track_titles a").live("click", function(t) {
        t.preventDefault();
        $(".track_titles li.selected").removeClass("selected");
        $(this).parent("li").addClass("selected");
        $(".track_words").animate({
            height: $($(this).attr("href")).height()
        }, e, "swing");
        var n = $($(this).attr("href"));
        $(".track_words").animate({
            height: $($(this).attr("href")).height()
        }, e * 2);
        $(".track_words ol").animate({
            top: -n.position().top
        }, e * 2, "swing", function() {
            $(".track_words").height(n.height());
            window.setBodyHeight && setBodyHeight();
        });
    });
}

function updateContinuedText() {
    for (var e = $(".album_type").length - 1; e >= 0; e--) if ($($(".album_type")[e]).position().left + $("ul.covers").position().left < 0 && $($(".album_type")[e]).position().left + $($(".album_type")[e]).width() + $("ul.covers").position().left > 0) {
        $("p.continued").text("Â« " + $($(".album_type")[e]).find("p").text()).fadeIn();
        $("p.continued").css("display", "block");
    }
}

function hideChromeVid() {
    $("#videoControls").fadeOut(500);
    $("#wrapper").fadeOut(500);
    $("body").css({
        overflow: "hidden"
    });
    fullscreen = !0;
    if (VID && VID.is_iDevice() && player.getCurrentTime() > 0) {
        $("#background_show.hidden").is("*") && $("#background_show").removeClass("hidden");
        $("#content_container.hidden").is("*") && $("#content_container").removeClass("hidden");
    }
}

function showChromeVid() {
    $("#videoControls").fadeIn(500);
    $("#wrapper").fadeIn(500);
    $("body").css({
        overflow: "auto"
    });
    fullscreen = !1;
}

var heightTimeOut, setBodyHeight = function(e) {
    this.setHeight = function() {
        return $("body").css("height", $("#wrapper").height()).height();
    };
    e || (e = $("body"));
    this.setHeight();
    var t = this;
    e.imagesLoaded(function(e) {
        e.hasClass("loaded") && e.addClass("loaded");
        t.setHeight();
    });
}, avAction, closeAV = function() {
    $("#closeAll").hasClass("shareHidden") || $("#closeAll").click();
}, load_transitionable = !0, lightbox_open = !1;

jQuery(document).ready(function() {
    function f() {
        if (isiPad) {
            videoIndex--;
            change_iframe_player(videoIndex);
        } else if (videoIndex <= 0) {
            videoIndex = bon_iver_channel_array.length - 1;
            player.playVideoAt(videoIndex);
        } else {
            videoIndex--;
            player.playVideoAt(videoIndex);
        }
    }
    if (!VID.is_iDevice()) $(window).scroll(function(e) {
        $("#scroll-container").css("top", -($(window).scrollTop() || document.body.scrollTop || document.documentElement.scrollTop || 0));
        e.preventDefault();
    }); else {
        $(".notouch").removeClass("notouch");
        var e, t;
        $("body").addClass("idevice");
        $("body").bind("touchstart", function(n) {
            e = parseInt($("#scroll-container").css("top")) || 0;
            t = n.pageY;
        });
        $("body").bind("touchmove", function(n) {
            e += (n.pageY - t) * 2;
            t = n.pageY;
            $("#scroll-container").css("top", e);
            n.preventDefault();
        });
        $("body").bind("touchend", function(e) {
            Math.abs($("#scroll-container").offset().top) > $("#scroll-container").height() - $(window).height() && $("#scroll-container").animate({
                top: -($("#scroll-container").height() + $("header").height() - $(window).height())
            }, 200);
            $("#scroll-container").offset().top > 0 && $("#scroll-container").animate({
                top: 0
            }, 200);
        });
    }
    var n = {
        container: $("#content_container"),
        containWidth: $("#main").width(),
        current: $(".current_container"),
        currentClass: "current_container",
        trans_time: 250,
        backdrop: $(".backdrop"),
        home: "#home"
    }, r = new Shift(n), i = {
        loader: $("#ajaxload")
    }, s = new AjaxLoader(i), o = {
        color: schemes[bon_iver_channel_array[0]] ? schemes[bon_iver_channel_array[0]].color : [ 107, 205, 245 ]
    }, u = {
        activeSelector: "header .upper .active",
        base: $("header nav a").not(".external-link")
    }, a = new KeyNav(u);
    window.multiplyfilter = new Multiply(o);
    $("#background_show, #logo").click(function(e) {
        e.preventDefault();
        if (VID && VID.is_iDevice()) {
            $("#background_show").addClass("hidden");
            $("#content_container").addClass("hidden");
        }
        if (fullscreen) {
            showChromeVid();
            return;
        }
        s.load("/", function(e) {
            e = $(e).filter(".current_container");
            r.add(e, "after", function() {
                r.run("next", function(e) {
                    setBodyHeight();
                    $(window).scrollTop(0);
                    s.transitionable = !0;
                    $(".topLevel.active").is("*") && $(".topLevel.active").removeClass("active");
                });
            });
        });
    });
    if (isiPad) {
        $("#mute_vid").hide(0);
        $("#unmute_vid").hide(0);
        $("#play_vid").hide(0);
        $("#pause_vid").hide(0);
        $("#stop_vid").hide(0);
    }
    $("#play_vid").click(function(e) {
        e.preventDefault();
        player.playVideo();
    });
    $("#pause_vid").click(function(e) {
        e.preventDefault();
        player.pauseVideo();
    });
    $("#stop_vid").click(function(e) {
        e.preventDefault();
        player.stopVideo();
    });
    window.playNextVideo = function() {
        if (isiPad) {
            videoIndex++;
            change_iframe_player(videoIndex);
        } else if (videoIndex >= bon_iver_channel_array.length - 1) {
            videoIndex = 0;
            player.playVideoAt(videoIndex);
        } else {
            videoIndex++;
            player.playVideoAt(videoIndex);
        }
    };
    $("#next_vid").click(function(e) {
        e.preventDefault();
        playNextVideo();
    });
    $("#share_vid").click(function(e) {
        if (e.target == this || e.target == $(".share")[0]) {
            e.preventDefault();
            $(this).find(".shareToolsLeft").animate({
                height: "toggle"
            }, 200);
        }
    });
    $("#prev_vid").click(function(e) {
        e.preventDefault();
        f();
    });
    $("#mute_vid").click(function(e) {
        e.preventDefault();
        if (!player.isMuted()) {
            player.mute();
            $("#mute_vid").hide(0);
            $("#unmute_vid").show(0);
        }
    });
    $("#unmute_vid").click(function(e) {
        e.preventDefault();
        if (player.isMuted()) {
            player.unMute();
            $("#mute_vid").show(0);
            $("#unmute_vid").hide(0);
        }
    });
    $("#mute_vid").hide(0);
    $("#pause_vid").hide(0);
    $("#closeAll").click(function(e) {
        e.preventDefault();
        var t = $(this);
        $("#playerControls").animate({
            width: "toggle"
        }, 150, "linear", function() {
            t.toggleClass("shareHidden");
        });
    });
    $("#playerControls, #closeAll").click(function() {
        avAction && clearTimeout(avAction);
        avAction = setTimeout(function() {
            closeAV();
        }, 8e3);
    });
    avAction = setTimeout(function() {
        avAction && clearTimeout(avAction);
        closeAV();
    }, 8e3);
    $("#fullscreen").click(function() {
        hideChromeVid();
    });
    window.videoBG = $("#background");
    window.videoBG.fullScreen().center();
    if (s.current.path === "/" && VID && VID.is_iDevice()) {
        $("#background_show").addClass("hidden");
        $("#content_container").addClass("hidden");
    }
    init($("body"), r, s, multiplyfilter, a);
    $(".covers").is("*") && initAlbums();
    $(".filter_img").is("*") && initSetMultiply($("body"), multiplyfilter);
    schemes[bon_iver_channel_array[0]] && $("body").addClass(schemes[bon_iver_channel_array[0]].class_name);
    $(document).keydown(function(e) {
        if ((e.keyCode == 37 || e.keyCode == 39) && !lightbox_open) {
            var t, n, i, o, u = $(a.elements.base[a.elements.currentPos]);
            if (e.keyCode == 37) {
                t = a.previous();
                i = "before";
                o = "previous";
            }
            if (e.keyCode == 39) {
                t = a.next();
                i = "after";
                o = "next";
            }
            n = $(t).attr("href");
            s.load(n, function(e) {
                e = $(e).filter(".current_container");
                r.add(e, i, function() {
                    $(".covers").is("*") && initAlbums();
                    $(".filter_img").is("*") && initSetMultiply(e, multiplyfilter);
                    setMinFinalHeight();
                    r.run(o, function(n) {
                        init(e, r, s, multiplyfilter, a);
                        setBodyHeight();
                        $(window).scrollTop(0);
                        $(a.activeSelector).removeClass("active");
                        t.addClass("active");
                        a.elements.currentPos = a.getCurrent();
                        s.transitionable = !0;
                        a.transitionable = !0;
                    });
                });
            });
            return !1;
        }
    });
    setMinFinalHeight();
});

var album_drawer_open = !1, fullscreen = !1;

function init(e, t, n, r, i) {
    e.find("a[rel=polaroid]").length > 0 ? $("body").addClass("info_about") : $(".info_about").removeClass("info_about");
    if ($(e).find("#filter").is("*") && Filter) {
        var s = {
            column: $(e).find("#current"),
            container: $(e).find("#filter"),
            options: $(e).find("#filter .option")
        }, o = new Filter(s);
        $(e).find(".tags_list a").click(function(e) {
            var s = o.sources[$(this).parents(".post_box").data(o.selector)];
            if (s && s.open) {
                o.close(s, function() {
                    setBodyHeight();
                });
                return !1;
            }
            o.open($(this).parents(".post_box"), function(e) {
                e.close.click(function() {
                    o.close(e, function() {
                        setBodyHeight();
                    });
                });
                e.trigger.click(function() {
                    var s = o.formatKeys(e), u = e.trigger.data("path") + "tags/" + s + "/";
                    s != "" && n.load(u, function(e) {
                        e = $(e).filter(".current_container");
                        t.add(e, "after", function() {
                            $(".covers").is("*") && initAlbums();
                            $(".filter_img").is("*") && initSetMultiply(e, r);
                            setMinFinalHeight();
                            t.run("next", function(s) {
                                init(e, t, n, r, i);
                                setBodyHeight();
                                $(window).scrollTop(0);
                                n.transitionable = !0;
                            });
                        });
                    });
                });
                e.toggle.click(function(t) {
                    o.toggleKey(e, $(this));
                    t.preventDefault();
                });
            }, function() {
                setBodyHeight();
            });
            return !1;
        });
    }
    $(e).find(".load-link").is("*") && $(e).find(".load-link").click(function(e) {
        $("#background_show.hidden").is("*") && $("#background_show").removeClass("hidden");
        $("#content_container.hidden").is("*") && $("#content_container").removeClass("hidden");
        var s = $(this), o = $(this).hasClass("previous") ? "before" : "after", u;
        $(this).hasClass("topLevel") && typeof i != "undefined" && (o = i.location($(this)));
        u = o === "before" ? "previous" : "next";
        n.load($(this).attr("href"), function(e) {
            e = $(e).filter(".current_container");
            t.add(e, o, function() {
                $(".covers").is("*") && initAlbums();
                $(".filter_img").is("*") && initSetMultiply(e, r);
                setMinFinalHeight();
                t.run(u, function(o) {
                    init(e, t, n, r, i);
                    setBodyHeight();
                    $(window).scrollTop(0);
                    n.transitionable = !0;
                    if (s.hasClass("topLevel")) {
                        $(".topLevel.active").removeClass("active");
                        s.addClass("active");
                    }
                });
            });
        });
        e.preventDefault();
    });
    jQuery.isFunction(initClippingScripts) && initClippingScripts();
    $.colorbox.remove();
    var u = ($(window).width() < $(window).height() ? $(window).width() : $(window).height()) - 20;
    $("a[rel=polaroid]").colorbox({
        transition: "none",
        maxWidth: u,
        maxHeight: u,
        onOpen: function() {
            lightbox_open = !0;
        },
        onClosed: function() {
            lightbox_open = !1;
        }
    });
    heightTimeOut && window.clearTimeout(heightTimeOut);
    setBodyHeight();
}

function setMinFinalHeight() {
    var e = $("header").height(), t = $(".current_container").last().height(), n = $(window).height();
    if (t + e < n) {
        $("#filler").remove();
        $("<div>", {
            id: "filler",
            height: n - (t + e) - 2
        }).appendTo(".current_container .scroll-content").last();
        $("#current").css({
            minHeight: n - e
        });
        setBodyHeight();
    }
}

function initSetMultiply(e, t) {
    t.clear();
    $(e).find(".filter_img").is("*") && $.each($(e).find(".filter_img"), function() {
        $(this).hasClass("loaded") ? t.colorize(this) : $(this).load(function() {
            t.colorize(this);
        });
    });
}

function initAlbums() {
    var e = 300, t = 0;
    if ($(".drawer").length == 1) var n = $($(".drawer")[0]); else var n = $($(".drawer")[1]);
    n.find(".album_type").each(function() {
        t += $(this).width();
    });
    var r = n.find("ul.covers");
    if (r.find(".selected").length > 0) {
        r.width(t);
        r.css("left", -Math.floor(r.find(".selected").position().left / n.find(".gallery_wrap").width()) * n.find(".gallery_wrap").width());
        r.position().left - n.find(".gallery_wrap").width() <= -r.width() && n.find(".next").addClass("disabled");
        r.position().left >= 0 && n.find(".prev").addClass("disabled");
    }
    $("p.continued").text("");
    $("p.continued").fadeOut(0);
    updateContinuedText();
    album_drawer_open || $("#covers_nav .drawer").animate({
        height: "toggle"
    }, 0, "swing", function() {
        stretchContainer($("#albumsWrapper"));
    });
    $("#covers_nav .underlined_link, #covers_nav div.drawer .close").click(function(t) {
        $("#covers_nav .drawer").css("display") == "none" ? album_drawer_open = !0 : album_drawer_open = !1;
        $("#covers_nav .drawer").animate({
            height: "toggle"
        }, e, "swing", function() {
            setBodyHeight();
            stretchContainer($("#albumsWrapper"));
        });
        t.preventDefault();
    });
    $(window).resize(function() {
        stretchContainer($("#albumsWrapper"));
    });
    $(".drawer .next").click(function(t) {
        if ($(this).hasClass("disabled") || $("ul.covers").is(":animated")) return !1;
        var n = $("ul.covers").position().left, r = $(this), i = $("ul.covers");
        $("p.continued").text("");
        $("p.continued").fadeOut(0);
        i.animate({
            left: n - $(".gallery_wrap").width()
        }, e, "swing", function() {
            updateContinuedText();
            $(".prev").removeClass("disabled");
            i.position().left - $(".gallery_wrap").width() <= -i.width() && r.addClass("disabled");
        });
        t.preventDefault();
    });
    $(".drawer .prev").click(function(t) {
        if ($(this).hasClass("disabled") || $("ul.covers").is(":animated")) return !1;
        var n = $("ul.covers").position().left, r = $(this), i = $("ul.covers");
        $("p.continued").text("");
        $("p.continued").fadeOut(0);
        i.animate({
            left: n + $(".gallery_wrap").width()
        }, e, "swing", function() {
            updateContinuedText();
            $(".next").removeClass("disabled");
            i.position().left >= 0 && r.addClass("disabled");
        });
        t.preventDefault();
    });
    $(".other-page").die();
    $(".other-page").live("click", function(t) {
        t.stopPropagation();
        t.preventDefault();
        var n = $(this), r = n.hasClass("back") ? $(".front") : $(".back"), i, s = $("#albumsWrapper").position().left;
        n.hasClass("back") ? i = -430 : i = 430;
        n.fadeTo(e, 1);
        r.fadeTo(e, .25);
        $("#albumsWrapper").animate({
            left: s + i
        }, e, "swing", function() {
            $(".other-page").removeClass("other-page");
            r.addClass("other-page");
            r.attr("style", "");
        });
    });
    var i = $(".back").length == 1 ? $(".back") : $($(".back")[1]);
    if (i.find(".track_titles li a").length > 0) {
        var s = $(i.find(".track_titles li a")[0]).parent("li");
        s.addClass("selected");
        $(".track_words").height($(i.find(".track_words li")[0]).height());
    }
    $("div.back:not(.other-page) .track_titles a").die();
    $("div.back:not(.other-page) .track_titles a").live("click", function(t) {
        t.preventDefault();
        $(".track_titles li.selected").removeClass("selected");
        $(this).parent("li").addClass("selected");
        $(".track_words").animate({
            height: $($(this).attr("href")).height()
        }, e, "swing");
        var n = $($(this).attr("href"));
        $(".track_words").animate({
            height: $($(this).attr("href")).height()
        }, e * 2);
        $(".track_words ol").animate({
            top: -n.position().top
        }, e * 2, "swing", function() {
            $(".track_words").height(n.height());
            window.setBodyHeight && setBodyHeight();
        });
    });
}

function updateContinuedText() {
    for (var e = $(".album_type").length - 1; e >= 0; e--) if ($($(".album_type")[e]).position().left + $("ul.covers").position().left < 0 && $($(".album_type")[e]).position().left + $($(".album_type")[e]).width() + $("ul.covers").position().left > 0) {
        $("p.continued").text("Â« " + $($(".album_type")[e]).find("p").text()).fadeIn();
        $("p.continued").css("display", "block");
    }
}

function hideChromeVid() {
    $("#videoControls").fadeOut(500);
    $("#wrapper").fadeOut(500);
    $("body").css({
        overflow: "hidden"
    });
    fullscreen = !0;
    if (VID && VID.is_iDevice() && player.getCurrentTime() > 0) {
        $("#background_show.hidden").is("*") && $("#background_show").removeClass("hidden");
        $("#content_container.hidden").is("*") && $("#content_container").removeClass("hidden");
    }
}

function showChromeVid() {
    $("#videoControls").fadeIn(500);
    $("#wrapper").fadeIn(500);
    $("body").css({
        overflow: "auto"
    });
    fullscreen = !1;
}

var heightTimeOut, setBodyHeight = function(e) {
    this.setHeight = function() {
        return $("body").css("height", $("#wrapper").height()).height();
    };
    e || (e = $("body"));
    this.setHeight();
    var t = this;
    e.imagesLoaded(function(e) {
        e.hasClass("loaded") && e.addClass("loaded");
        t.setHeight();
    });
}, avAction, closeAV = function() {
    $("#closeAll").hasClass("shareHidden") || $("#closeAll").click();
}, load_transitionable = !0, lightbox_open = !1;

jQuery(document).ready(function() {
    function f() {
        if (isiPad) {
            videoIndex--;
            change_iframe_player(videoIndex);
        } else if (videoIndex <= 0) {
            videoIndex = bon_iver_channel_array.length - 1;
            player.playVideoAt(videoIndex);
        } else {
            videoIndex--;
            player.playVideoAt(videoIndex);
        }
    }
    if (!VID.is_iDevice()) $(window).scroll(function(e) {
        $("#scroll-container").css("top", -($(window).scrollTop() || document.body.scrollTop || document.documentElement.scrollTop || 0));
        e.preventDefault();
    }); else {
        $(".notouch").removeClass("notouch");
        var e, t;
        $("body").addClass("idevice");
        $("body").bind("touchstart", function(n) {
            e = parseInt($("#scroll-container").css("top")) || 0;
            t = n.pageY;
        });
        $("body").bind("touchmove", function(n) {
            e += (n.pageY - t) * 2;
            t = n.pageY;
            $("#scroll-container").css("top", e);
            n.preventDefault();
        });
        $("body").bind("touchend", function(e) {
            Math.abs($("#scroll-container").offset().top) > $("#scroll-container").height() - $(window).height() && $("#scroll-container").animate({
                top: -($("#scroll-container").height() + $("header").height() - $(window).height())
            }, 200);
            $("#scroll-container").offset().top > 0 && $("#scroll-container").animate({
                top: 0
            }, 200);
        });
    }
    var n = {
        container: $("#content_container"),
        containWidth: $("#main").width(),
        current: $(".current_container"),
        currentClass: "current_container",
        trans_time: 250,
        backdrop: $(".backdrop"),
        home: "#home"
    }, r = new Shift(n), i = {
        loader: $("#ajaxload")
    }, s = new AjaxLoader(i), o = {
        color: schemes[bon_iver_channel_array[0]] ? schemes[bon_iver_channel_array[0]].color : [ 107, 205, 245 ]
    }, u = {
        activeSelector: "header .upper .active",
        base: $("header nav a").not(".external-link")
    }, a = new KeyNav(u);
    window.multiplyfilter = new Multiply(o);
    $("#background_show, #logo").click(function(e) {
        e.preventDefault();
        if (VID && VID.is_iDevice()) {
            $("#background_show").addClass("hidden");
            $("#content_container").addClass("hidden");
        }
        if (fullscreen) {
            showChromeVid();
            return;
        }
        s.load("/", function(e) {
            e = $(e).filter(".current_container");
            r.add(e, "after", function() {
                r.run("next", function(e) {
                    setBodyHeight();
                    $(window).scrollTop(0);
                    s.transitionable = !0;
                    $(".topLevel.active").is("*") && $(".topLevel.active").removeClass("active");
                });
            });
        });
    });
    if (isiPad) {
        $("#mute_vid").hide(0);
        $("#unmute_vid").hide(0);
        $("#play_vid").hide(0);
        $("#pause_vid").hide(0);
        $("#stop_vid").hide(0);
    }
    $("#play_vid").click(function(e) {
        e.preventDefault();
        player.playVideo();
    });
    $("#pause_vid").click(function(e) {
        e.preventDefault();
        player.pauseVideo();
    });
    $("#stop_vid").click(function(e) {
        e.preventDefault();
        player.stopVideo();
    });
    window.playNextVideo = function() {
        if (isiPad) {
            videoIndex++;
            change_iframe_player(videoIndex);
        } else if (videoIndex >= bon_iver_channel_array.length - 1) {
            videoIndex = 0;
            player.playVideoAt(videoIndex);
        } else {
            videoIndex++;
            player.playVideoAt(videoIndex);
        }
    };
    $("#next_vid").click(function(e) {
        e.preventDefault();
        playNextVideo();
    });
    $("#share_vid").click(function(e) {
        if (e.target == this || e.target == $(".share")[0]) {
            e.preventDefault();
            $(this).find(".shareToolsLeft").animate({
                height: "toggle"
            }, 200);
        }
    });
    $("#prev_vid").click(function(e) {
        e.preventDefault();
        f();
    });
    $("#mute_vid").click(function(e) {
        e.preventDefault();
        if (!player.isMuted()) {
            player.mute();
            $("#mute_vid").hide(0);
            $("#unmute_vid").show(0);
        }
    });
    $("#unmute_vid").click(function(e) {
        e.preventDefault();
        if (player.isMuted()) {
            player.unMute();
            $("#mute_vid").show(0);
            $("#unmute_vid").hide(0);
        }
    });
    $("#mute_vid").hide(0);
    $("#pause_vid").hide(0);
    $("#closeAll").click(function(e) {
        e.preventDefault();
        var t = $(this);
        $("#playerControls").animate({
            width: "toggle"
        }, 150, "linear", function() {
            t.toggleClass("shareHidden");
        });
    });
    $("#playerControls, #closeAll").click(function() {
        avAction && clearTimeout(avAction);
        avAction = setTimeout(function() {
            closeAV();
        }, 8e3);
    });
    avAction = setTimeout(function() {
        avAction && clearTimeout(avAction);
        closeAV();
    }, 8e3);
    $("#fullscreen").click(function() {
        hideChromeVid();
    });
    window.videoBG = $("#background");
    window.videoBG.fullScreen().center();
    if (s.current.path === "/" && VID && VID.is_iDevice()) {
        $("#background_show").addClass("hidden");
        $("#content_container").addClass("hidden");
    }
    init($("body"), r, s, multiplyfilter, a);
    $(".covers").is("*") && initAlbums();
    $(".filter_img").is("*") && initSetMultiply($("body"), multiplyfilter);
    schemes[bon_iver_channel_array[0]] && $("body").addClass(schemes[bon_iver_channel_array[0]].class_name);
    $(document).keydown(function(e) {
        if ((e.keyCode == 37 || e.keyCode == 39) && !lightbox_open) {
            var t, n, i, o, u = $(a.elements.base[a.elements.currentPos]);
            if (e.keyCode == 37) {
                t = a.previous();
                i = "before";
                o = "previous";
            }
            if (e.keyCode == 39) {
                t = a.next();
                i = "after";
                o = "next";
            }
            n = $(t).attr("href");
            s.load(n, function(e) {
                e = $(e).filter(".current_container");
                r.add(e, i, function() {
                    $(".covers").is("*") && initAlbums();
                    $(".filter_img").is("*") && initSetMultiply(e, multiplyfilter);
                    setMinFinalHeight();
                    r.run(o, function(n) {
                        init(e, r, s, multiplyfilter, a);
                        setBodyHeight();
                        $(window).scrollTop(0);
                        $(a.activeSelector).removeClass("active");
                        t.addClass("active");
                        a.elements.currentPos = a.getCurrent();
                        s.transitionable = !0;
                        a.transitionable = !0;
                    });
                });
            });
            return !1;
        }
    });
    setMinFinalHeight();
});

var album_drawer_open = !1, fullscreen = !1;