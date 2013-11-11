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
    @category = Project.find_by_id(1).category.name
  end

end
