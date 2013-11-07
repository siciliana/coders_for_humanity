class Client < ActiveRecord::Base
  attr_accessible :password

  has_secure_password

  has_one :account, :as => :user
  has_one :project, :foreign_key => :creator_id
  has_many :received_feedbacks, :as => :receiver, :class_name => "Feedback"
  has_many :given_feedbacks, :as => :author, :class_name => "Feedback"

end
