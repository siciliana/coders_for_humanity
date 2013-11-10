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
        session[:id] = @account.id
        redirect_to user_path(@account)
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
