require "rails_helper"
require "swagger_helper"

RSpec.describe "Comments API", type: :request do
  path "/comments/{id}" do
    include_examples "an API show request", model: Comment
    include_examples "an API update request", model: Comment
    include_examples "an API destroy request", model: Comment
  end

  path "/comments" do
    include_examples "an API create request", model: Comment
  end
end
