class ProjectsController < ApplicationController
  protect_from_forgery

  def index
    @project = Project.find_by_id(params[:id])
  end

  def show
    @project = Project.find_by_id(params[:id])
    @category = Project.find_by_id(1).category.name
  end

end
