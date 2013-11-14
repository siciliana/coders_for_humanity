class CollaborationsController < ApplicationController

  def create
    project = Project.find(params[:project_id])

    if current_user.missing_details?
      flash[:notice] = "Your account is missing some details, please #{view_context.link_to 'fill them in before', edit_developer_path(current_user)} joining this project"
      redirect_to project_path(project) and return
    end

    collaboration = project.collaborations.create
    collaboration.role = Role.where(:description => 'pending').first_or_create
    collaboration.developer = current_user

    collaboration.save!

    Thread.new do
      UserMailer.collaboration_request_notice(:idea_owner => project.creator, :developer => current_user).deliver
    end

    UserMailer.collaboration_request_notice(:idea_owner => project.creator, :developer => current_user).deliver

    flash[:notice] = "Your request to join the project has been sent"
    redirect_to dashboard_path(current_user)
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
