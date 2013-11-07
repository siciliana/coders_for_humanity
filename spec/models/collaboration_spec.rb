require 'spec_helper'

describe Collaboration do

  it { should belong_to :project }
  it { should belong_to :developer }
  it { should belong_to :role }
  it { should_not allow_mass_assignment_of(:developer_id) }
  it { should_not allow_mass_assignment_of(:project_id) }
  it { should_not allow_mass_assignment_of(:role_id) }

end
