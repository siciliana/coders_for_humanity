class ProjectsController < ApplicationController
  protect_from_forgery

  include ApplicationHelper 

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
    if current_user
      @project = current_user.project
    else
      @project = Project.find_by_id(params[:id])
    end 
    @category = @project.category.name
  end

  def edit
    @project = current_user.project 
  end

end
