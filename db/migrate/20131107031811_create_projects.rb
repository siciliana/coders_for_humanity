class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :creator_id
      t.text :description
      t.integer :category_id
      t.string :status, default: 'under review'

      t.timestamps
    end
  end
end
