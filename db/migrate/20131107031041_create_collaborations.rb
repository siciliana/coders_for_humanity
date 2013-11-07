class CreateCollaborations < ActiveRecord::Migration
  def change
    create_table :collaborations do |t|
      t.integer :developer_id
      t.integer :project_id
      t.integer :role_id

      t.timestamps
    end
  end
end
