class Project < ActiveRecord::Base
  attr_accessible  :category_id, :creator_id, :description, :status_id, :story, :title

  has_one :status

  has_many :collaborations
  has_many :developers, :through => :collaborations
  belongs_to :creator, :class_name => "IdeaOwner"
  belongs_to :category

  validates_presence_of :title
  validates_presence_of :description
  validates_presence_of :story
end
