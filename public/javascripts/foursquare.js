/* DO NOT MODIFY. This file was compiled Sat, 28 May 2011 20:28:22 GMT from
 * /Users/simon/Documents/startupifier/mynextpad/app/coffeescripts/foursquare.coffee
 */

(function() {
  var getVenuesNear, search_url;
  search_url = '/location/find';
  getVenuesNear = function(lat, lng, category, callback) {
    var params;
    params = {
      lat: lat,
      lng: lng,
      cat: category
    };
    return $.getJSON(search_url, params, callback);
  };
  this.foursquare = {
    getVenuesNear: getVenuesNear
  };
}).call(this);
