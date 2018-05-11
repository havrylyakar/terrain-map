Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :terrains, only: :index
  root 'terrain#index'

  resources :areas, only: [:index, :create, :new]
  resources :terrain, only: [:index]
end
