class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :organization
      t.string :city
      t.string :country
      t.integer :user_id
      t.string :user_type

      t.timestamps
    end
  end
end
