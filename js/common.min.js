$(document).ready(function () {

    // LENG
    $('.leng-item').click(function () {
        $(this).closest('.leng-list__item').addClass('active').siblings().removeClass('active');
    });

    var leng = $('.leng-list__item.active .leng-item__text').text();

    $('.leng__active').text(leng);


    // // MAIN-BANNER
    $(".owl-carousel-1").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: true,
        dots: false,
        autoplay: false,
        stopOnHover: true,
        smartSpeed: 1000, //Время движения слайда
        autoplayTimeout: 4000, //Время смены слайда
        pagination: false,
        responsiveClass: true,
        responsive: {
            600: {
                items: 1
            }
        }
    });


    $(".owl-carousel-2").owlCarousel({

        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        // margin: 5,
        navText: true,
        stopOnHover: true,
        smartSpeed: 1000, //Время движения слайда
        autoplayTimeout: 4000, //Время смены слайда
        pagination: false,
        responsiveClass: true,
        responsive: {
            1200: {
                items: 8
            },
            992: {
                items: 6
            },
            320: {
                items: 4
            }


        }
    });









 /// ProductcCart Slider
    $(".owl-carousel-3").owlCarousel({
        items: 4,
        loop: true,
        nav: true,
        dots: false,
        margin: 10,
        autoplay: false,
        navText: true,
        stopOnHover: true,
        smartSpeed: 1000,
        autoplayTimeout: 4000,
        pagination: false,
        responsiveClass: true,
        responsive: {

          992: {
                loop: true
            }
        }
    });

// Products_related Slider (Pohogie)


    $(".owl-carousel-4").owlCarousel({
        items: 5,
        loop: true,
        nav: true,
        dots: false,
        margin: 18,
        autoplay: false,
        navText: true,
        stopOnHover: true,
        smartSpeed: 1000,
        autoplayTimeout: 4000,
        pagination: false,
        responsiveClass: true,
        responsive: {

            0:{
                items:1
            },
            450:{
                items:2
            },

            670:{
                items:3
            },
            1200:{
                items:5
            }


        }
    });

// Products_looked Slider (Prosmatrival)


    $(".owl-carousel-5").owlCarousel({
        items: 5,
        loop: true,
        nav: true,
        dots: false,
        margin: 18,
        autoplay: false,
        navText: true,
        stopOnHover: true,
        smartSpeed: 1000,
        autoplayTimeout: 4000,
        pagination: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            450:{
                items:2
            },

            670:{
                items:3
            },
            1200:{
                items:5
            }
        }
    });

// Tooltip

    $('.bl_products__callBack').tooltip({ placement: "bottom"});



// Ancor
    jQuery(".link-top").click(function () {
        var elementClick = jQuery(this).attr("href");
        var destination = jQuery(elementClick).offset().top;
        jQuery("html, body").animate({
            scrollTop: destination
        }, 300);


        return false;
    });

//MENU
    var headerPage = $('.header-page');

    headerPage.on('click', '.open-menu-min', function () {
        headerPage.toggleClass('open-sub-menu');
        headerPage.removeClass('open-main-menu');
    });

    headerPage.on('click', '.open-menu-main', function () {
        headerPage.removeClass('open-sub-menu');
        headerPage.toggleClass('open-main-menu');
    });

//search
    headerPage.on('click', '.mobile-ico__search', function () {
        headerPage.removeClass('open-sub-menu');
        headerPage.toggleClass('open-search');
        headerPage.removeClass('open-main-menu');
    });

    headerPage.on('click', '.close-search', function () {
        headerPage.toggleClass('open-search');
    });

//footer
    $('.footer-page').on('click', '.h3-title', function () {
        $(this).closest('.foot-info-list__title').toggleClass('active');
    });


// SLIDER show

    function sliderShow() {
        var sliderName = $(".code_sliderName");


        sliderName.on("click", function () {

            $(this).next().toggleClass("hidden");
            $(this).toggleClass("decor_triangle decor_triangle__active");

        })

    }

    sliderShow();

    function activateFilterByName() {

        var caterogyName = $(".bl_filters__caterogyName");
        var filter_text = $(".filter_text");


        caterogyName.on("click", function () {

            caterogyName.removeClass("bl_filters__caterogyName_active");
            $(this).toggleClass("bl_filters__caterogyName_active bl_filters__caterogyName");
        });

        filter_text.on("click", function () {

            $(this).toggleClass("filter_text__active");
        });


    }

    activateFilterByName();


