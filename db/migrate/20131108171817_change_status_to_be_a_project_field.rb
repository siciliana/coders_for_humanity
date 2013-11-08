class ChangeStatusToBeAProjectField < ActiveRecord::Migration
  def change
    drop_table :statuses
    rename_column :projects, :status_id, :status
    change_column :projects, :status, :string
  end
end
