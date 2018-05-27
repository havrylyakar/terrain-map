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

  def destroy
    run Area::Destroy
    render json: result['alerts'], status: result['status']
  end

  def heights
    run Area::Show
    send_file result['model'].coordinates.path, filename: 'temp.json', type: 'application/json'
  end

  def mesh
    run Area::Mesh
    respond_to do |format|
      format.html { send_file result['file'], filename: result['file_name'], type: 'application/json' }
      format.json { render json: JSON.parse(File.read(result['file'])) }
    end
  end
end
