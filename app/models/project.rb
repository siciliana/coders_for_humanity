class Project < ActiveRecord::Base
  attr_accessible  :category_id, :creator_id, :description, :status, :story, :title

  STATUSES = {
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

  scope :assigned, -> { where(status: STATUSES[:assigned]) }
  scope :completed, -> { where(status: STATUSES[:complete]) }
  scope :not_yet_assigned, -> { where(status: STATUSES[:not_yet_assigned]) }


  def assigned?
    status == 'assigned'
  end


  def complete?
    status == 'complete'
  end


  def not_yet_assigned?
    status == 'not yet assigned'
  end
end
