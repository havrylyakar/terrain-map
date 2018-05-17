module Astar
  class Point
    attr_accessor :x, :y, :z

    def initialize(_x,_y, _z)
      @x = _x
      @y = _y
      @z = _z
    end

    def ==(point)
      x == point.x && y == point.y && z == point.z
    end

    def to_json
      {
        x: x,
        y: y,
        z: z
      }
    end
  end
end
