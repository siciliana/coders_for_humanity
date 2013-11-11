$(document).ready(function(){
  $("#solution_button").click(function() {
      $('html, body').animate({
          scrollTop: $("#creators").offset().top
      }, 1500);
  })
  $("#dev_button").click(function() {
      $('html, body').animate({
          scrollTop: $("#developers").offset().top
      }, 1500);
  })
});

