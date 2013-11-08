class Developer < ActiveRecord::Base
  attr_accessible :account_id, :github_id, :github_url

  belongs_to :account
  has_many :collaborations
  has_many :projects, :through => :collaborations
  has_many :received_feedbacks, :as => :receiver, :class_name => "Feedback"
  has_many :given_feedbacks, :as => :author, :class_name => "Feedback"

  validates_presence_of :github_url

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
