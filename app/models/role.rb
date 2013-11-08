class Role < ActiveRecord::Base
  attr_accessible :description

  has_many :collaborations
  has_many :developers, :through => :collaborations

end
