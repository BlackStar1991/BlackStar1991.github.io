jQuery(document).ready(function ($) {


    var active = "active",
        body = $(".body"),
        currentUrlAddress = location.href,


        allFiltersBlock = $(".bl_news__filters");
    if (allFiltersBlock.length) {
        var allFiltersToTop = Math.ceil(allFiltersBlock.offset().top);
    }


    var btnFiltersForMobile = $(".btn_filtersMobile"),


        allFiltersToTopWithMarginTop = allFiltersToTop + 34;


    var btnFilter = $(".btn_filterNews");

    if (body.width() > 768) {


        $(window).scroll(function () {
            if ($(this).scrollTop() > allFiltersToTopWithMarginTop) {
                btnFilter.addClass("fixed");
            } else {
                btnFilter.removeClass("fixed");
            }
        });

    } else {

        btnFiltersForMobile.on("click", function () {
            btnFilter.toggleClass("fixed");
        });
    }




    var singleNewinfo = $(".singleNew_info"),
        btnSharingButtons = $(".btn_workWithSharing");

    btnSharingButtons.on("click", function () {
        singleNewinfo.toggleClass(active)
    });

    console.log("currentUrl Address = " + currentUrlAddress);

    /// Sharing Facebook

    //TODO Узнать appID /// Добавить в head <script type="text/javascript" src="//connect.facebook.net/en_US/sdk.js"></script>

    $(".btn_sharing__fb").on("click", function(){
        FB.ui({
            display: 'popup',
            method: 'share',
            href: currentUrlAdress,
            hashtag:'#NetGame'
        }, function(response){});

    });

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '703209607093847',
            status     : true,
            cookie     : true,
            xfbml      : true
        });

        $(document).trigger('fbload');  //  <---- THIS RIGHT HERE TRIGGERS A CUSTOM EVENT CALLED 'fbload'
    };

    //MEANWHILE IN $(document).ready()
    $(document).on(
        'fbload',  //  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
        function(){
            //some code that requires the FB object
            //such as...
            FB.getLoginStatus(function(res){
                if( res.status == "connected" ){
                    FB.api('/me', function(fbUser) {
                        console.log("Open the pod bay doors, " + fbUser.name + ".");
                    });
                }
            });

        }
    );



    /*
     * действие при нажатии на кнопку загрузки изображения
     * вы также можете привязать это действие к клику по самому изображению
     */

    $('.additional-images-upload-button').on("click", function () {
        var send_attachment_bkp = wp.media.editor.send.attachment;
        var button = $(this),
            // curImg = $('.additional-images-div > img'),
            curImg = button.closest(".additional-images-div").children("img"),
            attachment_id = button.closest(".additional-images-div").children("input");
        wp.media.editor.send.attachment = function (props, attachment) {
            curImg.attr("src", attachment.url);
            attachment_id.val(attachment.id);
        };
        wp.media.editor.open(button);
        return false;
    });

    /*
     * удаляем значение произвольного поля
     * если быть точным, то мы просто удаляем value у input type="hidden"
     */

    $('.additional-images-remove-button').on("click", function () {
        var button = $(this),
            curImg = button.closest(".additional-images-div").children("img"),
            attachment_id = button.closest(".additional-images-div").children("input"),
            no_image_src = curImg.data('src');
        var r = confirm("Уверены?");
        if (r === true) {
            curImg.attr('src', no_image_src);
            attachment_id.val('');
        }
        return false;
    });

});


