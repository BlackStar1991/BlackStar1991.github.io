$(document).ready(function () {


    var body = $("body"),
        lantern1 = $(".whoWeAre_lantern__1"),
        lantern2 = $(".whoWeAre_lantern__2"),
        lantern3 = $(".whoWeAre_lantern__3"),
        lantern4 = $(".whoWeAre_lantern__4"),


        lantern5 = $(".whoWeAre_lantern__5"),
        lantern6 = $(".whoWeAre_lantern__6");


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

        lantern1.css('transform', 'translate(' + (mouse.x * 3) + 'px, ' + (mouse.y * 3 ) + 'px) scale(.35)');
        lantern2.css('transform', 'translate(' + (mouse.x * 10) + 'px, ' + (mouse.y * 5) + 'px) scale(1.3)');
        lantern3.css('transform', 'translate(' + (mouse.x * 2) + 'px, ' + (mouse.y * 2.4) + 'px) scale(.4)');
        lantern4.css('transform', 'translate(' + (mouse.x * 3) + 'px, ' + (mouse.y * 4) + 'px) scale(.35)');


        lantern5.css('transform', 'translate(' + (mouse.x * 10) + 'px, ' + (mouse.y * 5) + 'px) scale(1.3)');
        lantern6.css('transform', 'translate(' + (mouse.x * 3) + 'px, ' + (mouse.y * 4) + 'px) scale(.5)');


    });


    /// WOW Animate

    var animateLeftChildren = $(".animate-left").children(),
        al = "animate-fadeInLeft",
        animateRightChildren = $(".animate-right").children(),
        ar = "animate-fadeInRight";


    if (body.width() > 1400) {

        var sectionToStart = $(".whoWeAre_mission"),
            sectionToTop = Math.ceil( sectionToStart.offset().top ) ,
            flagAnimate = true;

        // console.log("sectionToTop = " + sectionToTop);

        $(window).scroll(function () {

            var currentScroll = $(this).scrollTop();


            if ((currentScroll >= sectionToTop)) {
                if (flagAnimate) {
                    addAnimate(animateLeftChildren, al);
                    addAnimate(animateRightChildren, ar);
                    flagAnimate=false;
                }
            }

           // console.log(currentScroll);


        });

        function addAnimate (elements, animateClass){
           var  animClasses = animateClass;

            elements.each(function (i,el, animClasses) {
                setTimeout(function () {
                    $(el).addClass(animateClass);
                }, 50 + ( i * 300 ));

            });
        }




    }



});


