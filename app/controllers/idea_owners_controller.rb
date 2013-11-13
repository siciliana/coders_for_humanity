class IdeaOwnersController < ApplicationController

  include ApplicationHelper 

  def show
    @project = current_user.project
    @feedbacks = current_user.received_feedbacks
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
