window.onload = function () {
    ////// LikeLinks buttons
    function likeLink(btn) {
        btn.on("click", function () {
            var urlLink = $(this).attr("data-href");
            if (urlLink === "") {
                alert("URL address isn't correct / шляпа");
            } else {
                window.open(urlLink);
            }
        })
    }

    likeLink($(".otziv"));
    likeLink($(".btn_into"));
    likeLink($(".btn_comeIn"));


};