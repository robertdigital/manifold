class CreateProjectEntitlementAudits < ActiveRecord::Migration[5.2]
  def change
    raise 'halt'

    create_view :project_entitlement_audits, materialized: true
  end
end
