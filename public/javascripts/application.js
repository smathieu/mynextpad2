(function($){
  $.fn.blank = function(){
    return $.trim(this.val()).length == 0;
  }
})(jQuery)

function distance(lat1, lng1, lat2, lng2) {
  var lat = Math.abs(lat1 - lat2);
  var lng = Math.abs(lng1 - lng2);
  return Math.sqrt(lat*lat + lng*lng );
}

function calcDistances(lat, lng, items) {
  return $.map(items, function(dat, i) {
    var loc = $.extend({}, dat);
    var llat = Math.abs(loc.lat - lat);
    var llng = Math.abs(loc.lng - lng);
    dat.dist = Math.sqrt(llat * llat + llng * llng );
    return dat;
  });
}

function closestItems(lat, lng, items, num) {
  var items = calcDistances(lat, lng, items);
  items.sort(function(a, b) {
    return a.dist - b.dist;
  });
  return items.slice(0, num);
}

$(function() {
  var directionsService = new google.maps.DirectionsService();

  function getWalkingTime(start_latlng, end_latlng, callback) {
    var request = {
      origin:  start_latlng,
      destination: end_latlng,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var duration = response.routes[0].legs[0].duration.text;
        callback(duration);
      }
      else {
        log('Error checking walking time');
        log(status);
      }
    });
  }

  var log = function(msg) {
    if (console) {
      console.log(msg);
    }
  }
  var latlng = new google.maps.LatLng(-34.397, 150.644);

  var map_options = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 15,
    center: latlng
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"), map_options)
  var geocoder = new google.maps.Geocoder();
  var infowindow = new google.maps.InfoWindow({ 
    size: new google.maps.Size(50,50)
  });

  var MARKER_KEYS = ['bixi', 'grocery', 'police', 'hospital', 'fire', 'gym', 'metro', 'bus', 'park', 'food', 'convenience', 'drugstore', 'school']
  var markers = {};
  var main_marker;

  var selected_key;

  $.each(MARKER_KEYS, function(i, key) {
    markers[key] = []
  });

  function setSelected(key) {
    selected_key = key;
    $('.report_row').removeClass('selected');
    $('.report_row.' + key).addClass('selected');
  }

  function hideMarkersFor(key) {
    if (key == 'all') {
      hideMarkers();
    }
    else {
      $.each(markers[key], function(i, marker) {
        marker.setMap(null);
      });
    }
  }

  function hideMarkers() {
    $.each(MARKER_KEYS, function(i, key) {
      hideMarkersFor(key);
    });
  }

  function resetMarkersFor(key) {
    if (key == 'all') {
      resetMarkers();
    }
    else {
      hideMarkers(key);
      markers[key] = [];
    }
  }

  function showMarkersFor(key) {
    if (key == 'all') {
      showMarkers();
    }
    else {
      $.each(markers[key], function(i, marker) {
        marker.setMap(map);
      });
    }
  }

  function showMarkers() {
    if (main_marker) {
      main_marker.setMap(map);
    }
    $.each(MARKER_KEYS, function(i, key) {
      showMarkersFor(key);
    });
  };

  function resetMarkers() {
    if (main_marker) {
      main_marker.setMap(null);
    }
    $.each(MARKER_KEYS, function(i, key) {
      resetMarkersFor(key);
    });
  };

  function placeMarker(key, loc, name, content, options) {
    if (!content) content = name;

    var latlng = new google.maps.LatLng(loc.lat, loc.lng);
    var marker_params = {
      map: map,
      position: latlng,
      zIndex: 0,
      title: name
    };
    marker_params = $.extend(marker_params, options);
    var mark = new google.maps.Marker(marker_params);

    google.maps.event.addListener(mark, 'click', function() {
      infowindow.close();
      infowindow.setContent(name);
      infowindow.setPosition(mark.getPosition());
      infowindow.open(map, mark);
    });

    markers[key].push(mark);
  }

  function resetReports() {
    $('#report').html('')
  }
  function addReportRow(key, text) {
    return $('<li>', {
        id: key + '_row',
        'class': 'report_row ' + key,
      })
      .append($('<div class="report-image"/>'))
      .mouseenter(function() {
        hideMarkers();
        showMarkersFor(key);
        $(this).addClass('hover');
      })
      .mouseleave(function() {
        hideMarkers();
        showMarkersFor(selected_key);
        $(this).removeClass('hover');
      })
      .click(function() {
        hideMarkers();
        showMarkersFor(key);
        setSelected(key);
      })
      .qtip({
        content: {
          prerender: true,
          text: $('<div />', { id: key + '_tooltip' })
            .append($('<div />').text(text)),
        },
        show: {
          delay: 50
        },
        hide: {
          delay: 50
        },
        position: {
          corner: {
            target: 'bottomMiddle',
            tooltip: 'topMiddle'
          }
        },
        style: {
          tip: 'topMiddle',
          name: 'blue'
        }
      })
      .appendTo($('#report'));
  }

  function add_walking_time (key, time) {
    $('#' + key + '_tooltip').append($('<div>', {
      'class': 'walking_distance'
    }).append(time));
  }

  function fs_add_walking_time (key, lat, lng, loc) {
    var orig_latlng = new google.maps.LatLng(lat, lng);
    var dest_latlng = new google.maps.LatLng(loc.lat, loc.lng);
    getWalkingTime(orig_latlng, dest_latlng, function(walking_time) {
      add_walking_time(key, walking_time);
    });
  }

  function showLocalVenue(lat, lng, category) {
    foursquare.getVenuesNear(lat, lng, category, function(items) {
      items = closestItems(lat, lng, items, 5);
      for (var i = 0; i < 5; i++) {
        var item = items[i];
        if (item) {
          placeMarker(category, {lat: item.lat, lng: item.lng}, category + ' ' + item.name, undefined, {icon : item.icon});
        }
      };

      var item = items[0];
      if (item) {
        var loc = {lat: item.lat, lng: item.lng};

        addReportRow(category,
          "The closest " + category + " is " +
          item.name
         );
        fs_add_walking_time(category, lat, lng, loc);
      }
    });
  }

  function codeAddress(address) {
    resetMarkers();
    resetReports();
    $('.error').hide();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        main_marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            zIndex: 200,
            icon: 'images/markers/green-dot.png'
        });
        var marker = main_marker;

        var loc = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
        addReportRow('all', "Show all markers");
        setSelected('all');

        $.each(MARKER_KEYS, function(i, category) {
          showLocalVenue(loc.lat, loc.lng, category);
        });
      } else {
        $('.error').show();
      }
    });
  }

  $('#search_form').submit(function(event) {
    event.preventDefault()
    codeAddress($('#search').val());
  });
  
  if ($('#search').blank()) {
    var default_search = 'Montreal, QC';
    $('#search').val(default_search);
  }
  codeAddress(default_search);

  $('#submit').button();
  $('.error').hide();
  
});


