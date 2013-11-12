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
    redirect_to developer_path
  end
end
