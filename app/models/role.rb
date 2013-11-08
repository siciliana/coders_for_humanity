class Role < ActiveRecord::Base
  attr_accessible :description

  has_many :collaborations
  has_many :developers, :through => :collaborations

  validates_presence_of :description

end
