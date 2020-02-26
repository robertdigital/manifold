class ProjectRoleEntitlement < ApplicationRecord
  belongs_to :entitlement, inverse_of: :project_role_entitlements
  belongs_to :project, inverse_of: :project_role_entitlements
  belongs_to :entitlement_role, inverse_of: :project_role_entitlements
end
