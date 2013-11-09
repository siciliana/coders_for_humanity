class IdeaOwnersController < ApplicationController
  protect_from_forgery

  def index

  end
  
  def show

  end

  def login
    @account = Account.find_by_email(params[:email])
    
    if @account  
      @idea_owner = IdeaOwner.find_by_account_id(@account.id)
      if @idea_owner.authenticate(params[:password])
        redirect_to user_path(@idea_owner)
      else
        flash[:error] = "Username or Password Incorrect"
        redirect_to root_path
      end
    else
      flash[:error] = "Username or Password Incorrect"
      redirect_to root_path
    end
    
  end


end
