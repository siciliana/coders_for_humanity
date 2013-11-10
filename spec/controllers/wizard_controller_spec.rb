require 'spec_helper'

describe WizardController do

  describe 'GET new' do
    before do
      get :new
    end

    it { assigns(:user).should be_a IdeaOwner }
    it { assigns(:account).should be_a Account }
    it { assigns(:project).should be_a Project }
    it { assigns(:categories).should eq Category.all }
    its(:response) { should render_template('wizard') }
  end

  describe "POST 'create_user'" do
    
    before do
      post :create_user, :idea_owner => attributes_for(:idea_owner), :account => attributes_for(:account)
    end

    it 'creates an idea owner' do
      assigns(:user).should be_a IdeaOwner
      assigns(:user).password_digest.should_not be_blank
    end

    it 'creates an associated account' do
      assigns(:user).account.should be_a Account
      assigns(:user).account.first_name.should eq 'John'
    end

    it 'renders user_id in JSON' do
      expected = {user_id: IdeaOwner.last.id}.to_json
      response.body.should eq expected
    end
  end

  describe 'POST update_user' do

    before(:all) do
      @user = create(:idea_owner)
    end

    it 'updates idea_owner attributes' do
      expect { update_user }.to change { @user.password_digest }
    end

    it 'updates account attributes' do
      post :update_user, :id => @user.id,  :idea_owner => {:password => "123456"}, :account => {:first_name => "Jane"}
      @user = IdeaOwner.find(@user.id)

      @user.account.first_name.should eq "Jane"
    end

    it 'renders user_id in JSON' do
      expected = {user_id: @user.id}.to_json
      update_user
      response.body.should eq expected
    end
  end

  describe "POST 'create_project'" do

    before do
      post :create_project, :project => attributes_for(:project)
    end

    it { assigns{:project}[:project].should be_a Project }
    it { assigns{:project}[:project].title.should eq "Homeless street survey" }

    it 'renders project_id in JSON' do
      expected = {project_id: Project.last.id}.to_json
      response.body.should eq expected
    end

  end

   describe 'POST update_user' do

    before(:all) do
      @project = create(:project)
    end

    it 'updates project attributes' do
      post :update_project, :id => @project.id,  :project => { :title => "HEYY", :category_id => 1 }
      @project = Project.find(@project.id)
      
      @project.title.should eq "HEYY"
      @project.category_id.should eq 1
    end


    it 'renders project_id in JSON' do
      expected = {project_id: @project.id}.to_json
      update_project
      response.body.should eq expected
    end
  end

  describe 'GET review' do
    let(:project) { create(:project) }
    
    before do
      get :review, :id => project.id
    end

    it { assigns(:project).should eq project }
    its(:response) { should render_template(:review) }
  end

end
