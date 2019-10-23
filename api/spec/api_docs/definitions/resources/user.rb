module ApiDocs
  module Definition
    module Resource
      class User

        READ_ONLY = [
          :abilities,
          :kind,
          :created_at,
          :role,
          :updated_at,
          :full_name,
          :avatar_styles,
          :abilities,
          :is_current_user
        ].freeze

        WRITE_ONLY = [
          :first_name,
          :last_name,
          :nickname,
          :name,
          :email,
          :password,
          :password_confirmation,
          :remove_avatar,
          :avatar,
          :persistent_ui,
          :notification_preferences_by_kind,
          :unsubscribe
        ].freeze

        # TODO: required: %w(name email password password_confirmation)
        ATTRIBUTES = {
          email: Type.string,
          nickname: Type.string,
          first_name: Type.string,
          last_name: Type.string,
          kind: Type.string,
          name: Type.string,
          password: Type.string,
          password_confirmation: Type.string,
          remove_avatar: Type.boolean,
          avatar: Type.attachment_styles,
          created_at: Type.date_time,
          role: Type.string,
          updated_at: Type.date_time,
          full_name: Type.string,
          avatar_styles: Type.attachment_styles,
          abilities: Type.abilities,
          is_current_user: Type.boolean,
          persistent_ui: Type.object(parameters: {
            reader: Type.object(parameters: {
              colors: Type.object,
              typography: Type.object,
              reading_groups: Type.object
            })
          }),
          notification_preferences_by_kind: Type.array(
            items: Type.object(parameters: {
              type: Type.object(parameters: {
                digest: Type.string,
                projects: Type.string,
                replies_to_me: Type.string,
                followed_project: Type.string,
                flagged_resources: Type.string,
                digest_comments_and_annotations: Type.string,
                project_comments_and_annotations: Type.string,
              })
            })
          )
        }.freeze

        RELATIONSHIPS = {
          makers: Type.collection(contains: "makers")
        }.freeze

        class << self

          include Resource

        end
      end
    end
  end
end
