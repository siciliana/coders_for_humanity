module ApplicationHelper

  def current_user
    @current_user ||= Account.find(session[:id])
  end

  def developer?
    if Developer.find_by_account_id(current_user.id)
      return true
    else
      return false
    end
  end

  def idea_owner?
    if IdeaOwner.find_by_account_id(current_user.id)
      return true
    else
      return false
    end
  end
end
