module Api
  module V1
    # Sections controller
    class TextSectionsController < ApplicationController

      resourceful! TextSection, authorize_options: { except: [:index, :show] }

      def show
        @text_section = load_text_section
        includes = %w(stylesheets)
        render_single_resource @text_section,
                               include: includes
      end

      def update
        @text_section = load_and_authorize_text_section
        ::Updaters::Default.new(text_section_params).update(@text_section)
        render_single_resource(
          @text_section,
          include: %w(stylesheets),
          location: location(@text_section)
        )
      end

      def create
        @text_section = authorize_and_create_text_section(text_section_params)
        render_single_resource @text_section
      end

      def destroy
        @text_section = load_and_authorize_text_section
        @text_section.destroy
      end

      private

      def location(_stylesheet)
        # TODO: Return a proper location
        ""
      end

      def scope_for_text_sections
        if action_name == "create"
          text_id = params.dig(:data, :relationships, :text, :data, :id)
          return Text.find(text_id).text_sections
        end
        TextSection.all
      end

    end
  end
end
