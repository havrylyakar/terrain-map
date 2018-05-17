module Astar
  class PathNode
    attr_reader :position, :i, :j
    attr_accessor :came_from, :g, :h

    delegate :x, :y, :z, to: :position

    def initialize(options)
      @position = ::Astar::Point.new(options[:x], options[:y], options[:z])
      @came_from = options[:came_from]
      @g = options.fetch(:g, 0)
      @h = options[:h]
      @i = options[:i]
      @j = options[:j]
    end

    def coordinates_hash
      {
        x: x,
        y: y,
        z: z
      }
    end

     def to_json
      coordinates_hash.merge(i: i, j: j)
    end

    def f
      g + h if (g && h)
    end
  end
end
