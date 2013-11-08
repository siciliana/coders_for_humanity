require 'spec_helper'

describe Account do

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should_not allow_value("blah").for(:email) }
  it { should allow_value("a@b.com").for(:email) }
  it { should_not allow_mass_assignment_of(:user_id) }
  it { should_not allow_mass_assignment_of(:user_type) }

end
