shared_examples_for "an API show request" do |options|
  include_context("authenticated request")
  include_context("param helpers")

  api_spec_helper = ApiDocs::Helpers::Request.new(options, :show)

  let(:body) { json_structure_for(api_spec_helper.factory) }

  get I18n.t("swagger.get.one.description", type: api_spec_helper.human_resource_name, attribute: "ID") do
    api_spec_helper.parameters.each do |parameter_options|
      parameter(parameter_options)
    end
    description api_spec_helper.description if api_spec_helper.description
    produces api_spec_helper.content_type
    consumes api_spec_helper.content_type
    tags api_spec_helper.tags

    response "200", I18n.t("swagger.get.one.200", type: api_spec_helper.human_resource_name, attribute: "ID") do
      schema api_spec_helper.response
      run_test!
    end

    response "404", I18n.t("swagger.access_denied") do
      let(:id) { "not-an-id" }
      run_test!
    end
  end
end
