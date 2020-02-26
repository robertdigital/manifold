class Entitlement < ApplicationRecord
  classy_enum_attr :kind, enum: "EntitlementKind", allow_blank: false, default: :unknown

  attribute :roles, Entitlements::RoleMapping.to_type

  belongs_to :entitler, inverse_of: :entitlements
  belongs_to :user,     inverse_of: :entitlements
  belongs_to :subject,  polymorphic: true

  has_many :project_role_entitlements, inverse_of: :entitlement, dependent: :destroy
  has_many :projects, through: :project_role_entitlements
end
