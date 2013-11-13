class Account < ActiveRecord::Base
  attr_accessible :location, :email, :name, :organization

  validates_presence_of :name
  # validates_presence_of :last_name
  validates_presence_of :email
  validates :email, uniqueness: true 
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

end
