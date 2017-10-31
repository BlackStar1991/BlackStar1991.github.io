$(document).ready(function () {


    var blackWrapper = $(".bg_layer"),
        navMenu = $(".left-group-menu");

    navMenu.hover(
        function() {

            blackWrapper.css({"display": "block"})
        }, function() {
           blackWrapper.css({"display": "none"});
        }
    );
/// Search button
    $(".button_search-mobile").on("click", function () {
       $(".block_ssearch").slideToggle(400);

    });

//    ANCOR
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });
    });





});


