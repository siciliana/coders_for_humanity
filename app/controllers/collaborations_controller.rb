class CollaborationsController < ApplicationController
  include ApplicationHelper
  
  def create
    project = Project.find(params[:project_id])
    
    collaboration = project.collaborations.create
    collaboration.role = Role.where(:description => 'pending').first_or_create
    collaboration.developer = current_user

    collaboration.save!
    redirect_to developer_path(current_user)
  end

  def assign
    collaboration = Collaboration.find(params[:id])
    project = Project.find(params[:project_id])

    collaboration.role = Role.where(:description => "lead developer").first
    collaboration.save!

    project.update_attribute :status, Project.statuses[:assigned]

    redirect_to user_path(current_user)
  end

end
