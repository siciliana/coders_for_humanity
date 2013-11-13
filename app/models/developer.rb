class Developer < ActiveRecord::Base
  attr_accessible :account_id, :uid, :github_url, :gravatar_url

  belongs_to :account, :dependent => :destroy
  has_many :collaborations
  has_many :projects, :through => :collaborations
  has_many :roles, :through => :collaborations
  has_many :received_feedbacks, :as => :receiver, :class_name => "Feedback"
  has_many :given_feedbacks, :as => :author, :class_name => "Feedback"


  def self.from_omniauth(auth)
    dev = where(auth.slice("provider", "uid")).first_or_initialize.tap do |developer|
      developer.uid = auth["uid"]
      developer.github_url = auth['info']['urls']['GitHub']
      developer.gravatar_url = auth['info']['image']
    end

    account_details = {:name => auth['info']['name'], 
                       :email => auth['info']['email'],
                       :location => auth['extra']['raw_info']['location']}


    dev.create_account(account_details) unless dev.account
    dev.save!
    return dev
  end

  def missing_details?
    dev_account = account

    dev_account.name.blank? || dev_account.email.blank? || dev_account.location.blank?
  end

  def name
    account.name
  end

  def email
    account.email
  end

  def location
    account.location
  end

  def organization
    account.organization
  end

end
