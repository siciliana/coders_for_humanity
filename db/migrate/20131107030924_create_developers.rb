class CreateDevelopers < ActiveRecord::Migration
  def change
    create_table :developers do |t|
      t.string :github_url
      t.integer :uid
      t.string :provider
      t.string :gravatar_url
      t.integer :account_id

      t.timestamps
    end
  end
end
