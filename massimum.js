/** Variable scope **/
var useremail = null;
var userpass = null;

/** Simple functions **/
function setCookie(name,val,days) {
  if(days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = '; expires=' + date.toGMTString();
  } else {
    var expires = '';
  }
  document.cookie = name + '=' + val + expires + '; path=/';
}
function readCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return 0;
}


/** Doc ready **/
$(document).ready(function() {

/** Login **/
if(readCookie('creds')) {
  var creds = readCookie('creds').split('|');
  $('#login [name=email]').val(creds[0]);
  $('#login [name=password]').val(creds[1]);
}

$('#login').submit(function(e) {
  e.preventDefault();
  $('#login').addClass('loading');
  $('#login [type=submit]').attr('disabled','disabled').val('Loading...');
  
  // Variable
  useremail = $('#login [name=email]').val();
  userpass = $('#login [name=password]').val();
  postUrl = $('#login').attr('action');
  
  // Setcookie if they want us to remember things
  if($('#login input:checked').length > 0) {
    setCookie('creds',useremail+'|'+userpass,14);
  }

  // Validate account
  $.post('proxy.php', { url: 'authenticate', email: useremail, password: userpass },
    function(data) {
      if($(data).find('user').length > 0) {
        // Toggle login
        $('#login').hide();
        $('body').removeClass('guest').addClass('loggedin');
        $('#uploader [name=email]').val($('#login [name=email]').val());
        $('#uploader [name=password]').val($('#login [name=password]').val());
        
        // Populate tumblelogs
        $(data).find('tumblelog').each(function(i, tl) {
          $('#uploader select[name=group]')
            .append('<option value="' + $(tl).attr('url').slice(7,-1) + '">' + $(tl).attr('name') + '</option>');
            //<img src="' + $(tl).attr('avatar-url') + '" />
        });
      } else {
        $('#login').removeClass('loading');
        $('#login [type=submit]').removeAttr('disabled').val('Error, try again?');
      }
    });
  
  return false;
});

$('#login input').slice(0,1).focus();


/** Upload handling **/
$('#uploader').submit(function(e) {
  //e.preventDefault();
  $('#uploader').addClass('loading');
  $('#uploader [type=submit]').attr('disabled','disabled').val('Uploading...');
  $('#uploader input, #uploader select').attr('readonly','readonly');

  $('#xss').one('load', function() {
    $('#uploader').removeClass('loading');
    $('#uploader [type=submit]').removeAttr('disabled').val('Post to tumblr');
    $('#uploader input, #uploader select').removeAttr('readonly');
    //$('#file').html($('#file').html());

    $('<blockquote class="alert">Done uploading!</blockquote>')
      .prependTo($('#content'));
    setTimeout(function() {
      $('.alert').hide('fast', function() { $(this).remove(); });
    }, 3000);
  });
  
  //return false;
});

$('#file input').change(function() {
  $('#uploader').submit();
});


});