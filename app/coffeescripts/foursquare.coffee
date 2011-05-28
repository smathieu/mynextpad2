client_id = 'I1ATRYBZLDI0EDEZFGC1BADYRVRMLOUMB3GNNS2WNB1U4LHE'
secret = 'BCZOYVOBG2GOBTR2NTSNX3QVAVWDDJN2AZ2XIIEPGJQRV1TK'
search_url = 'https://api.foursquare.com/v2/venues/search'
default_params =
  client_id: client_id,
  client_secret: secret

types =
  GroceryStores:      '4bf58dd8d48988d118951735',
  BusStops:           '4bf58dd8d48988d1fe931735',
  MetroStops:         '4bf58dd8d48988d1fd931735',
  Hospitals:          '4bf58dd8d48988d196941735',
  Gyms:               '4bf58dd8d48988d176941735',
  Police:             '4bf58dd8d48988d12e941735',
  Fire:               '4bf58dd8d48988d12c941735',
  Parks:              '4bf58dd8d48988d163941735',
  Schools:            '4bf58dd8d48988d13b941735',
  ConvenienceStores:  '4d954b0ea243a5684a65b473',
  Drugstores:         '4bf58dd8d48988d10f951735',

getVenuesNear = (lat, lng, callback, extra_args) ->
  latlng = lat + ',' + lng
  params = $.extend {}, default_params, ll: latlng
  if extra_args
    params = $.extend params, extra_args

  $.getJSON search_url, params, (json) ->
    items = json.response.groups[0].items
    items = items.sort (el1, el2) ->
      el1.location.distance - el2.location.distance

    callback items

@foursquare =
  getVenuesNear: getVenuesNear

for own name,cat of types
  ((cat) ->
    @foursquare['get' + name + 'Near'] = (lat, lng, cb) -> getVenuesNear lat, lng, cb, categoryId: cat
  )(cat)
