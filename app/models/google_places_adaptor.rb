class GooglePlacesAdaptor
  def self.supports_category?(category)
    %w(food).include? category
  end

  def self.search(lat, lng, category)
    GP_CLIENT.spots(lat, lng, :types => category, :radius => 100000)
  end
end
