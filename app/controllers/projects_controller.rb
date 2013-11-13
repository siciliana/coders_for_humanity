class ProjectsController < ApplicationController
  protect_from_forgery

  def index
    @project = Project.find_by_id(params[:id])
    @projects = Project.all
    @categories = Category.all


   #  @projects.each do |project|
			# creator_first_name = Account.find(project.creator_id).first_name
			# creator_last_name = Account.find(project.creator_id).last_name
			# full_name = creator_first_name + ' ' + creator_last_name
			# project << full_name
    render :index
  end

  def show
    @project = Project.find_by_id(params[:id])
    @category = @project.category.name
  end

  def edit
    @project = current_user.project
    @categories = Category.all

    render layout: !request.xhr?
  end

  def update
    project = Project.find(params[:id])
    project.update_attributes(params[:project])

    redirect_to user_path(current_user)
  end
end
