module Astar
  class Coordinates
    attr_reader :area, :dest_node

    delegate :bound, :mesh, :coordinates, to: :area

    def initialize(area)
      @area = area
    end

    def space_coordinates(coordinate)
      {
        x: coordinate_x(coordinate),
        y: coordinate_y(coordinate),
        z: coordinate_z(coordinate)
      }
    end

    private

    def points
      @points ||= JSON.parse(File.read(coordinates.path))
    end

    def coordinate_z(i:, j:, **)
      points[j][i]
    end

    def coordinate_x(i:, **)
      i * cell_width + half_cell_width
    end

    def coordinate_y(j:, **)
      j * cell_height + half_cell_height
    end

    def cell_height
      @cell_height ||= (bound.size['height'].to_i * WorldSettings::MAP_COEFICIENT) / mesh['y'].to_f
    end

    def cell_width
      @cell_width ||= (bound.size['width'].to_i * WorldSettings::MAP_COEFICIENT) / mesh['x'].to_f
    end

    def half_cell_width
      @half_cell_width ||= cell_width / 2.0
    end

    def half_cell_height
      @half_cell_height ||= cell_height * 0.8
    end
  end
end
