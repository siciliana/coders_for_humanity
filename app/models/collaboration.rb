class Collaboration < ActiveRecord::Base
  attr_accessible :developer_id, :project_id, :role_id

  belongs_to :project
  belongs_to :developer
  belongs_to :role
end
