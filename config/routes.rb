Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "groups#index"
  resources :messages
  resources :users, only: [:index, :edit, :update]#user編集機能
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]

    #apicontrollerのルーティング
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end