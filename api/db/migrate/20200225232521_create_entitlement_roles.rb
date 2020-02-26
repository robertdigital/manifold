class CreateEntitlementRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :entitlement_roles, id: :uuid do |t|
      t.text :name, null: false

      t.timestamps

      t.index :name, unique: true
    end

    reversible do |dir|
      dir.up do
        say_with_time "Inserting initial entitlement role" do
          execute(<<~SQL.strip_heredoc.squish).cmdtuples
          INSERT INTO entitlement_roles (name, created_at, updated_at) VALUES ('read_access', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
          SQL
        end
      end
    end
  end
end
