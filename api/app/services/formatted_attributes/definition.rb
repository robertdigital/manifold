module FormattedAttributes
  class Definition
    include Equalizer.new(:attribute)

    attr_reader :attribute
    attr_reader :methods_module

    def initialize(attribute, include_wrap: true, renderer_options: nil)
      @attribute = attribute
      @renderer_options = renderer_options || {
        filter_html: true,
        no_images: true,
        no_links: true,
        no_styles: true,
        hard_wrap: true
      }
      @include_wrap = include_wrap
      @methods_module = FormattedAttributes::Methods.new(self)
    end

    def include_wrap?
      @include_wrap.present?
    end

    attr_reader :renderer_options

  end
end
