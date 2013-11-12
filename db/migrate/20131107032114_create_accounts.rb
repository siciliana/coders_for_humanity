class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email
      t.string :organization
      t.string :location
      t.string :gravatar_url

      t.timestamps
    end
  end
end
