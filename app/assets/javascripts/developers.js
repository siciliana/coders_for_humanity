$(document).ready(function(){
  $("#submit-edit-form").on("click", function(e){

    e.preventDefault();

    var $valid = $(".edit_developer").valid();
    if(!$valid) {
      $accountValidator.focusInvalid();
      return false;
    }else{
      $(".edit_developer").submit();
    }
  });
});

var $accountValidator = $(".edit_developer").validate({
    errorClass: "alert alert-error",
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      location: {
        require: true,
      }
    }
  });
