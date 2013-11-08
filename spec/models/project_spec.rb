require 'spec_helper'

describe Project do

  it { should belong_to(:creator) }
  it { should belong_to(:category) }
  it { should have_many(:developers) }
  it { should validate_presence_of(:story) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should_not allow_mass_assignment_of(:creator_id) }


end
