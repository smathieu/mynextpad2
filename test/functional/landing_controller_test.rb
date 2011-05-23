require 'test_helper'

class LandingControllerTest < ActionController::TestCase
  test "should get show" do
    get :show
    assert_response :success
  end

end
