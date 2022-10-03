require 'faker'

class HomeController < ApplicationController
  def index
    render inertia: 'Hello', props: {
      name: Faker::Name.name
    }
  end
end
