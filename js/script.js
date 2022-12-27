"use strict";
const buttons = [...document.querySelectorAll(".language-button")];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelector(".language-button.active")
      .classList.remove("active");
    button.classList.add("active");
  });
});

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("social").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".arrow__button")) {
    var dropdowns = document.getElementsByClassName("arrow__social");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

$(document).ready(function () {
  $(".hamburger-menu").click(function (event) {
    $(
      ".bar,.header__menu, .header__hamburger-menu, .header__language, .header__social"
    ).toggleClass("active");
    $("body").toggleClass("lock");
  });
});

//  Swiper
let myImageSlider = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoHeight: true,
  loop: false,

  pagination: {
    el: ".swiper-pagination",

    type: "bullets",
    clickable: true,
  },

  slidesPerView: 1,

  spaceBetween: 1300,

  slidesPerGroup: 1,

  centeredSlides: true,

  initialSlide: 0,
  speed: 500,

  onAny(eventName, ...args) {
    if (eventName == "slideChange") {
      var currentIndex = args[0].previousIndex;
      var nextIndex = args[0].activeIndex;

      if (currentIndex < nextIndex) {
        $(".swiper-pagination-bullet")
          .eq(currentIndex)
          .html('<span class="blulet_start_right"></span>');

        setTimeout(function () {
          $(".swiper-pagination-bullet").eq(currentIndex).html("");
        }, 400);
      } else {
        $(".swiper-pagination-bullet")
          .eq(currentIndex)
          .html('<span class="blulet_start_left"></span>');
        setTimeout(function () {
          $(".swiper-pagination-bullet").eq(currentIndex).html("");
        }, 400);
      }
    }
  },
});
