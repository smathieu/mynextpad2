require 'test_helper'

class LocationControllerTest < ActionController::TestCase
  test "should get find" do
    get :find
    assert_response :success
  end

end
