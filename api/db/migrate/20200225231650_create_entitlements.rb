class CreateEntitlements < ActiveRecord::Migration[5.2]
  def change
    create_table :entitlements, id: :uuid do |t|
      t.references :user,     type: :uuid, null: false, foreign_key: { on_delete: :cascade }
      t.references :entitler, type: :uuid, null: false, foreign_key: { on_delete: :restrict }
      t.references :subject,  type: :uuid, null: false, polymorphic: true

      t.text :kind,         null: false, default: "unknown"
      t.text :description,  null: false, default: ""

      t.jsonb :roles,       null: false, default: {}
      t.jsonb :options,     null: false, default: {}
      t.jsonb :metadata,    null: false, default: {}

      t.timestamps

      t.index %i[user_id entitler_id subject_id subject_type], unique: true, name: "index_entitlements_uniqueness"
    end
  end
end
