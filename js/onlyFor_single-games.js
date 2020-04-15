// Scripts only for single game page
jQuery(function ($) {

    var
        body = $("body"),
        active = "active",
        browserWidth = body.width(),
        hidden = "hidden",
        popup = $(".bl_popup"),
        popupWrapper = $(".bl_popup__wrapper"),
        homePageURL = window.location.origin;

///// SLIDERS

    var
        fullScreens = $(".game_screens__img"),
        gameScreens = fullScreens.length,
        gameMainScreen = $(".bl_game__screens_photo"),


        gameMainScreenImg = gameMainScreen.find("img"),
        gameMainScreenText = gameMainScreen.find("figcaption");


    if (gameScreens > 4) {
        $(".game_screens").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            infinite: true,
            autoplaySpeed: 2000,
            dots: false
        });
    }



    function changeImageScreen() {
        gameMainScreenText.text(sliderImagesText[screenCounter]);
        gameMainScreenImg.attr("src", sliderImages[screenCounter]);
        screenCounter++;

        if (screenCounter > gameScreens - 1) {
            screenCounter = 0;
        }

        return screenCounter;
    }

    var imageSlider = setInterval(changeImageScreen, 2600);

    fullScreens.on("click", function () {

        clearInterval(imageSlider);

        imageSlider = setInterval(changeImageScreen, 2600);

        var currentImgAlt = $(this).attr("alt"),
            currentImgSrc = $(this).attr("src").split('-3')[0]; /// обрезаем все среднии фото по сепаратору


        reloadMainScreen(currentImgAlt, currentImgSrc);

    });


    function reloadMainScreen(currentImgAlt, currentImgSrc) {

        currentImgSrc = currentImgSrc + ".jpg";

        gameMainScreenText.text(currentImgAlt);
        gameMainScreenImg.attr("src", currentImgSrc);

    }

///////// Preload Images

    if (gameScreens !== 0) {
        var sliderImages = [];
        sliderImages = fullScreens.map(function () {
            return $(this).attr("src").split('-3')[0];
        }).get().join(".jpg,").split(',');
        sliderImages[sliderImages.length - 1] += ".jpg";
        preloadMagic(sliderImages, "preload", "image");

        ///// Slider for Sreens
        var sliderImagesText = fullScreens.map(function () {
            return $(this).attr("alt");
        }).get();

        var screenCounter = 0;

    }


    function preloadMagic(elements, typePreload, asElements) {
        for (var i = 0; i < elements.length; i++) {
            var res = document.createElement("link");
            res.rel = typePreload;
            if (asElements.length !== 0) {
                res.as = asElements;
            }
            res.href = elements[i];
            document.head.appendChild(res);
        }
    }


/////////////////// Preconnect IFRAME
    var btnPlay = $(".btn_playGame"),
        gameID = homePageURL + '/netgame_games/db.php?game=' + btnPlay.data("href"),
        gameSrc = new Array(gameID);


// Preconnect GameIframe
    preloadMagic(gameSrc, "preconnect", "");


///// Work with VIDEO

    var blockVideo = $(".bl_video"),
        blockForFrame = $(".bl_game__bigScreen"),
        wrapperBlock = $(".bl_game__videoWrapper"),
        btnWatchVideo = $(".btn_watchVideo"),
        btnCloseVideo = $(".btn_closeVideo");

    var heightForVideoIframe = blockForFrame.outerHeight(true),
        widthForVideoIframe = Math.ceil(heightForVideoIframe * 16 / 9),
        videoIframeHeight = $(".bl_game__wrapper").outerHeight();


/// Если ширина экрана браузера менше чем полуиная ширина для iframe меняем размеры местами

    if (widthForVideoIframe > browserWidth) {
        widthForVideoIframe = browserWidth;
        heightForVideoIframe = Math.ceil(widthForVideoIframe * 9 / 16);
    }

//// Если величина экрана <991px  задаем смещение для iframe с видео

    function correctedTopForVideoWrapper() {
        var topCorrected = Math.ceil(videoIframeHeight - heightForVideoIframe);
        wrapperBlock.css({"top": topCorrected})
    }

    if (btnWatchVideo.length !== 0) {

        var embedVideo = btnWatchVideo.data("href"),
            srcVideo = '"https://www.youtube.com/embed/' + embedVideo + '?version=3&rel=0&loop=1&autoplay=1&modestbranding=1&showinfo=0&controls=0&showinfo=0"',
            srcVideoArr = srcVideo.slice(1),
            videoIframe = '<iframe class="bl_video__iframe" src=' + srcVideo + ' allowfullscreen="" frameborder="0"></iframe>';
        srcVideoArr = new Array(srcVideoArr.substring(0, srcVideoArr.length - 1));

        // Preconnect Youtube video
        preloadMagic(srcVideoArr, "preconnect", "");


        /// Start Video
        btnWatchVideo.on("click", function () {
            wrapperBlock.removeClass(hidden).css({"height": heightForVideoIframe});
            blockVideo.append(videoIframe).css({"width": widthForVideoIframe});
            $(".bl_video__iframe").css({"height": heightForVideoIframe, "width": widthForVideoIframe});
        });


    }


    if (body.width() < 991) {
        correctedTopForVideoWrapper();


        //// Отслеживание поворотов телефона акселетометрами

        window.addEventListener("orientationchange", function () {
            if (window.matchMedia("(orientation: portrait)").matches) {

                blockVideo.css({"height": widthForVideoIframe, "width": "100vw"});
                wrapperBlock.css({"top": 0, "bottom": 0, "height": widthForVideoIframe, "width": heightForVideoIframe});
                $(".bl_video__iframe").css({"height": widthForVideoIframe, "width": (widthForVideoIframe * 16 / 9)});
                // console.log("portrait ");

            }

            if (window.matchMedia("(orientation: landscape)").matches) {
                $(".bl_video__iframe").css({"height": heightForVideoIframe, "width": widthForVideoIframe});
                correctedTopForVideoWrapper();
                // console.log("landscape ");
            }

        }, false);

    }


    btnCloseVideo.on("click", function () {
        $(".bl_video__iframe").remove();
        wrapperBlock.addClass(hidden);
    });


});

