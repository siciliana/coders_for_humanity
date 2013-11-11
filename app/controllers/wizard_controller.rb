class WizardController < ApplicationController

  def new
    @user = IdeaOwner.new
    @account = Account.new
    @project = Project.new
    @categories = Category.all

    render 'wizard'
  end

  def create_user
    @user = IdeaOwner.create(params[:idea_owner])
    @user.create_account(params[:account])
    @user.save

    render :json => { :user_id => @user.id}
  end

  def update_user
    @user = IdeaOwner.find(params[:id])
    @user.update_attributes(params[:idea_owner])
    @account = @user.account.update_attributes(params[:account])

    render :json => { :user_id => @user.id }
  end

  def create_project
    @project = Project.create(params[:project])

    render :json => { :project_id => @project.id }
  end

  def update_project
    @project = Project.find(params[:id])
    @project.update_attributes(params[:project])

    render :json => { :project_id => @project.id }
  end

  def review
    @project = Project.find(params[:id])
    render 'review', layout: false
  end

end
