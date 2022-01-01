<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='http://api.geonames.org/countryCodeJSON?formatted=true&lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=roshanlimbu&type=json';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;

	/*
	FOR FUTURE REFERENCE
	The following approach to segregate data triggers parsing error if unsuitable values for 'lat' and 'lng' are passed (as these values are not returned in that case).
	This is therefore handled at front-end in script.js
		
	$output['data'][0] = $decode['languages'];
	$output['data'][1] = $decode['distance'];
	$output['data'][2] = $decode['countryCode'];
	$output['data'][3] = $decode['countryName'];
	*/
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>