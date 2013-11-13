$(document).ready(function(){
  $("#tab-navigation").tab();

    $(".single-title").each(function(i){
    len=$(this).text().length;
    if(len>60)
    {
      $(this).find('a').text($(this).text().substr(0,60)+'...');
    }
  });
});
