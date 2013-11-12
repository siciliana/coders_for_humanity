$(document).ready(function() {
  $('#rootwizard').bootstrapWizard({
    'tabClass': 'bwizard-steps',
    onTabClick: function(tab, navigation, index) {
      return false;
    },

    'onNext': function(tab, navigation, index) {
      if(index == 1){
        var $valid = $("#new_idea_owner").valid();
        if(!$valid) {
          $accountValidator.focusInvalid();
          return false;
        }else{
          var data = $("#new_idea_owner").serialize();
          var url = $("#new_idea_owner").attr('action')

          $.post(url, data, function(response){
            $("#new_idea_owner").attr('action', '/wizard/update_user/' + response.user_id)
          })
        }
      }

      else if(index == 2){
        var $valid = $("#category_form").valid();
        if(!$valid) {
          $categoryValidator.focusInvalid();
          return false;
        }
      }

      else if(index == 3){
        var $valid = $("#new_project").valid();
        if(!$valid) {
          $projectValidator.focusInvalid();
          return false;
        }
        else{
          if($("#agreement").is(":checked")){
            $('#next_button').show();
          }
        else{
          $('#next_button').hide();
        }
          var data = $("#category_form").serialize() + $("#new_project").serialize();
          var url = $("#new_project").attr('action');

          $.post(url, data, function(response){
            projectId = response.project_id;
            $("#new_project").attr('action', '/wizard/update_project/' + projectId)
          });
        }

      } else if(index == 4){
        $.get('/wizard/review/' + projectId , function(response){
          $('#tab5').html(response)
        })
      }
    },

    'onPrevious' : function(tab, navigation, index) {
      $('#next_button').show();
    }
  });

  $(document).on("click", "li.next", function(){
    $(".bwizard-steps li.active").prev().addClass('completed')
  });

  var $accountValidator = $("#new_idea_owner").validate({
    errorClass: "alert alert-error",
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    rules: {
      first_name: {
        required: true
      },
      last_name: {
        required: true
      },

      email: {
        required: true,
        email: true
      },

      password: {
        required: true,
        minlength: 6
      }
    }
  });

  var $categoryValidator = $("#category_form").validate({
    errorClass: "alert alert-error",
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    rules: {
      project_category_id: {
        required: true
      },
    }
  });

  var $projectValidator = $("#new_project").validate({
    errorClass: "alert alert-error",
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    rules: {
      project_title: {
        required: true
      },

      project_description: {
        required: true
      },
    }
  });

  $("#agreement").on("click", function(){
    if($("#agreement").is(":checked")){
      $('#next_button').show();
    }
    else{
      $('#next_button').hide();
    }
  });

  var $agreementValidator = $("#agreement").validate({
    errorClass: "alert alert-error",
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    rules: {
      agreement: true
    }
  });

  $("#sample_project").on("click", function(event) {
    $node = '<div id="sample_project" style="width:500px; margin: 20px auto; font-size:1.2em;"><br><h3>Project Example</h3><p><strong>Title:</strong><br>Build me a system I can use to catalogue and display the plants in my nursery</p><br><p><strong>Description:</strong><br>My current process involves taking a photo of each plant, printing the photo, and displaying it in a folder with a hand-written description.  Each time I stock a new plant I have to rearrange the order of the folder. Printing is expensive so I only have one folder to show my customers.</p></div>'
    $('#sample_div').append($node)
  })

});
