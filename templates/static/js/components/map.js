var map;
var marker_styles;
var colors;

function initialize(map_colors) {
    colors = map_colors;

    // map styles
    var map_styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": colors[3][1]
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": "-14"
            },
            {
                "lightness": "-11"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "saturation": "-41"
            },
            {
                "lightness": "-20"
            },
            {
                "gamma": "3.93"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": "7"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

    // marker styles
    marker_styles = {
            path:   'M18-26.8c0-10.2-8.3-18.5-18.5-18.5S-19-37.1-19-26.8c0,5.1,2.1,9.7,5.4,' +
                    '13L-0.5-0.3l13.1-13.5C15.9-17.1,18-21.7,18-26.8z',
            fillColor: colors[0][1],
            fillOpacity: 1,
            strokeColor: colors[1][1],
            strokeWeight: 1,
            scale: 0.6
    };

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(map_styles, {name: "SITUATIONS"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.s
    var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(51, 9), // central europe (germany)
        mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']},
        disableDefaultUI: true
    };

    var map_holder = document.getElementById('map_holder');
    map = new google.maps.Map(document.getElementById('map_holder'), mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}

function render(markers, mode, limit) {
    // set first marker and number of markers
    var start_marker = 0;
    if (mode != 0 && markers.length > limit) {
        start_marker = markers.length - limit - 1;
    }

    // draw
    for (var i = start_marker; i < markers.length; i++) {
        if (markers[i][5][1] != null) {
            draw_marker(markers[i]);
            if (markers[i].length > 7 && mode == 0) draw_link(markers[i]);
        }
    }
}

function draw_marker(marker) {
    var new_marker = new google.maps.Marker({
        icon: marker_styles,
        position: new google.maps.LatLng(marker[5][1], marker[6][1]),
        map: map
    });

    var data = '<p>' + marker[1][1] + '</p>';
    data    += '<p>' + marker[3][1] + '</p>';
    data    += '<p>' + marker[4][1] + '</p>';
    /*
    data    += '<hr>';
    data    += '<button>More info</button>';
    */

    var infowindow = new google.maps.InfoWindow({
      content: data
    });

    google.maps.event.addListener(new_marker, 'mouseover', function() {
        infowindow.open(map, new_marker);
    });

    google.maps.event.addListener(new_marker, 'mouseout', function() {
        infowindow.close();
    });

    google.maps.event.addListener(new_marker, 'click', function() {
    });
}

function draw_link(marker) {
    if (marker[7] != undefined) {   // has no connection
        if (marker[7][1] != null) {
            new google.maps.Polyline({
                path: [
                    {lat: marker[5][1], lng: marker[6][1]},
                    {lat: marker[7][1], lng: marker[8][1]}
                    ],
                strokeColor: colors[0][1],
                strokeOpacity: 1,
                strokeWeight: 0.8,
                map: map
            });
        }
        /*
        console.log('connected: ' + marker[5][1] + ' ' + marker[6][1] +
                    '\nwith: ' + marker[7][1] + ' ' + marker[8][1]);
        */
    }
}