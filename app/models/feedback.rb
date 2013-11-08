class Feedback < ActiveRecord::Base
  attr_accessible :author_id, :author_type, :comment, :receiver_id, :receiver_type

  belongs_to :receiver, :polymorphic => true
  belongs_to :author, :polymorphic => true

  validates_presence_of :comment
end
