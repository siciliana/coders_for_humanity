class CreateIdeaOwners < ActiveRecord::Migration
  def change
    create_table :idea_owners do |t|
      t.string :password_digest
      t.integer :account_id

      t.timestamps
    end
  end
end
