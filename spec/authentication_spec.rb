require 'rails_helper'
require 'fabrication'
require 'faker'

RSpec.describe 'POST /login', type: :request do
  let(:user) { Fabricate(:user) }
  let(:url) { '/login' }
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    before do
      post url, params: params
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns JTW token in authorization header' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns valid JWT token' do
      token_from_request = response.headers['Authorization'].split(' ').last
      decoded_token = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
      expect(decoded_token.first['sub']).to be_present
    end
  end

  context 'when login params are incorrect' do
    before { post url }
    
    it 'returns unathorized status' do
      expect(response.status).to eq 401
    end
  end
end

RSpec.describe 'DELETE /logout', type: :request do
  let(:url) { '/logout' }

  it 'returns 204, no content' do
    delete url
    expect(response).to have_http_status(204)
  end

  let(:user) { Fabricate(:owner) }
  let(:login_url) { '/login' }
  let(:protected_url) { 'api/v1/experiences'}
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  it 'blacklists the jwt' do
    get protected_url
    expect(reponse).to have_http_status(401)
    post login_url, params: params
    token = response.headers('Authorization').split(" ").last
    expect(token.to be_present)
    
    end
  
end