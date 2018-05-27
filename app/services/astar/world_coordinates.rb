module Astar
  class WorldCoordinates
    attr_reader :area, :dest_node

    RAD_PER_DEG = Math::PI / 180
    RM = 6371000

    delegate :bound, :mesh, :coordinates, to: :area
    delegate :ne_point, :nw_point, :se_point, to: :bound

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
      i * cell_width
    end

    def coordinate_y(j:, **)
      j * cell_height
    end

    def cell_height
      @cell_height ||= height_distance / mesh['y']
    end

    def cell_width
      @cell_width ||= width_distance / mesh['x']
    end

    def height_distance
      distance_between(*[ne_point.lat, ne_point.lng], *[se_point.lat, se_point.lng])
    end

    def width_distance
      distance_between(*[ne_point.lat, ne_point.lng], *[nw_point.lat, nw_point.lng])
    end

    # a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    # c = 2 ⋅ atan2( √a, √(1−a) )
    # d = R ⋅ c

    def distance_between(lat1, lon1, lat2, lon2)
      lat1_rad, lat2_rad = lat1 * RAD_PER_DEG, lat2 * RAD_PER_DEG
      lon1_rad, lon2_rad = lon1 * RAD_PER_DEG, lon2 * RAD_PER_DEG

      a = Math.sin((lat2_rad - lat1_rad) / 2) ** 2 + Math.cos(lat1_rad) *
          Math.cos(lat2_rad) * Math.sin((lon2_rad - lon1_rad) / 2) ** 2

      c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1 - a))

      RM * c # Delta in meters
    end
  end
end
