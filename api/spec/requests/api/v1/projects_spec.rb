require "rails_helper"
require "swagger_helper"

RSpec.describe "Projects API", type: :request do
  path "/projects/{id}" do
    include_examples "an API show request", model: Project
    include_examples "an API update request", model: Project
    include_examples "an API destroy request", model: Project
  end

  path "/comments" do
    include_examples "an API create request", model: Project
  end
end
