class Feedback < ActiveRecord::Base
  attr_accessible :comment

  belongs_to :receiver, :polymorphic => true
  belongs_to :author, :polymorphic => true

  validates_presence_of :comment
end
