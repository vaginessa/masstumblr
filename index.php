<!doctype html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>masstumblr</title>
  <link rel="stylesheet" href="massimum.css" type="text/css" media="screen" />
  <meta name="viewport" content="width=700" />

  <script type="text/javascript">
  //<![CDATA[
    document.getElementsByTagName('html')[0].className='js pending';
  //]]>
  </script>
</head>
<body id="top" class="guest">
<div id="all">

<h1><a href="http://www.studiomoh.com/fun/masstumblr/">masstumblr</a></h1>
<cite>A simple mass-upload tool for tumblr</cite>

<hr />

<div id="content">

<form id="login" method="post" action="http://www.tumblr.com/api/authenticate">
  <p>Please login with your tumblr account:</p>
  
  <label>Email: <input type="text" value="" name="email" /></label>
  <label>Password: <input type="password" value="" name="password" /></label>
  
  <label><input type="checkbox" name="cookie" checked="checked" /> Remember me</label>
  
  <input type="submit" value="Login" />
</form>

<form id="uploader" enctype="multipart/form-data" method="post" action="http://www.tumblr.com/api/write" target="xss">
  <input type="hidden" name="email" value="" />
  <input type="hidden" name="password" value="" />

  <input type="hidden" name="type" value="photo" />
  <input type="hidden" name="generator " value="studiomoh.com/fun/masstumblr" />

  <label>Tagged: <input type="text" name="tags" value="" /></label>
  <label><input type="checkbox" name="state" value="queue" checked="checked" /> Add to queue</label>
  
  <label>
    Post to:
    <select name="group"></select>
  </label>

  <hr />

  <label id="file">Select File to upload: <input name="data" type="file" /></label>

</form>

</div><!-- #content -->

<hr />

<p>&copy; <a href="/">Studio moh</a></p>

</div><!-- #all -->

<!-- Javascript -->
<iframe name="xss" id="xss" src="/fun/masstumblr/404"></iframe>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js" type="text/javascript"></script>
<script src="massimum.js" type="text/javascript"></script>

</body>
</html>