class WelcomeController < ApplicationController
  protect_from_forgery

  def index
    @featured_project1 = Project.find(Random.rand(1..Project.all.length))
    @featured_project2 = Project.find(Random.rand(1..Project.all.length))
  end

end
