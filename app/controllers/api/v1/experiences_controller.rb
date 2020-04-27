class Api::V1::ExperiencesController < ApplicationController
  # before_action :authenticate_user!

  def index
    # binding.pry
    experiences = current_user.experiences
    # experiences = Experience.all
    render json: experiences.to_json
  end
end
