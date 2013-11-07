require 'spec_helper'

describe Feedback do

  it { should belong_to(:author) }
  it { should belong_to(:receiver) }
  it { should validate_presence_of(:comment) }
  it { should_not allow_mass_assignment_of(:author_id) }
  it { should_not allow_mass_assignment_of(:receiver_id) }

end
