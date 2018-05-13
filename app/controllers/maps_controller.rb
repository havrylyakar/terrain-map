class MapsController < ApplicationController
  cell_path 'map'

  def index
    run Area::Show
    respond_to do |format|
      format.html { render_cell_view :index }
      format.json { render json: JSON.parse(File.read(result['model'].coordinates.path)) }
    end
  end
end
