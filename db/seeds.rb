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


Category.create name: "Not for profit"
Category.create name: "Small business"
Category.create name: "Social enterprise"
Category.create name: "Special interest group"


30.times do
  Collaboration.created developer_id: rand(1..20),
                        project_id: rand(1..10),
                        role_id: rand(1..3)
end

