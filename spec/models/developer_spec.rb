require 'spec_helper'

describe Developer do

  it { should have_many(:projects) }
  it { should have_many(:given_feedbacks) }
  it { should have_many(:received_feedbacks) }
  it { should validate_presence_of(:github_url)}
  it { should have_one(:account) }
  
end
