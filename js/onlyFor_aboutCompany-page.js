$(document).ready(function () {


    var body = $("body"),
        WrapperHeight = $(".top_element__whoWeAre").height(),
        lantern1 = $(".whoWeAre_lantern__1"),
        lantern2 = $(".whoWeAre_lantern__2"),
        lantern3 = $(".whoWeAre_lantern__3");



    var doc = {
        w: $(window).width(),
        h: $(window).height(),
        wC: $(window).width() / 2,
        hC: $(window).height() / 2
    };
    var mouse = {x: 0, y: 0};

    $(window).resize(function () {
        doc = {
            w: $(window).width(),
            h: $(window).height(),
            wC: $(window).width() / 2,
            hC: $(window).height() / 2
        }
    });

    $(window).mousemove(function moveObject(e) {
        mouse.x = ((e.pageX - doc.w + doc.wC) / (doc.wC / 10));
        mouse.y = ((e.pageY - doc.h + doc.hC) / (doc.hC / 10));

        lantern1.css('transform', 'translate(' + (mouse.x * 1.75) + 'px, ' + (mouse.y * 1.75 ) + 'px)');
        lantern2.css('transform', 'translate(' + (mouse.x * 1.55) + 'px, ' + (mouse.y * 1.55) + 'px) scale(1.3)');
        lantern3.css('transform', 'translate(' + (mouse.x * 1.3) + 'px, ' + (mouse.y * 1.3) + 'px) scale(.3)');
    });



    // $(window).scroll(function () {
    //
    //     var wScroll = $(this).scrollTop();
    //
    //     if (body.width() > 1400) {
    //
    //         function paralaxForLanters(correctedVal, elem, scaleLanter) {
    //
    //             var correctedScroll = (correctedVal) * wScroll;
    //
    //             if(scaleLanter === undefined){
    //                 scaleLanter = 1;
    //             }
    //
    //             if (wScroll <= WrapperHeight) {
    //
    //                 elem.css({
    //                     'transform': 'translate(' + correctedScroll + '%) scale(' + scaleLanter + ')'
    //                 });
    //
    //             }
    //         }
    //
    //         paralaxForLanters((-0.2), lantern1);
    //         paralaxForLanters((-0.32), lantern2, 1.3);
    //         paralaxForLanters((-0.3), lantern3, 0.3);
    //
    //     }
    //
    // });





});


