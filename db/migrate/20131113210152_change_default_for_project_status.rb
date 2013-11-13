class ChangeDefaultForProjectStatus < ActiveRecord::Migration
  def change
    change_column_default :projects, :status, 'not yet assigned'
  end
end
