class Collaboration < ActiveRecord::Base

  belongs_to :project
  belongs_to :developer
  belongs_to :role
end
