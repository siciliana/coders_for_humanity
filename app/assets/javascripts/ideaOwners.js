$(document).ready(function(){

  $(document).on('click', "#edit-project", function(e){
    e.preventDefault();
    var url = $(this).closest('form').attr('action');
    
    $.get(url, function(response){
      $('#project-area').html(response);
    });

  });

});
