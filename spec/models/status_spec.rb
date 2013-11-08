require 'spec_helper'

describe Status do
  it { should have_many(:projects) }
  it { should validate_presence_of(:name) }

end

