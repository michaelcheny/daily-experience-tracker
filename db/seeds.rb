# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

Experience.destroy_all

michael = User.create(email: "michael@michael.com", password: "password")
michael.experiences.create(title: "DO NOT INJECT DISINFECTANT", description: "PLEASE DO NOT INJECT LYSOL")

dog = User.create(email: "dog@dog.com", password: "password")
dog.experiences.create(title: "pooped", description: "woof!")