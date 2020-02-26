class EntitlementRole < ApplicationRecord
  upsert_keys %i[name]

  classy_enum_attr :name, enum: "EntitlementRoleName", allow_blank: false

  has_many :project_role_entitlements, inverse_of: :entitlement_role, dependent: :destroy

  validates :name, uniqueness: { on: :update }
end
