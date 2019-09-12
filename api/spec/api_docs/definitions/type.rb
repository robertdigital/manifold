module ApiDocs
  module Definition
    class Type

      class << self

        # A helper function to handle merging params while making a special case for nullable attributes.
        # Rswag currently generates OpenAPI v2 documentation, and the method for declaring nullable
        # values changes in OpenAPI v3. To make the change easier whenever it happens, this helper function
        # will make it so passing a { nullable: true } value into any of these base Types will set the
        # nullable swagger definition properly
        def merge_params_with_nullable(base, params = {})
          nullable = params.delete(:nullable)
          base = base.merge('x-nullable': true) if nullable
          base = base.merge(params)
          base
        end

        def method_missing(type, **options)
          klass_name = "ApiDocs::Definition::Types::#{type.to_s.camelize}"
          klass_name.constantize.new(options).render
        end
      end

    end
  end
end
