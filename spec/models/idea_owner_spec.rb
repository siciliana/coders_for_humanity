require 'spec_helper'

describe IdeaOwner do

  subject(:idea_owner) { create(:idea_owner) }

  it { should have_one(:project) }
  it { should have_many(:given_feedbacks) }
  it { should have_many(:received_feedbacks) }
  it { should have_secure_password }
  it { should_not allow_mass_assignment_of(:password_digest) }
  it { should belong_to(:account) }

  its(:password_digest) { should_not be_nil }
  its(:name) { should eq "John Doe" }
  its(:email) { should eq "john.doe@email.com" }
  its(:organization) { should eq "oliwi" }
  its(:city) { should eq "Chicago" }
  its(:country) { should eq "United States" }

end
