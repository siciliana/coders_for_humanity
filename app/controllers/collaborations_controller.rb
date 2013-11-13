class CollaborationsController < ApplicationController
  include ApplicationHelper
  
  def create
    project = Project.find(params[:project_id])
    
    collaboration = project.collaborations.create
    collaboration.role = Role.where(:description => 'pending').first_or_create
    collaboration.developer = current_user

    collaboration.save!
    UserMailer.collaboration_request_notice(:idea_owner => project.creator, :developer => current_user).deliver
    redirect_to developer_path(current_user)
  end

  def assign
    collaboration = Collaboration.find(params[:id])
    project = Project.find(params[:project_id])

    collaboration.role = Role.where(:description => "lead developer").first
    collaboration.save!

    project.update_attribute :status, Project.statuses[:assigned]

    UserMailer.notify_assignment_to_developer(:idea_owner => current_user, :developer => collaboration.developer).deliver

    redirect_to user_path(current_user)
  end

end
