class Account < ActiveRecord::Base
  attr_accessible :city, :country, :email, :first_name, :last_name, :organization

  belongs_to :user, :polymorphic => true
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :email
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

end
