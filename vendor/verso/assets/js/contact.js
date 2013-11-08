$(document).ready(function () {
    $('div#output').hide();
    //bind send message here
    $('#send-message').click(sendMessage);
    $('div#output button').live('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        $('div#output').hide();
        return false;
    });
});

/* Contact Form */
function checkEmail(email) {
    var check = /^[\w\.\+-]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,6}$/;
    if (!check.test(email)) {
        return false;
    }
    return true;
}

function sendMessage() {
    // receive the provided data
    var fname = $("input#fname").val();
    var lname = $("input#lname").val();
    var email = $("input#email").val();
    var subject = $("input#subject").val();
    var message = $("textarea#message").val();
    // check if all the fields are filled
    if (fname == '' || lname == '' || email == '' || subject == '' || message == '') {
        $("div#output").removeClass('alert-success').addClass('alert-error').show().html('<div class="alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>You must enter all the fields!</div>');

        return false;
    }

    // verify the email address
    if (!checkEmail(email)) {
        $("div#output").removeClass('alert-success').addClass('alert-error').show().html('<div class="alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>Please enter a valid Email Address</div>');
        return false;
    }

    // make the AJAX request
    var dataString = $('#cform').serialize();
    $.ajax({
        type: "POST",
        url: 'contact.php',
        data: dataString,
        dataType: 'json',
        success: function (data) {
            if (data.success == 0) {
                var errors = '<ul><li>';
                if (data.name_msg != '')
                    errors += data.name_msg + '</li>';
                if (data.email_msg != '')
                    errors += '<li>' + data.email_msg + '</li>';
                if (data.message_msg != '')
                    errors += '<li>' + data.message_msg + '</li>';
                if (data.subject_msg != '')
                    errors += '<li>' + data.subject_msg + '</li>';

                $("div#output").removeClass('alert-success').addClass('alert-error').show().html('<div class="alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>Could not complete your request. See the errors below!</div>' + errors);
            }
            else if (data.success == 1) {

                $("div#output").removeClass('alert-error').addClass('alert-success').show().html('<div class="alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>You message has been sent successfully!</div>');
            }

        },
        error: function (error) {
            $("div#output").removeClass('alert-success').addClass('alert-error').show().html('<div class="alert-content"><button type="button" class="close" data-dismiss="alert-content">x</button>Could not complete your request. See the error below!</div>' + error);
        }
    });

    return false;
}