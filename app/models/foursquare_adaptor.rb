class FoursquareAdaptor
  CATEGORY_ID_MAP = {
      "grocery" => '4bf58dd8d48988d118951735',
      "bus" => '4bf58dd8d48988d1fe931735',
      "metro" => '4bf58dd8d48988d1fd931735',
      "hospital" => '4bf58dd8d48988d196941735',
      "gym" => '4bf58dd8d48988d176941735',
      "police" => '4bf58dd8d48988d12e941735',
      "fire" => '4bf58dd8d48988d12c941735',
      "park" => '4bf58dd8d48988d163941735',
      "school" => '4bf58dd8d48988d13b941735',
      "convenience" => '4d954b0ea243a5684a65b473',
      "drugstore" => '4bf58dd8d48988d10f951735',
    }

  def self.supports_category?(category)
    CATEGORY_ID_MAP.has_key?(CATEGORY_ID_MAP)
  end

  def self.search(lat, lng, category)
    res = FS_CLIENT.search_venues(:ll => "#{lat},#{lng}", :categoryId => get_category_id(category))
    items = res.first[1].first.items
    items.map{|x|
      {
        :lat => x.location.lat,
        :lng => x.location.lng,
        :name => x.name,
        :icon => x.categories.first.icon,
      }
    }
  end

  private
  def self.get_category_id(category)
    CATEGORY_ID_MAP[category]
  end
end
