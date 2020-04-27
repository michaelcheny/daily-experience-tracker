class ApplicationController < ActionController::API
  respond_to :json
  rescue_from ActiveRecord::RecordNotFound, with: :unauthorized_error
  rescue_from AuthorizationError, with: :unauthorized_error

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end

  def authorize_user_resouce(resource)
    raise AuthorizationError.new if resource.user != current_user
  end
  
  def unauthorized_error
    render json: { message: "You are not authorized to make that request" }, status: 401
  end

  def not_found
    render json: { message: "Resource not found" }, status 404
  end
end
