class IdeaOwnersController < ApplicationController

  include ApplicationHelper 

  def show
    @project_title = current_user.project.title
    @project_description = current_user.project.description
    @project_status = current_user.project.status
  end

  def edit
  	@user = IdeaOwner.find_by_id(current_user.id)
  	@account = @user.account
  end

  def update
  	@user = IdeaOwner.find_by_id(current_user.id)
  	@user.update_attributes(params[:idea_owner])
    @account = @user.account
  	@account.update_attributes(params[:account])
  	redirect_to user_path
  end


end
