class MapsController < ApplicationController
  cell_path 'map'

  def index
    run Area::Show
    respond_to do |format|
      format.html { render_form :index }
      format.json { render json: JSON.parse(File.read(result['model'].coordinates.path)) }
    end
  end

  def search
    run Map::Search do |result|
      return render json: result['way'], status: :ok
    end
    render json: result['alerts'], status: result['status']
  end

  def search_test
    run Map::SearchTest do |result|
      return render json: result['way'], status: :ok
    end
    render json: result['alerts'], status: result['status']
  end
end
