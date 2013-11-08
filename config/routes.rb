CodersFh::Application.routes.draw do

 resources :users

 resources :developers

 resources :projects

 root :to => 'welcome#index'
end
