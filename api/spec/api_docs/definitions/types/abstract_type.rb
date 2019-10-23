module ApiDocs
  module Definition
    module Types
      class AbstractType

        SUPPORTED_PROPERTIES = [:type, :properties, :example, :format, :items, :enum, :description, :nullable].freeze

        # For each supported property, build methods to check if an option exists a
        # method to return the option value for the property.
        SUPPORTED_PROPERTIES.each do |property|
          class_eval <<-RUBY, __FILE__, __LINE__ + 1
          def #{property}?
            @options.key? :#{property}
          end

          def #{property}
            @options[:#{property}]
          end
          RUBY
        end

        def initialize(options)
          @options = options
        end

        def render
          tuples = []
          SUPPORTED_PROPERTIES.each do |property|
            get = property.to_s
            check = "#{get}?"
            next if respond_to?(check) && !send(check)
            next unless respond_to?(get)

            tuples << [map_property(property), send(property)]
          end
          tuples.to_h
        end

        def map_property(property)
          return "x-nullable" if property == :nullable

          property.to_s
        end

        def nullable?
          true
        end

        def nullable
          return @options[:nullable] if @options.key? :nullable

          true
        end

        def type?
          true
        end

        def type
          self.class.name.demodulize.underscore.dasherize
        end

      end
    end
  end
end
