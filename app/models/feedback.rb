class Feedback < ActiveRecord::Base
  attr_accessible :author_id, :author_type, :comment, :receiver_id, :receiver_type
end
