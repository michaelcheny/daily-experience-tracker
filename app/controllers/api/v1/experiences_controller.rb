class Api::V1::ExperiencesController < ApplicationController
  before_action :authenticate_user!

  def index
    # binding.pry
    experiences = current_user.experiences
    # experiences = Experience.all
    render json: experiences.to_json
  end

  def show
    experience = Experience.find(params[:id])
    authorize_user_resource(experience)
    render_resource(experience, with: [:user])
  end

  def create
    experience = Experience.new(experience_params)
    experience.user = current_user
    experience.save
    render_resource(experience)
  end

  def update
    experience = Experience.find(params[:id])
    authorize_user_resource(experience)
    experience.update(experience_params)
    render_resource(experience)
  end

  def destroy
    experience = Experience.find(params[:id])
    authorize_user_resource(experience)
    experience.destroy
    render_resource(experience)
  end

  private

  def experience_params
    params.require(:experience).permit(:title, :description)
  end

end
