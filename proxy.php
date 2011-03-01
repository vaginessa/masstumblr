<?php

// Prepare POST request
$request_data = http_build_query(
    array(
        'email'     => $_POST['email'],
        'password'  => $_POST['password'],
        'generator' => 'studiomoh.com/fun/masstumblr'
    )
);

// Send the POST request (with cURL)
$c = curl_init('http://www.tumblr.com/api/'.$_POST['url']);
curl_setopt($c, CURLOPT_POST, true);
curl_setopt($c, CURLOPT_POSTFIELDS, $request_data);
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_HEADER, 0);

$result = curl_exec($c);
$status = curl_getinfo($c, CURLINFO_HTTP_CODE);

header('Content-type: text/xml');
die($result);

?>