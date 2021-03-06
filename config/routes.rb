Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  namespace :api do
    namespace :v1 do
      
      root to: "home#index"

      resources :users do 
        resources :experiences
      end
      resources :experiences
      # resources :experiences
    end
  end

  devise_scope :user do
    get '/auto_login', to: 'sessions#auto_login'
  end

  devise_for :users,
            path: '',
            path_names: {
              sign_in: 'login',
              sign_out: 'logout',
              registration: 'signup'
            },
            controllers: {
              sessions: 'sessions',
              registrations: 'registrations'
            }
  
end
