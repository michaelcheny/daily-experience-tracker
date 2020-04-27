class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    # build_resource(sign_up_params)

    # resource.save
    # render_resource(resource)
    begin
      super
    rescue ActiveRecord::RecordInvalid => e
      render_resource(e.record)
    rescue ActiveRecord::RecordNotUnique => e
      err = OpenStruct.new(errors: { user: "Already Exists" })
      validation_error(err)
    end
  end
end