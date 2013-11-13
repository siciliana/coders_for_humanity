class UserMailer < ActionMailer::Base
  default from: "coders4humanity@gmail.com"

  def collaboration_request_notice(opts)
    @idea_owner = opts[:idea_owner]
    @developer = opts[:developer]

    mail(:to => @idea_owner.email, :subject => "Collaboration request from #{@developer.name}", :host => 'localhost:3000')
  end

  def notify_assignment_to_developer(opts)
   @idea_owner = opts[:idea_owner]
   @developer = opts[:developer]

   mail(:to => @developer.email, :subject => "You've been assigned as team lead", :host => 'localhost:3000')

  end

end
