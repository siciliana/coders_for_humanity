class Project < ActiveRecord::Base
  attr_accessible :creator_id, :description, :story, :title
end
