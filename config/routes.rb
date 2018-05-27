Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # resources :terrains, only: :index
  root 'areas#index'

  resources :areas, except: :update do
    member do
      get 'heights'
      get 'mesh'
      resources :maps, only: [:index] do
        collection do
          get 'search'
          get 'search_test'
        end
      end
    end
  end
  resources :terrain, only: [:index]
end
