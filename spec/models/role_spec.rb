require 'spec_helper'

describe Role do

  it { should have_many(:collaborations) }
  it { should have_many(:developers) }
  it { should validate_presence_of(:description) }

end
