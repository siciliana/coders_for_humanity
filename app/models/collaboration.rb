class Collaboration < ActiveRecord::Base
  attr_accessible :developer_id, :developer_role, :project_id
end
