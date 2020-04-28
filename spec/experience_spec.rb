require 'rails_helper'
require 'fabrication'
require 'faker'

RSpec.describe 'GET /experiences', type: :request do
  
  let(:user) { Fabricate(:user) }
  let(:user2) { Fabricate(:user) }
  let(:url) { '/login' }
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  let(:params2) do
    {
      user: {
        email: user2.email,
        password: user2.password
      }
    }
  end

  context 'you must be authorized to perform any crud actions on experiences' do
    it "doesn't allow any unauthorized requests to the experiences controller" do
      get '/api/v1/experiences'
      expect(response.status).to eq 401
      get '/api/v1/experiences/1'
      expect(response.status).to eq 401
      post '/api/v1/experiences', params: { experience: { title: "bruh", description: "yoyoyoo"} }
      expect(response.status).to eq 401
      patch '/api/v1/experiences/1', params: { experience: { title: "dude" } }
      expect(response.status).to eq 401
      delete '/api/v1/experiences/1'
      expect(response.status).to eq 401
    end
  end
  
  context 'authenticated users can only create and update their own resources' do
    let(:experienceURL) { '/api/v1/experiences' }
    before do
      post '/login', params: params
      @token = response.headers['Authorization']
      post '/login', params: params2
      @token2 = response.headers['Authorization']
    end

    it 'returns a 404 for unfound experiences' do
      get '/api/v1/experiences/1000', headers: { Authorization: @token }
      expect(response.status).to eq 404
    end

    it 'allows user to view only their own exp' do
      
      get experienceURL, headers: { Authorization: @token }
      body1 = JSON.parse(response.body)
      puts body1
      expect(body1.length).to eq 2
      expect(body1.first['user_id']).to eq 1
      expect(body1.last['user_id']).to eq 1

      get experienceURL, headers: { Authorization: @token2 }
      body2 = JSON.parse(response.body)
      expect(body2.length).to eq 2
      expect(body2.first['user_id']).to eq 2
      expect(body2.last['user_id']).to eq 2

    end

    it 'prevents user from updating an exp that is not theirs' do
      patch '/api/v1/experiences/3', params: { experience: { title: "bruh" } }, headers: { Authorization: @token }
      expect(response.status).to eq 401
    end

    it 'allows user to update their own exp' do
      patch '/api/v1/experiences/1', params: { experience: { title: "bucket list" } }, headers: { Authorization: @token }
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body["title"]).to eq('bucket list')
    end

    it 'prevents someone else from deleting your exp' do
      delete '/api/v1/experiences/3', headers: { Authorization: @token }
      expect(response.status).to eq 401
    end

    it 'prevents non owners to view an exp thats not theirs' do
      get '/api/v1/experiences/1', headers: { Authorization: @token2 }
      puts response
      expect(response.status).to eq 401
    end
    
  end
  
end