shared_examples_for "an API create request" do |options|
  include_context("authenticated request")
  include_context("param helpers")

  api_spec_helper = ApiDocs::Helpers::Request.new(options, :create)

  let(:create) { json_structure_for(api_spec_helper.factory) }

  post I18n.t("swagger.post.description", type: api_spec_helper.human_resource_name) do
    api_spec_helper.parameters.each do |parameter_options|
      parameter(parameter_options)
    end
    description api_spec_helper.description if api_spec_helper.description
    produces api_spec_helper.content_type
    consumes api_spec_helper.content_type
    security [apiKey: []]
    tags api_spec_helper.tags

    response "201", I18n.t("swagger.post.201", type: api_spec_helper.human_resource_name) do
      let(:Authorization) { admin_auth }
      schema api_spec_helper.response
      run_test!
    end

    response "403", I18n.t("swagger.access_denied") do
      let(:Authorization) {}
      run_test!
    end
  end
end
