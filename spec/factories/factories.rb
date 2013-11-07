FactoryGirl.define do
  
  factory :account do
    first_name "John"
    last_name  "Doe"
    email "john.doe@email.com"
    organization "oliwi"
    city "Chicago"
    country "United States"
  end

end

FactoryGirl.define do
  
  factory :developer do
    github_url "www.github.com"
    account
  end

end


FactoryGirl.define do
  
  factory :client do
    password "password"
    account
  end

end
