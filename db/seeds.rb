# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'faker'

30.times do
  Account.create  first_name: Faker::Name.first_name,
                  last_name: Faker::Name.last_name,
                  email: Faker::Internet.email,
                  organization: Faker::Company.name,
                  city: Faker::Address.city,
                  country: Faker::Address.country
end


Category.create name: "not for profit"
Category.create name: "small business"
Category.create name: "social enterprise"
Category.create name: "special interest group"


30.times do
  Collaboration.create  developer_id: rand(1..20),
                        project_id: rand(1..10),
                        role_id: rand(1..3)
end


Role.create description: "lead developer"
Role.create description: "collaborating developer"
Role.create description: "designer"


developer_counter = 10
20.times do
  developer_counter += 1
  Developer.create  github_url: Faker::Internet.url,
                    github_id: "#"+Faker::Number.number(7),
                    account_id: developer_counter
end


idea_owner_counter = 0
10.times do
  idea_owner_counter += 1
  IdeaOwner.create account_id: idear_owner_counter
end


creator_id_counter = 0
10.times do
creator_id_counter += 1
  Project.create  title: Faker::Lorem.sentence,
                  creator_id: creator_id_counter,
                  description: Faker::Lorem.paragraph,
                  category_id: rand(1..4),
                  status_id: rand(1..3)
end

Status.create name: "yet to be assigned"
Status.create name: "assigned"
Status.create name: "complete"


# Seed feedbacks
projects = Project.all
projects.each do |project|
  if project.status == "complete"
    idea_owner = IdeaOwner.find(project.creator_id)
    idea_owners_project = idea_owner.project
    feedback_receiver = idea_owners_project.developers.first
    Feedback.create author_id: idea_owner.id,
                    author_type: "idea owner",
                    receiver_id: feedback_receiver.id,
                    receiver_type: "developer",
                    comment: Faker::Lorem.sentences(sentence_count = 3, supplemental = false)
  end
end

