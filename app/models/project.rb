class Project < ActiveRecord::Base
  attr_accessible  :description, :story, :title

  has_many :collaborations
  has_many :developers, :through => :collaborations
  belongs_to :creator, :class_name => "IdeaOwner"
  belongs_to :category

  validates_presence_of :title
  validates_presence_of :description
  validates_presence_of :story
end