//   sliderEffect

    function sliderEffectForButtons(button, element, duration) {

        button.click(function () {
            element.slideToggle(duration);
        });
    }

    var buttonCategory = $(".rubric__title_button__categories"),
        buttonFilters = $(".rubric__title_button__filters");

    var blockWithCategories = $(".bl_filters"),
        blockWithFilters = $(".bl_filters__productsFilters");

    sliderEffectForButtons(buttonCategory, blockWithCategories, 1000);
    sliderEffectForButtons(buttonFilters, blockWithFilters, 1000);


//   Toggle switch between view_columns__STYLE & view_list__STYLE

    function swichColumnAndListStyles() {
        columnsButton = $("#view_columns");
        listButton = $("#view_list");
        blockProducts = $(".bl_products");

        wrapperImg = $(".bl_products");

        columnsButton.on("click", function () {

            console.log("column");

            blockProducts.removeClass("view_list__STYLE");
            blockProducts.addClass("view_columns__STYLE");

            $(".bl_products__item").addClass("col-lg-3 col-md-4 col-sm-6");
            $(".code_forListStyle_view").removeClass("col-xs-6");
            $(".code_forListStyle_view2__wrapper").removeClass("bl_products__center__wrapper");


            $(".bl_loader").toggleClass("bl_loader__list");
            $(".bl_loader__img").toggleClass("bl_loader__img_list");
            $(".bl_loader__text").toggleClass("bl_loader__text_list");

        });

        listButton.on("click", function () {

            console.log("list");

            blockProducts.removeClass("view_columns__STYLE");
            blockProducts.addClass("view_list__STYLE");

            $(".bl_products__item").removeClass("col-lg-3 col-md-4 col-sm-6");
            $(".code_forListStyle_view").addClass("col-xs-6");
            $(".code_forListStyle_view2__wrapper").addClass("bl_products__center__wrapper");


            $(".bl_loader").toggleClass("bl_loader__list");
            $(".bl_loader__img").toggleClass("bl_loader__img_list");
            $(".bl_loader__text").toggleClass("bl_loader__text_list");

        });


    }

    swichColumnAndListStyles();


// Pagination activation
    function paginationButtons() {
        var paginationNumber = $(".bl_pagination__link_number"),
            paginationNumberActive = "bl_pagination__link_number__active";

        paginationNumber.on("click", function () {

            paginationNumber.removeClass(paginationNumberActive);
            $(this).addClass(paginationNumberActive);
        })

    }

    paginationButtons();


  // CALLBACK FORM
    function showCallbackForm() {
        var fullBlackBlock = $(".blackWrapper"),

            callBackButtonForUser = $(".open-call__text"),
            callBackButton = $(".bl_products__callBack"),

            trashClass = $(".trashClass"),

            callBackForm = $(".bl_callBack"),
            callBackFormForUser = $(".bl_callBack__forUser"),

            allCallBackForms = $(".bl_callBack, .bl_callBack__forUser"),

            closeButton = $(".bl_callBack__close"),
            resetButton = $(".bl_callBack__reset");


        function hideShowForm(pushedButton, whatFormShowhed, closeButton) {
            pushedButton.on("click", function () {


                fullBlackBlock.toggleClass("hidden");
                whatFormShowhed.toggleClass("hidden");

                closeButton.addClass("hidden");
            });
        }

        hideShowForm(callBackButton, callBackForm, trashClass);    /// Show form
        hideShowForm(callBackButtonForUser, callBackFormForUser, trashClass); /// Show form


        hideShowForm(closeButton, trashClass, allCallBackForms); /// Hide form
        hideShowForm(resetButton, trashClass, allCallBackForms);  /// Hide form


    }

    showCallbackForm();


//    POPUP BUY PRODUCT

    function popupBuyProduct() {

        $(".TEST_BUTTON").on("click", function () {
            $(".blackWrapper").removeClass("hidden");
            $(".popup_likeShopbag").removeClass("hidden");

        });

        var hiddenButtons = $(".popup_likeShopbag__close, .popup_likeShopbag__continueBuying");

        hiddenButtons.on("click", function () {
            $(".blackWrapper").addClass("hidden");
            $(".popup_likeShopbag").addClass("hidden");
        });


        $(".popup_likeShopbag__goToShopbag").on("click", function () {  /// Я не знаю будет ли вообще срабатывать эта функция если там ссылка. Есди нет, но убери
            $(".blackWrapper").addClass("hidden");
            $(".popup_likeShopbag").addClass("hidden");
        })



    }popupBuyProduct();











