# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Rails.env.development?
  require "database_cleaner"
  puts "Cleaning db..."
  DatabaseCleaner.strategy = :truncation
  DatabaseCleaner.clean
end

puts "Seeding..."

require 'faker'


30.times do
  Account.create  name: Faker::Name.name,
                  email: Faker::Internet.email,
                  organization: Faker::Company.name,
                  location: Faker::Address.city
end


Category.create name: 'not for profit'
Category.create name: 'community organization'
Category.create name: 'social enterprise'
Category.create name: 'education'


30.times do
  Collaboration.create  developer_id: rand(1..20),
                        project_id: rand(1..10),
                        role_id: rand(1..3)
end


Role.create description: 'lead developer'
Role.create description: 'collaborating developer'
Role.create description: 'designer'


developer_counter = 10
20.times do
  developer_counter += 1
  Developer.create  github_url: "https://github.com/" + Faker::Internet.user_name(specifier = nil, separators = %w()),
                    uid: "#"+Faker::Number.number(7),
                    account_id: developer_counter
end


idea_owner_counter = 0
10.times do
  idea_owner_counter += 1
  IdeaOwner.create  password: 'password',
                    account_id: idea_owner_counter
end


creator_id_counter = 0
10.times do
creator_id_counter += 1
  Project.create  title: Faker::Lorem.sentence,
                  creator_id: creator_id_counter,
                  description: Faker::Lorem.paragraph,
                  category_id: rand(1..4),
                  status: Project::STATUSES.values.sample
end


# Seed feedbacks
projects = Project.all
projects.each do |project|
  if project.complete?
    idea_owner = IdeaOwner.find(project.creator_id)
    idea_owners_project = idea_owner.project
    feedback_receiver = idea_owners_project.developers.first
    Feedback.create author_id: idea_owner.id,
                    author_type: 'IdeaOwner',
                    receiver_id: feedback_receiver.id,
                    receiver_type: 'Developer',
                    comment: Faker::Lorem.sentences(sentence_count = 3, supplemental = false)
  end
end

