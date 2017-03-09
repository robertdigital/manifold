# Serializes a Text model
class UserSerializer < ActiveModel::Serializer
  include Authorization
  meta(partial: false)

  attributes :id, :email, :nickname, :first_name, :last_name, :role, :created_at,
             :updated_at, :full_name, :avatar_styles

  has_many :favorites, serializer: FavoriteSerializer
  has_many :makers, if: :can_update_object?
end
