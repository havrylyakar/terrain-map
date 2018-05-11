class AreasController < ApplicationController
  cell_path 'area'

  def index
    run Area::Index
    render_form :index
  end

  def create
    run Area::Create
    redirect_to areas_path
  end

  def new
    run Area::New
    render_form :new, layout: false
  end
end