// FILTER for telephone number

    $("input[type='tel']").on("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });




    //	--------------CARD-PAGE--------------------




    //img
    $('.product-galery__pic').attr('src', $('.prod-slider__item:first-child  img').attr('src'));

    $('body').on('click', '.prod-slider__wp-img', function() {
        var src = $(this).find('img').attr('src');

        $('.product-galery__pic').attr('src', src);

    });


    //counter card
    // var counterCard = 1;
    // $('.counter__item--plus').click(function() {
    //     counterCard = counterCard + 1;
    //     $('.counter__item-text').val(counterCard);
    // });
    //
    // $('.counter__item--minus').click(function() {
    //     counterCard =   $('.counter__item-text').val();
    //     counterCard = counterCard - 1;
    //     $('.counter__item-text').val(counterCard);
    //
    //     if( counterCard < 1 ){
    //         counterCard = 0;
    //         $('.counter__item-text').val(counterCard);
    //     }
    // });
    //
    // $('body').on('change', '.counter__item-text', function(){
    //     counterCard =  + $('.counter__item-text').val();
    //
    //
    // });


    //TAB
    $(this).find('.tab-title').each(function(i) {
        $(this).click(function() {
            $(this).addClass('active').siblings().removeClass('active')
                .closest('.tab-wrap').find('.tab-desc').removeClass('active').eq(i).addClass('active');
        });
    });

    $(this).find('.main-desc-title__item').each(function(i) {
        $(this).click(function() {
            $(this).addClass('active').siblings().removeClass('active')
                .closest('.tab-wrap').find('.main-desc__item').removeClass('active').eq(i).addClass('active');
        });
    });


    
    

    // Button what add slide effect for product characteristics


    function showButtonIfWeHaveEnoughInformation() { // We show this button only if we have a lot of information about product
        var    fieldDescription =$(".main-desc__item .active").find(".main-descript-tab"),
               heightField = fieldDescription.outerHeight(true),
               maxContent = $(".main-descript-tab__fullTab"),
               heightContent  = maxContent.outerHeight(true);


        console.log("block Height = " + fieldDescription.outerHeight(true));
        console.log("content Height = " + maxContent.outerHeight(true));


    }showButtonIfWeHaveEnoughInformation();
    
    
    
    function showMoreCharacteristics() {      // Slide effect
        var buttonMoreInformation = $(".main-desc__showMoreInfo"),
            fieldDescriptionActive = "main-descript-tab_active",
            textShowInfo = ".main-desc__showMoreInfo_show",
            textHideInfo = ".main-desc__showMoreInfo_hide";


        buttonMoreInformation.on("click", function(){

               $(this).siblings(".main-descript-tab").toggleClass(fieldDescriptionActive);
               $(this).children(textHideInfo).toggleClass("hidden");
               $(this).children(textShowInfo).toggleClass("hidden");


            })



    }showMoreCharacteristics();



    //   FORM Review

    var buttonAddComment =   $(".code_addReview"),
        formReview = $(".code_formRewiew");

    buttonAddComment.on("click", function () {

        $(this).hide();
        formReview.slideDown(600);

   });














// RESIZE WINDOW

    var body = $("body");
    var blockWithCategories = $(".bl_filters"),
        blockWithFilters = $(".bl_filters__productsFilters");



$(window).resize(function(){
   if( body.width() >= 992 ){

       blockWithCategories.css("display", "block"); // allways show blocks with categories and filters if window.width > 992px
       blockWithFilters.css("display", "block");
   }else {
       blockWithCategories.css("display", "none"); // allways show blocks with categories and filters if window.width > 992px
       blockWithFilters.css("display", "none");
   }


    if( body.width() >= 700 ){

        $(".view_list__STYLE .code_forListStyle_view").addClass("col-xs-6")
    }else {
        $(".view_list__STYLE .code_forListStyle_view").removeClass("col-xs-6")
    }


});
$(window).resize();


});

