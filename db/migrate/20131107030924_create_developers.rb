class CreateDevelopers < ActiveRecord::Migration
  def change
    create_table :developers do |t|
      t.string :github_url

      t.timestamps
    end
  end
end
