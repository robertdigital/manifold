module ApiDocs
  module Helpers
    class Request

      include Helpers::Inflections

      def content_type
        "application/json"
      end

      def initialize(options, action)
        @options = options
        @action = action
      end

      def description
        @options[:description]
      end

      def model
        @options[:model]
      end

      def factory
        @options[:factory] || model.name.underscore
      end

      def resource_name
        @options[:resource_name] || model.name.underscore
      end

      def resource_name_plural
        @options[:resource_name_plural] || resource_name.pluralize
      end

      def resource_tag
        resource_name.pluralize.humanize.titleize
      end

      def human_resource_name
        resource_name.camelize
      end

      def human_resource_name_plural
        human_resource_name.pluralize
      end

      def tags
        @options[:tags] || resource_tag
      end

      def parameters
        return merge_additional_parameters(@options[:parameters]) if @options.key?(:parameters)
        return merge_additional_parameters(default_create_parameters) if @action == :create
        return merge_additional_parameters(default_update_parameters) if @action == :update
        return merge_additional_parameters(default_destroy_parameters) if @action == :destroy
        return merge_additional_parameters(default_show_parameters) if @action == :show

        merge_additional_parameters([])
      end

      def merge_additional_parameters(parameters)
        return parameters unless @options.key?(:additional_parameters)

        keys = @options[:additional_parameters].map { |p| p[:name] }
        parameters.reject { |p| keys.include? p } + @options[:additional_parameters]
      end

      def default_destroy_parameters
        [
          { name: :id, in: :path, type: :string }
        ]
      end

      def default_show_parameters
        [
          { name: :id, in: :path, type: :string }
        ]
      end

      def default_create_parameters
        [
          { name: :create, in: :body, schema: request }
        ]
      end

      def default_update_parameters
        [
          { name: :id, in: :path, type: :string },
          { name: :update, in: :body, schema: request }
        ]
      end

      def request
        resource_klass(resource_name).send(type_method(type_from_action(@action, :request)))
      end

      def response
        resource_klass(resource_name).send(type_method(type_from_action(@action, :response)))
      end
    end
  end
end
