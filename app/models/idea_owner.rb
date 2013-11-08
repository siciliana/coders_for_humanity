class IdeaOwner < ActiveRecord::Base
  attr_accessible :account_id, :password

  has_secure_password

  belongs_to :account
  has_one :project, :foreign_key => :creator_id
  has_many :received_feedbacks, :as => :receiver, :class_name => "Feedback"
  has_many :given_feedbacks, :as => :author, :class_name => "Feedback"

  def name
    acc = account
    "#{acc.first_name} #{acc.last_name}"
  end

  def email
    account.email
  end

  def city
    account.city
  end

  def country
    account.country
  end

  def organization
    account.organization
  end

end