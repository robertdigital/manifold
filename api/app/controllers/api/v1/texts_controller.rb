module Api
  module V1
    # Texts controller
    class TextsController < ApplicationController

      resourceful! Text, authorize_options: { actions: { toggle_export_epub_v3: :update }, except: [:index, :show] } do
        Text.all
      end

      def index
        @texts = load_texts
        render_multiple_resources @texts, include: [:project]
      end

      def show
        @text = scope_for_texts.includes(:project, :text_sections, :stylesheets,
                                         :toc_section)
          .find(params[:id])
        authorize_action_for @text
        render_single_resource @text,
                               include: includes
      end

      def create
        @text = authorize_and_create_text(text_params)
        render_single_resource @text
      end

      def update
        @text = load_and_authorize_text
        ::Updaters::Text.new(text_params).update(@text)
        render_single_resource @text,
                               include: includes
      end

      def destroy
        @text = load_and_authorize_text
        @text.destroy
      end

      def toggle_export_epub_v3
        @text = load_and_authorize_text

        @text.toggle_exports_as_epub_v3!

        render_single_resource @text,
                               include: includes
      end

      protected

      def includes
        [:project, :category, :creators, :contributors, :stylesheets, :text_sections]
      end

      def scope_for_texts
        if action_name == "create"
          project_id = params.dig(:data, :relationships, :project, :data, :id)
          return Project.find(project_id).texts
        end
        Text.friendly
      end

    end
  end
end
