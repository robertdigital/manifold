class ProjectEntitlementAudit < ApplicationRecord
  include Concerns::MaterializedView

  belongs_to :user
end
