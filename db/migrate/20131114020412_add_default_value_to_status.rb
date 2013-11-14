class AddDefaultValueToStatus < ActiveRecord::Migration
  def change
  	change_column_default :projects, :status, 'under review'
  end
end
