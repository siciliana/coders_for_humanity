class ProjectsController < ApplicationController
  protect_from_forgery

  include ApplicationHelper 

  def index
    @project = Project.find_by_id(params[:id])
  end

  def show
    if current_user
      @project = current_user.project
    else
      @project = Project.find_by_id(params[:id])
    end

    @category = Project.find_by_id(1).category.name
  end

  def edit
    @project = current_user.project 
  end

end
