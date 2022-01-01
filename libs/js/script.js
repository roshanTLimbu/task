$(document).ready(function() {
		//console.log("ready");
	$('#getCountryCodeRun').click(function() {
		//console.log("clicked");
		$.ajax({
			url: "libs/php/getCountryCode.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: $('#latCountryCode').val(),
				lng: $('#lngCountryCode').val()
			},
			success: function(result) {				

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {					
												
						$('#resultDiv').html('');
						$('#resultDiv').append('<br/>Languages: ' + JSON.stringify(result['data']['languages']));
						$('#resultDiv').append('<br/>Distance: ' + JSON.stringify(result['data']['distance']));
						$('#resultDiv').append('<br/>Country Code: ' + JSON.stringify(result['data']['countryCode']));
						$('#resultDiv').append('<br/>Country Name: ' + JSON.stringify(result['data']['countryName']));						
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				//error handling
				console.log("ERROR TRIGGERED");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		}); 
	});

	$('#getEarthquakesRun').click(function () {

		$.ajax({
			url: "libs/php/getEarthquakes.php",
			type: 'POST',
			dataType: 'json',
			data: {
				north: $('#northEarthquakes').val(),
				south: $('#southEarthquakes').val(),
				east: $('#eastEarthquakes').val(),
				west: $('#westEarthquakes').val()
			},
			success: function(result) {
				console.log(JSON.stringify(result));
				
				if (result.status.name == "ok") {
					//parameters that are invalid or resulting in no data may throw a Type Error due to change in structure of the result JSON.
					try {
						$('#resultDiv').html('');
						console.log(JSON.stringify(result['data']));
						result.data.forEach(earthquake => {
							$('#resultDiv').append('<br/>Date and Time: ' + earthquake['datetime']);
							$('#resultDiv').append('<br/>Depth: ' + earthquake['depth']);
							$('#resultDiv').append('<br/>Longitude: ' + earthquake['lng']);
							$('#resultDiv').append('<br/>Lattitude: ' + earthquake['lat']);
							$('#resultDiv').append('<br/>Source: ' + earthquake['src']);
							$('#resultDiv').append('<br/>EQ ID: ' + earthquake['eqid']);
							$('#resultDiv').append('<br/>Magnitude: ' + earthquake['magnitude']);
							$('#resultDiv').append('<br/>--------------------------------------</br>');
							console.log(JSON.stringify(earthquake));
						});						

					} catch (e) {
						console.log(e.message);
						$('#resultDiv').html(JSON.stringify(result['data']));
					}
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// error handling
				console.log("ERROR TRIGGERED");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		}); 
	
	});

	$('#getOceanRun').click(function () {

		$.ajax({
			url: "libs/php/getOcean.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: $('#latOcean').val(),
				lng: $('#lngOcean').val()
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {
					
					//invalid or unavailable parameters may throw a Type Error due to change in structure of the result JSON. 
					try {												
						$('#resultDiv').html('');
						$('#resultDiv').append('<br/>Data: ' + JSON.stringify(result['data']));
						$('#resultDiv').append('<br/>Distance: ' + JSON.stringify(result['data']['ocean']['distance']));
						$('#resultDiv').append('<br/>Geoname ID: ' + JSON.stringify(result['data']['ocean']['geonameId']));
						$('#resultDiv').append('<br/>Sea or Ocean Name: ' + JSON.stringify(result['data']['ocean']['name']));
					} catch (e) {
						$('#resultDiv').html(JSON.stringify(result['data']['status']['message']));
					}	

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// error handling
				console.log("ERROR TRIGGERED");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		}); 
	
	});
});