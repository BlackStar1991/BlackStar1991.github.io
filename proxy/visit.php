<?php

$params = require 'config.php';

$refcode = $_REQUEST['refcode'] ?? null;

if (empty($refcode)) {
	http_response_code(400);
	exit(0);
}

$ip = $_SERVER['REMOTE_ADDR'];

$json = json_encode(['type' => 'visit', 'packet' => ['refcode' => $refcode, 'ip' => $ip]]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $params['gpApiUrl']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Content-Type: application/json',
		'Content-Length: ' . strlen($json),
		]
	);
		
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

$response = curl_exec($ch);
curl_close($ch);
$response = json_decode($response, true);
echo $response['state'] ?? 'error';
		
