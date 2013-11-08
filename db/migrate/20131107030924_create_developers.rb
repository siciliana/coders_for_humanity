class CreateDevelopers < ActiveRecord::Migration
  def change
    create_table :developers do |t|
      t.string :github_url
      t.integer :github_id
      t.integer :account_id

      t.timestamps
    end
  end
end
