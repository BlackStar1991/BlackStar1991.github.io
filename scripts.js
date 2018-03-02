window.onload = function () {

    var active = "active",
        btnOpenAdress = $("#btn_addAdress"),
        fullFieldAdress = $(".bl_addAdress"),
        btnCloseAdress = $("#btn_close__addAdress"),

        btnOpenFilters = $("#btn_filters"),
        fullFieldFilters = $(".bl_filters"),
        btnCloseFilters = $("#btn_close__filters");


    function openField(btn, field) {
        btn.on("click", function () {
            $(this).addClass("hidden");
            field.addClass(active);
        })
    }

    openField(btnOpenAdress, fullFieldAdress);
    openField(btnOpenFilters, fullFieldFilters);

    function closeField(btn, field, visionBtn) {
        btn.on("click", function () {
            field.removeClass(active);
            visionBtn.removeClass("hidden");
        })
    }

    closeField(btnCloseAdress, fullFieldAdress, btnOpenAdress);
    closeField(btnCloseFilters, fullFieldFilters, btnOpenFilters);


    // var counter = 0;
    // $(".selectAll").on("click", function () {
    //     var choothAllCheckbox = $(this).parent().find(":checkbox");
    //     counter++;
    //
    //     if (counter % 2) {
    //         choothAllCheckbox.prop('checked', true);
    //         $(this).text("Убрать все!");
    //     } else {
    //         choothAllCheckbox.prop('checked', false);
    //         $(this).text("Выбрать все!");
    //     }
    //
    //
    // });


    var lableChoothAllCheckbox = $(".allCheckbox");



    lableChoothAllCheckbox.on("click", function(){
        var choothAllCheckbox = $(".bl_categories__item:not(.allCheckbox)").find(":checkbox"),
            choothAllChackbox = $(".allCheckbox").children(":checkbox");



        if( choothAllChackbox.prop("checked") === true){
            choothAllCheckbox.prop('checked', true);
        }else{
            choothAllCheckbox.prop('checked', false);
        }

    })



}