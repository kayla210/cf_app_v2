var map;
var service;
var directionsService; 
var directionsDisplay;
var styledMapType;
var drawingManager;
	function callback( results, status){
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var marker = new google.maps.Marker({
			position: results[i].geometry.location,
			map: map,
			icon: results[i].icon
		});
		}

	}
	function performSearch(){
		var request = {
			bounds: map.getBounds(),
			name: "McDonald's"
		}
		service.nearbySearch(request, callback);
	}
	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('from').value,
          destination: document.getElementById('to').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
            directionsDisplay.setPanel(document.getElementById('directionsPanel'));
            console.log(directionsDisplay);
			//console.log(directionsDisplay.setPanel(document.getElementById('directionsPanel')));

          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    function submit(){
    	console.log(directionsService);
    	console.log(directionsDisplay);
       	calculateAndDisplayRoute(directionsService, directionsDisplay);
    }
    function styleMap(){
    	styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Styled Map'});
    }
  function drawingMethod(){
    var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
    return drawingManager;
  }
  function makeMarkerIcon(markerColor){
     var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +'|40|_|%E2%80%A2',
      new google.maps.Size(21,34),
      new google.maps.Point(0,0),
      new google.maps.Point(10,34),
      new google.maps.Size(21,34));
      return markerImage;
  } 

	function initialise(location){
		console.log(location);
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer();

//     $.getScript('/js/style.js', function () {          
//      styledMapType = styleMap();  
// });  
		styleMap();
		var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var defaultIcon= makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');

		var mapOptions ={
			center: currentLocation,
			zoom: 12,
			//mapTypeId:google.maps.MapTypeId.ROADMAP
			mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
		}
	
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

		var marker = new google.maps.Marker({
			position: currentLocation,
			map: map,
      icon: defaultIcon,
			title: 'position',
      animation: google.maps.Animation.DROP
		});

		var infowindow = new google.maps.InfoWindow({
			content:'Lakeshore Ridge',
    	position: marker.position
  		});
  		marker.addListener('click', function() {
   			infowindow.open(map, marker);
  		});
      marker.addListener('mouseover',function(){
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout',function(){
        this.setIcon(defaultIcon);
      });
		//service = new google.maps.places.PlacesService(map);
		//google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
    var drawingManager = drawingMethod();
    console.log(drawingManager);
    drawingManager.setMap(map);
		directionsDisplay.setMap(map);
	}

	$(document).ready(function()
	{
		map = navigator.geolocation.getCurrentPosition(initialise);

	});
