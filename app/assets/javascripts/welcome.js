$(document).ready(function(){
  $("#solution_button").click(function() {
      $('html, body').animate({
          scrollTop: $("#creators").offset().top
      }, 1000);
  });
  $("#dev_button").click(function() {
      $('html, body').animate({
          scrollTop: $("#developers").offset().top
      }, 1000);
  });

  $(".about_us_navbar").click(function() {
    $('html, body').animate({
        scrollTop: $("#about_us").offset().top
    }, 1000);
  });

  $(".projects_navbar").click(function() {
    $('html, body').animate({
        scrollTop: $("#featured").offset().top
    }, 1000);
  });
});
