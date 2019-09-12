shared_examples_for "an API destroy request" do |options|
  include_context("authenticated request")
  include_context("param helpers")

  api_spec_helper = ApiDocs::Helpers::Request.new(options, :destroy)

  delete I18n.t("swagger.delete.description", type: api_spec_helper.human_resource_name, attribute: "ID") do
    api_spec_helper.parameters.each do |parameter_options|
      parameter(parameter_options)
    end
    description api_spec_helper.description if api_spec_helper.description
    security [apiKey: []]
    tags api_spec_helper.tags

    response "204", I18n.t("swagger.delete.204", type: api_spec_helper.human_resource_name) do
      let(:Authorization) { admin_auth }
      run_test!
    end

    response "403", I18n.t("swagger.access_denied") do
      let(:Authorization) {}
      run_test!
    end
  end
end
