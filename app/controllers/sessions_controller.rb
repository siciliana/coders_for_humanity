class SessionsController < ApplicationController

  def new
    account = Account.find_by_email(params[:email])
    
    if account  
      idea_owner = IdeaOwner.find_by_account_id(account.id)
      if idea_owner.authenticate(params[:password])
        session[:idea_owner_id] = idea_owner.id
        
        redirect_to user_path(account)
      
      else
        flash[:error] = "Password Incorrect"
        redirect_to root_path
      end
    else
      flash[:error] = "Email incorrect"
      redirect_to root_path
    end
    
  end

  def destroy
    session.clear
    redirect_to root_path
  end

  def github_auth
    auth = env["omniauth.auth"]
    developer = Developer.from_omniauth(auth)
    session[:developer_id] = developer.id


    if developer.missing_details?
      flash[:notice] = "You need to fill in your details before using this website"
      redirect_to edit_developer_path(developer) and return
    else
      redirect_to root_path and return
    end
  end


end
