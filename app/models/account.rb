class Account < ActiveRecord::Base
  attr_accessible :location, :email, :name, :organization

end
