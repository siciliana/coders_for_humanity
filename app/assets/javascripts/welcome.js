$(document).ready(function(){
  $("#solution_button").click(function() {
      $('html, body').animate({
          scrollTop: $("#creators").offset().top
      }, 2000);
  })
  $("#dev_button").click(function() {
      $('html, body').animate({
          scrollTop: $("#developers").offset().top
      }, 2000);
  })
  
});

