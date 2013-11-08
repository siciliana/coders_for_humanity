require 'spec_helper'

describe Project do

  it { should belong_to(:creator) }
  it { should belong_to(:category) }
  it { should have_many(:collaborations) }
  it { should have_many(:developers) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }

  let(:assigned_project) { FactoryGirl.create(:project) }
  let(:completed_project) { FactoryGirl.create(:project, status: "complete") }
  let(:not_yet_assigned_project) { FactoryGirl.create(:project, status: "not yet assigned") }


  describe "#assigned" do
    subject { assigned_project }

    it "includes the assigned project" do
      expect(Project.assigned).to include(assigned_project)
    end

    it "does not include the completed project" do
      expect(Project.assigned).not_to include(completed_project)
    end
  end


  describe "#completed" do
    subject { completed_project }

    it "includes the completed project" do
      expect(Project.completed).to include(completed_project)
    end

    it "does not include the not yet assigned project" do
      expect(Project.completed).not_to include(not_yet_assigned_project)
    end
  end

  describe "#not_yet_assigned" do
    subject { not_yet_assigned_project }

    it "includes the not yet assigned project" do
      expect(Project.not_yet_assigned).to include(not_yet_assigned_project)
    end

    it "does not include the assinged project" do
      expect(Project.not_yet_assigned).not_to include(assigned_project)
    end
  end

end
