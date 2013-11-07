class Account < ActiveRecord::Base
  attr_accessible :city, :country, :email, :first_name, :last_name, :organization, :user_id, :user_type
end
