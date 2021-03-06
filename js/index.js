
//Move to the top of the page whenever the page is loaded
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

document.onload = generateBackground();

$(document).ready(function () {

  //Start a game of tetris with autoplay
  $('.game').blockrain({theme: 'candy', autoplay: true, autoplayRestart: true, speed: 30});

  //Event Listeners
  document.getElementById("randomize-btn").addEventListener("click", function () {generateBackground();});
  document.getElementById("tetris-btn").addEventListener("click", function(){toggleTetris();});

  /*
    This event handler implements smooth scrolling when clicking on an anchor link
  */
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]').
  not('[href="#0"]').
  click(function (event) {
    // On-page links
    if (
    location.pathname.replace(/^\//, "") ==
    this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname)
    {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
        {
          scrollTop: target.offset().top },

        1000,
        function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });

      }
    }
  });

  //Run even when the window is resized
  $(window).
  resize(function () {
    //Viewheight of the window
    var windowHeight = $(window).height();

    /*
      This event handler makes it so elements fade in on scroll
    */
    $(document).scroll(function(){

      var pageTop = $(document).scrollTop();
      var pageBottom = pageTop + $(window).height();
      $(".fade").each(function(){
        if ($(this).position().top < pageBottom) {
          $(this).addClass("visible")
        } else {
          $(this).removeClass("visible")
        }

});
      });

      /*
        This event handler makes it so the navbar becomes fixed after the user scrolls past it
      */
    $(document).scroll(function () {
      if ($(this).scrollTop() > windowHeight) {
        $("#nav").addClass("fixed-top");
        $("#nav").css("background-color", "rgba(0,0,0,0.5)");
        var phantomHeight = $("#nav").outerHeight();

        // Set the height of $nav-phantom
        $("#nav-phantom").height(phantomHeight).show();
      } else {
        $("#nav").removeClass("fixed-top");
        $("#nav").css("background-color", "rgba(0,0,0,0.8)");
        $('#nav-phantom').hide();
      }
    });

    // Define variables
    var sections = $('.section')
    var nav = $('#nav')
    var nav_height = nav.outerHeight();

    /*
      This event handler makes it so that the nav links become active when on the respective pages
    */
    $(window).scroll( function () {
      var currentPosition = $(this).scrollTop();

      sections.each(function() {
        var top = $(this).offset().top - nav_height;
        var bottom = top + $(this).outerHeight();

        if (currentPosition >= top && currentPosition <= bottom) {
          nav.find('a').removeClass('active');
          sections.removeClass('active');

          $(this).addClass('active');
          nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
      });
    });

  }).resize();
});

/*
  Generates a random hex value for a color code
*/
function randomColor() {
  return (
    "#" +
    (
    "000000" +
    Math.random().
    toString(16).
    slice(2, 8).
    toUpperCase()).
    slice(-6));

}

/*
  Creates a linear gradient background
*/
function generateBackground() {
  document.getElementById("intro").style.background =
  "linear-gradient(45deg," + randomColor() + ", " + randomColor() + ")";
}

/*
  Toggles between autoplay and user playing
*/
function toggleTetris(){
    if ($('#tetris-btn').text()==='Try me!'){
    $('.game').blockrain({autoplay: false, speed: 20});
    $('.game').blockrain('controls', true);
    $('.game').blockrain('restart');
    $('#tetris-btn').removeClass("btn-success");
    $('#tetris-btn').addClass("btn-danger");
    $('#tetris-btn').html("I'm Done!");
  }
  else{
    $('.game').blockrain({autoplay: true, autoplayRestart: true, speed:30});
    $('.game').blockrain('restart');
    $('#tetris-btn').removeClass("btn-danger");
    $('#tetris-btn').addClass("btn-success");
    $('#tetris-btn').html("Try me!");
  }

}
