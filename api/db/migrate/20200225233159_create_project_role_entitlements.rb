class CreateProjectRoleEntitlements < ActiveRecord::Migration[5.2]
  def change
    create_table :project_role_entitlements, id: :uuid do |t|
      t.references :entitlement,      null: false, type: :uuid, foreign_key: { on_delete: :cascade }
      t.references :project,          null: false, type: :uuid, foreign_key: { on_delete: :restrict }
      t.references :entitlement_role, null: false, type: :uuid, foreign_key: { on_delete: :restrict }
      t.boolean    :via_collection,   null: false, default: false

      t.timestamps

      t.index %i[entitlement_id project_id entitlement_role_id], name: "index_project_role_entitlements_uniqueness"
    end
  end
end
