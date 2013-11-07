class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.integer :author_id
      t.string :author_type
      t.integer :receiver_id
      t.string :receiver_type
      t.text :comment

      t.timestamps
    end
  end
end
