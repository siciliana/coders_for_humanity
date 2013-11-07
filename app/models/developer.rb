class Developer < ActiveRecord::Base
  attr_accessible :github_url

  has_one :account, :as => :user
  has_many :collaborations
  has_many :projects, :through => :collaborations
  has_many :received_feedbacks, :as => :receiver, :class_name => "Feedback"
  has_many :given_feedbacks, :as => :author, :class_name => "Feedback"

  validates_presence_of :github_url
end
