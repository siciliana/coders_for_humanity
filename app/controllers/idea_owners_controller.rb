class IdeaOwnersController < ApplicationController

  include ApplicationHelper 

  def show
    @project_title = current_user.project.title
    @project_description = current_user.project.description
    @project_status = current_user.project.status
  end

  def edit
  end


end
