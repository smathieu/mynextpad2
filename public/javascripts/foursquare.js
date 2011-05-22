/* DO NOT MODIFY. This file was compiled Sun, 22 May 2011 16:55:04 GMT from
 * /Users/simon/Documents/startupifier/mynextpad/app/coffeescripts/foursquare.coffee
 */

(function() {
  var client_id, default_params, getVenuesNear, search_url, secret;
  client_id = 'I1ATRYBZLDI0EDEZFGC1BADYRVRMLOUMB3GNNS2WNB1U4LHE';
  secret = 'BCZOYVOBG2GOBTR2NTSNX3QVAVWDDJN2AZ2XIIEPGJQRV1TK';
  search_url = 'https://api.foursquare.com/v2/venues/search';
  default_params = {
    client_id: client_id,
    client_secret: secret
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
    getVenuesNear: getVenuesNear,
    getGroceryStoresNear: function(lat, lng, callback) {
      var category_id;
      category_id = '4bf58dd8d48988d118951735';
      return getVenuesNear(lat, lng, callback, {
        categoryId: category_id
      });
    },
    getBusStopsNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d1fe931735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getMetroStopsNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d1fd931735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getHospitalsNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d196941735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getGymsNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d176941735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getPoliceNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d12e941735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getFireNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d12c941735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getParksNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d163941735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getSchoolsNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d13b941735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getConvenienceStoresNear: function(lat, lng, cb) {
      var cat;
      cat = '4d954b0ea243a5684a65b473';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    },
    getDrugstoresNear: function(lat, lng, cb) {
      var cat;
      cat = '4bf58dd8d48988d10f951735';
      return getVenuesNear(lat, lng, cb, {
        categoryId: cat
      });
    }
  };
}).call(this);
