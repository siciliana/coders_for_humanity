class Project < ActiveRecord::Base
  attr_accessible  :category_id, :creator_id, :description, :status, :story, :title

  STATUSES = {
    under_review: 'under review',
    not_yet_assigned: 'not yet assigned',
    assigned: 'assigned',
    complete: 'complete'
  }

  has_many :collaborations
  has_many :developers, :through => :collaborations
  belongs_to :creator, :class_name => "IdeaOwner"
  belongs_to :category

  validates_presence_of :title
  validates_presence_of :description

  scope :under_review, -> { where(status: STATUSES[:under_review])}
  scope :assigned, -> { where(status: STATUSES[:assigned]) }
  scope :completed, -> { where(status: STATUSES[:complete]) }
  scope :not_yet_assigned, -> { where(status: STATUSES[:not_yet_assigned]) }


  def under_review?
    status == 'under review'
  end


  def assigned?
    status == 'assigned'
  end


  def complete?
    status == 'complete'
  end


  def not_yet_assigned?
    status == 'not yet assigned'
  end

  def self.statuses
    STATUSES
  end

  def pending_collaborations
    collaborations.joins(:role).where(:roles => {:description => 'pending'})
  end

  def assigned_developers
    assigned_collaborations.map(&:developer)
  end

  def assigned_collaborations
    collaborations.includes(:developer) - pending_collaborations
  end
end
