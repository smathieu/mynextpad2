class LocationController < ApplicationController
  def find
    lat = params[:lat]
    lng = params[:lng]
    category = params[:cat]

    if GooglePlacesAdaptor.supports_category?(category)
      adaptor = GooglePlacesAdaptor
    else
      adaptor = FoursquareAdaptor
    end

    render :json => adaptor.search(lat, lng, category)
  end
end
