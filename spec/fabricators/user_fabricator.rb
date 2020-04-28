Fabricator(:user) do
  email { Faker::Internet.email }
  password { Faker::Games::Pokemon.name }
  experiences(count: 2)
end