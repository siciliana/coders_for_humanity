require 'spec_helper'

describe Developer do

  subject(:developer) { create(:developer) }

  it { should have_many(:projects) }
  it { should have_many(:given_feedbacks) }
  it { should have_many(:received_feedbacks) }
  it { should validate_presence_of(:github_url)}
  it { should belong_to(:account) }

  its(:github_url) { should eq "www.github.com" }
  its(:name) { should eq "John Doe" }
  its(:email) { should eq "john.doe@email.com" }
  its(:organization) { should eq "oliwi" }
  its(:city) { should eq "Chicago" }
  its(:country) { should eq "United States" }

  
end
