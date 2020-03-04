$(document).ready(function () {


    var
        locationPage = location.href,
        body = $("body"),
        active = "active";


    ///// add Video Block

    var videoFlag = true;
    var bl_advantagesVideo = $('.bl_advantages__slot');

    var video = '<video class="bl_advantages__video" poster="' + locationPage + 'wp-content/themes/netgeme_2018/image/advantages/game.jpg" loop muted autoplay><source src="' + locationPage + 'wp-content/themes/netgeme_2018/image/Cloverstones_promo_min.webm" type="video/webm"><source src="' + locationPage + 'wp-content/themes/netgeme_2018/image/Cloverstones_promo_min.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'></video>';
    var windowHeight = $(window).height(),
        windowHeightOffset = windowHeight * 2;
    var coefficientVideoBlock = Math.ceil(bl_advantagesVideo.offset().top - windowHeightOffset);


    //// Block Benefits

    var blockBenefits = $("#section-benefits"),
        benefitsFlag = true;
    var coefficientBenefitsBlock = Math.ceil(blockBenefits.offset().top - (windowHeight / 4));

    blockBenefits.on("click", function () {
       $(this).removeClass(active)
    });

    /////////// paralax  PARALAX

    var topSection = $(".bl_inovation"),
        WrapperHeight = topSection.height(),
        coinL1 = $(".decor_coins__left-1"),
        coinL2 = $(".decor_coins__left-2"),
        coinR1 = $(".decor_coins__right-1");

    var gameSection = $(".bl_games"),
        gameSectionHeight = gameSection.height() + WrapperHeight,
        correctedHeight = gameSectionHeight * 1.7,

        coinL3 = $(".decor_coins__left-3"),
        coinL4 = $(".decor_coins__left-4"),
        coinL5 = $(".decor_coins__left-5"),
        coinR2 = $(".decor_coins__right-2"),
        coinR3 = $(".decor_coins__right-3"),
        coinR4 = $(".decor_coins__right-4");


    $(window).scroll(function () {

        var wScroll = $(this).scrollTop();


        if (body.width() > 1400) {


            function paralaxForCoins(workSection, correctedVal, elem) {


                var correctedScroll = (correctedVal) * wScroll;

                if (wScroll <= workSection) {

                    elem.css({
                        'transform': 'translateY(' + correctedScroll + '%)'
                    });

                }
            }

            paralaxForCoins(WrapperHeight, (-0.5), coinL1);
            paralaxForCoins(WrapperHeight, (-0.3), coinL2);
            paralaxForCoins(WrapperHeight, (-0.4), coinR1);


            paralaxForCoins(WrapperHeight, (-0.4), coinL3);
            paralaxForCoins(gameSectionHeight, (-1.4), coinL4);
            paralaxForCoins(gameSectionHeight, (-0.8), coinL5);


            paralaxForCoins(gameSectionHeight, (-0.4), coinR2);
            paralaxForCoins(gameSectionHeight, (-0.5), coinR3);
            paralaxForCoins(correctedHeight, (-0.2), coinR4);

        }

        if ($(window).width() > 814) {

            if ((wScroll >= coefficientVideoBlock)) {
                if (videoFlag) {
                    addVideoAdvantages();
                }
            }

            if ((wScroll >= coefficientBenefitsBlock)) {
                if (benefitsFlag) {
                    blockBenefits.removeClass(active);
                    benefitsFlag=false;
                }
            }

        }

    });

    // VideoBlock postload if width < 814px

    function addVideoAdvantages() {
        bl_advantagesVideo.append(video);
        videoFlag = false;
    }


    //// Buttons like Links

    var buttonsHref = $(".bl_partners__item");

    likeLink(buttonsHref);

    function likeLink(btn) {
        btn.on("click", function () {
            var urlLink = $(this).attr("data-href");
            if (urlLink === "") {
                alert("URL address isn't correct");
            } else {
                window.open(urlLink);
            }
        });
    }


    //// Slider for lastGames

    var lastGamesBlock = $(".bl_lastGames"),
        correctedInfoEllements = 3,
        lastGamesItem = $(".bl_lastGames__item").length;

    if (body.width() < 1200) {
        correctedInfoEllements = 2
    }

    if (lastGamesItem > correctedInfoEllements) {
        lastGamesBlock.slick({
            dots: false,
            infinite: true,

            autoplay: true,
            autoplaySpeed: 3500,
            draggable: true,

            speed: 1500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {

                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {

                        centerMode: true,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
//// Slider FOR PARTENERS

    $(".bl_partners__slider").slick({
        dots: true,
        infinite: true,

        autoplay: false,
        autoplaySpeed: 3500,
        draggable: true,

        speed: 1500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1400,
                settings: {

                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 991,
                settings: {

                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },

            {
                breakpoint: 600,
                settings: {

                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },


            {
                breakpoint: 450,
                settings: {
                    dots: false,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });


// AJAX Requests

    var ajaxscript = {ajax_url: '/wp-admin/admin-ajax.php'},
        numberOfPictures = $("#quantity-on-page"),
        req = true;

    $('.js-more_games').click(function () {
        if (req) {
            req = false;
            $.ajax({
                url: ajaxscript.ajax_url,
                dataType: 'json',
                data: {
                    action: 'get_more_header_games',
                    current_page: $('#current-page').val(),
                    quantity_on_page: $('#quantity-on-page').val()
                },
                method: 'post',
                beforeSend: function () {
                    $('.js-more_games').addClass(active);
                },
                success: function (response) {
                    $('.js-more_games').removeClass(active);
                    $(response.html).appendTo('.bl_games__wrapper');
                    if (!response.next_page) {
                        $('.js-more_games').remove();
                    } else {
                        $('#current-page').val(response.next_page);
                    }
                },
                error: function (r) {
                    console.log(r);
                },
                complete: function () {
                    req = true;
                }
            });
        }
    });

    // В нетбучном и предмобильном состоянии дозаполняем ряд с играми до края на главной странице

    if ((body.width() < 1600) && (body.width() > 991)) {
        // For this size we need add two elements
        $.ajax({
            url: ajaxscript.ajax_url,
            dataType: 'json',
            data: {
                action: 'get_games_for_homePageList',
            },
            method: 'post',
            beforeSend: function () {
            },
            success: function (response) {
                $(".bl_games__wrapper").append(response.games);
            },
            error: function (r) {
                console.log(r);
            },
            complete: function () {
            }
        });

        numberOfPictures.val(12); /// Change number val for button MoreGames
    }

    // Show full content
    $(".btn_showMoreInfo").on("click", function () {
        var context = $(".context_mainPage__wrapper");
        var h = context[0].scrollHeight;
        context.css({"height": h});
        $(this).remove();
    })


});