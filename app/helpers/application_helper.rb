module ApplicationHelper

  def current_user
    @current_user ||= IdeaOwner.find_by_id(session[:idea_owner_id]) || Developer.find_by_id(params[:developer_id])
  end

  def developer?
    current_user.is_a? Developer
  end

  def idea_owner?
    current_user.is_a? IdeaOwner
  end
end
