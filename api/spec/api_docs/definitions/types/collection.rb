module ApiDocs
  module Definition
    module Types
      class Collection < Types::Array

        def items?
          true
        end

        def items
          Type.object(properties: {
                        id: Type.id,
                        type: Type.string(example: @options[:contains])
                      })
        end

      end
    end
  end
end
