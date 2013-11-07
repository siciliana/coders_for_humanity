class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :creator_id
      t.text :description
      t.text :story

      t.timestamps
    end
  end
end
