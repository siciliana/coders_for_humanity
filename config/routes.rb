CodersFh::Application.routes.draw do

 resources :users, controller: :idea_owners
 post '/login' => 'sessions#new'
 get '/logout' => 'sessions#destroy'
 get '/auth/:provider/callback' => 'sessions#github_auth'
 get 'auth/failure' => redirect('/')

 get '/about' => 'about#index'

 post 'wizard/update_user/:id', :to => 'wizard#update_user', :as => "wizard_update_user"
 post 'wizard/create_user', :to => 'wizard#create_user', :as => "wizard_create_user"
 post 'wizard/create_project', :to => 'wizard#create_project', :as => "wizard_create_project"
 post 'wizard/update_project/:id', :to => 'wizard#update_project', :as => "wizard_update_project"
 get 'wizard/review/:id', :to => 'wizard#review', :as => "wizard_review"
 get '/wizard', :to => 'wizard#new', :as => "new_wizard"

 resources :developers
 get 'dashboard/:id', :to => 'developers#dashboard', :as => "dashboard"

 resources :projects do
   resources :collaborations do
    member do
      get '/assign' => 'collaborations#assign'
    end
   end
 end

 root :to => 'welcome#index'


end
