module Mesh
  class Build < BaseService
    def initialize(area = Area.last)
      @area = area
      @nodes = []
      @max_element = 0
      default_nodes!
      setup_first_lavel!
    end

    def call
      build_nodes!
      nodes
    end

    def z_step
      @z_step ||= @max_element / (mesh[:z] || 50)
    end

    def nodes_enumerable
      mesh['x'].times do |i|
        mesh['y'].times do |j|
          yield(i,j)
        end
      end
    end

    private

    attr_reader :area, :nodes, :max_element

    delegate :space_coordinates, to: :world_coordinates
    delegate :mesh, to: :area

    def build_nodes!
      nodes_enumerable do |i, j|
        @nodes[i][j] = new_z_node(i, j)
      end
    end

    def new_z_node(i, j)
      h = nodes[i][j][0][:z]
      count = (h / z_step).round
      step = h / count

      (0...count).map do |l|
        nodes[i][j][0].merge(z: h - ((l + 1) * step))
      end
    end

    def default_nodes!
      mesh['x'].times do |i|
        @nodes[i] = []

        mesh['y'].times do |j|
          @nodes[i][j] = []
        end
      end
    end

    def setup_first_lavel!
      mesh['x'].times do |i|
        mesh['y'].times do |j|
          @nodes[i][j][0] = space_coordinates(i: i, j: j)
          check_max_element!(i, j)
        end
      end
    end

    def check_max_element!(i, j)
      @max_element = @nodes[i][j][0][:z] if (nodes[i][j][0][:z] <=> @max_element) == 1
    end

    def world_coordinates
      @world_coordinates ||= ::Astar::WorldCoordinates.new(area)
    end
  end
end
