class LocationController < ApplicationController
  def find
    render :json => GP_CLIENT.spots(params[:lat], params[:lng], :types => params[:cat])
  end
end
