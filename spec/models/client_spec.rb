require 'spec_helper'

describe Client do

  it { should have_one(:project) }
  it { should have_one(:account) }
  it { should have_many(:given_feedbacks) }
  it { should have_many(:received_feedbacks) }
  it { should have_secure_password }
  it { should_not allow_mass_assignment_of(:password_digest) }

end
