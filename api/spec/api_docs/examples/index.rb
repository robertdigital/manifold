shared_examples_for "an API index request" do |options|
  include_context("authenticated request")
  include_context("param helpers")

  api_spec_helper = ApiDocs::Helpers::Request.new(options, :index)

  get I18n.t("swagger.get.all.description", type: api_spec_helper.human_resource_name_plural) do
    api_spec_helper.parameters.each do |parameter_options|
      parameter(parameter_options)
    end
    description api_spec_helper.description if api_spec_helper.description
    produces api_spec_helper.content_type
    tags api_spec_helper.tags

    response "200", I18n.t("swagger.get.all.200", type: api_spec_helper.human_resource_name) do
      schema api_spec_helper.response
      run_test!
    end
  end
end
