class SessionsController < Devise::SessionsController
  respond_to :json


  def auto_login
    if user_signed_in?
      # binding.pry
      render json: current_user
    else
      render json: { errors: "No users logged in" }
    end
  end

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end