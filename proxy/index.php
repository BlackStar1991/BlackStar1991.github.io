<?php

include('register.php');

try{
	$obj = new RemoteAuthorization();
	$obj->send();
}
catch(Exception $e){
	$error = [
		'success' => false,
		'message' => $e->getMessage()
	];
	echo json_encode($error);
}
