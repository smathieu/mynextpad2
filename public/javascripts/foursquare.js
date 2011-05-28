/* DO NOT MODIFY. This file was compiled Sat, 28 May 2011 17:15:49 GMT from
 * /Users/logansmyth/projects/mynextpad2/app/coffeescripts/foursquare.coffee
 */

(function() {
  var cat, client_id, default_params, getVenuesNear, name, search_url, secret, types, _fn;
  var __hasProp = Object.prototype.hasOwnProperty;
  client_id = 'I1ATRYBZLDI0EDEZFGC1BADYRVRMLOUMB3GNNS2WNB1U4LHE';
  secret = 'BCZOYVOBG2GOBTR2NTSNX3QVAVWDDJN2AZ2XIIEPGJQRV1TK';
  search_url = 'https://api.foursquare.com/v2/venues/search';
  default_params = {
    client_id: client_id,
    client_secret: secret
  };
  types = {
    GroceryStores: '4bf58dd8d48988d118951735',
    BusStops: '4bf58dd8d48988d1fe931735',
    MetroStops: '4bf58dd8d48988d1fd931735',
    Hospitals: '4bf58dd8d48988d196941735',
    Gyms: '4bf58dd8d48988d176941735',
    Police: '4bf58dd8d48988d12e941735',
    Fire: '4bf58dd8d48988d12c941735',
    Parks: '4bf58dd8d48988d163941735',
    Schools: '4bf58dd8d48988d13b941735',
    ConvenienceStores: '4d954b0ea243a5684a65b473',
    Drugstores: '4bf58dd8d48988d10f951735'
  };
  getVenuesNear = function(lat, lng, callback, extra_args) {
    var latlng, params;
    latlng = lat + ',' + lng;
    params = $.extend({}, default_params, {
      ll: latlng
    });
    if (extra_args) {
      params = $.extend(params, extra_args);
    }
    return $.getJSON(search_url, params, function(json) {
      var items;
      items = json.response.groups[0].items;
      items = items.sort(function(el1, el2) {
        return el1.location.distance - el2.location.distance;
      });
      return callback(items);
    });
  };
  this.foursquare = {
    getVenuesNear: getVenuesNear
  };
  _fn = function(cat) {
    return this.foursquare['get' + name + 'Near'] = function(lat, lng, cb) {
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    };
  };
  for (name in types) {
    if (!__hasProp.call(types, name)) continue;
    cat = types[name];
    _fn(cat);
  }
}).call(this);
