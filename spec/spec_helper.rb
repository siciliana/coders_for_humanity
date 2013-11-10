require 'simplecov'
SimpleCov.start
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
require 'capybara/rspec'
require 'capybara/rails'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = true

  config.infer_base_class_for_anonymous_controllers = false

  config.order = "random"

  config.include FactoryGirl::Syntax::Methods

  config.include Capybara::DSL
end

def update_user
  post :update_user, :id => @user.id,  :idea_owner => {:password => "123456"}, :account => {:first_name => "Jane"}
end

def update_project
  post :update_project, :id => @project.id,  :project => { :title => "HEYYY", :category_id => 1 }
end
