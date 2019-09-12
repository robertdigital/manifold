shared_examples_for "an API update request" do |options|
  include_context("authenticated request")
  include_context("param helpers")

  api_spec_helper = ApiDocs::Helpers::Request.new(options, :update)

  let(:update) { json_structure_for(api_spec_helper.factory) }

  patch I18n.t("swagger.patch.description", type: api_spec_helper.human_resource_name, attribute: "ID") do
    api_spec_helper.parameters.each do |parameter_options|
      parameter(parameter_options)
    end
    description api_spec_helper.description if api_spec_helper.description
    produces api_spec_helper.content_type
    consumes api_spec_helper.content_type
    security [apiKey: []]
    tags api_spec_helper.tags

    response "200", I18n.t("swagger.patch.200", type: api_spec_helper.human_resource_name, attribute: "ID") do
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
