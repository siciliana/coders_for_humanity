require 'spec_helper'

describe Feedback do

  it { should belong_to(:author) }
  it { should belong_to(:receiver) }
  it { should validate_presence_of(:comment) }

end
