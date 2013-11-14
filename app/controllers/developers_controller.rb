class DevelopersController < ApplicationController

  include ApplicationHelper 

  def show
    @user = current_user
    @user_id = Account.find(current_user.account_id)
    @user_github_url = @user.github_url.to_s
    @user_email = Account.find(@user_id).email
    @user_location = Account.find(@user_id).location 
    @user_organization = Account.find(@user_id).organization
  end

  def edit
    @user = current_user
    @account = @user.account
  end

  def update
    @user = Developer.find_by_id(current_user.id)
    @user.update_attributes(params[@user])
    @account = @user.account
    @account.update_attributes(params[:account])
    session[:developer_id] = @user.id
    
    flash[:notice] = "Your profile has been edited."

    redirect_to developer_path
  end

  def dashboard
    @projects = current_user.projects
    @feedbacks = current_user.received_feedbacks

    if current_user.missing_details?
      flash[:notice] = "Your account is missing some details, please #{view_context.link_to 'edit', edit_developer_path(current_user)} your profile"
    end
  end
end
