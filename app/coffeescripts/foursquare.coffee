search_url = '/location/find'

getVenuesNear = (lat, lng, category, callback) ->
  params = {lat: lat, lng: lng, cat: category}
  $.getJSON search_url, params, callback

@foursquare =
  getVenuesNear: getVenuesNear

