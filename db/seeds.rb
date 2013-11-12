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


project_titles = []
project_titles.push("Build me an app I can use to perform a survey of homeless people in Chicago",
                    "Help me make contact with my regional hospital during  difficult deliveries in my rural community",
                    "I need a system to help me arrange and manage networking events for members of the gay and lesbian community",
                    "Create an app to help me identify and record rare plant species in the Amazon basin",
                    "Assist me with a system to communicate between my fairtrade producers and buyers worldwide",
                    "We want a system to document the NGOs working in our district to prevent overlapping concerns",
                    "I want a system to support battered women by allowing them to check in with me and with eachother",
                    "Help me identify and interact with the recycling initiatives in my area",
                    "Write an app to help me teach adult learners to read and write",
                    "I would like an app to foster collaboration within my local arts and crafts community")

What are the steps in your current process?  What single task takes up the most time?  What task do you repeat most often?  What is biggest problem about the way you currently work?

project_descriptions = []
project_descriptions.push("I currently use a clipboard and pen to conduct the homeless surveys.  Then I input the data into a spreadsheet.  To write reports I cut and paste database queries from the spreadsheet to the word processor package.  Data entry and producing reports are the most time consuming tasks.  My current process is time-consuming and inefficient",
                          "When I act as a birth attendant in rural communities, I am isolated and unsupported.  I need a way to communicate quickly with my regional hospital to mobilize help and arrange transportation.  It is difficult for me to describe my exact location, and local options for transportation are unknown.",
                          "I maintain a mailing list of members of the LGBT community in my area.  I would like to keep them updated of meetups and local events of interest.  Currently, I check listings in my local paper, send out a circular email, and keep a record of responders in my diary.  I then inform event organisers about expected numbers.  I would love to collect feedback about events and publish a rating system.",
                          "I work for a local NGO dedicated to the conservation of near-extinct plant species.  We need a digit resource and algorithm to help identify the species, and a means of entering each sighting into a database.  Currently, when we identify a rare plant we take a photograph on site and record a rough estimate of the location.  When we return to base camp we consult hard copies of encylopedias to identify the plant.",
                          "I work with craft makers in rural Tanzania, helping to connect them directly to buyers in Europe.  I would like an easy to use system to manage orders and commissions between the two.  Currently, I rely heavily on travel and face to face meetings.  I would like to cut down my time away from home and empower the craftsmen to play a more direct role in managing their sales.",
                          "We currently have a number of NGOs who come to Accra to perform cleft lip and palate surgery.  We also have a local surgeons delivering the same service.  We need a system to map out the workload being done by each organization, compare it to our need and coordinate the service provision to remove duplication and widen coverage.",
                          "As an outreach worker, I engage with battered women when they attend the local hospital.  It would helpful to them to have a secure forum where they could raise a call for help or support within a trusted community.  Currently, I give them my telephone number, but I am not always available and sometimes miss their calls.",
                          "My local authority does not offer a recycling service, however there are many residents and businesses in my area interested in clubbing together to find a recycling solution.  I would like a process that keeps me updated of recyling initiatives within a 30 mile radius, allows me to document the volume of waste collected and the routes of disposal.",
                          "As a retired teacher, I volunteer on a one-to-one basis to teach adult learners basic numeracy and literacy.  I have developed an innovative system of learning on paper and I would like to produce an interative electronic version to use with my students.",
                          "I am part of a community of arts and crafts makers.  We would like a management system to help us create and run workshops as well as a noticeboard to alert members and the wider community of these workshops and arts and crafts fares.")

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

