module Astar
  class NeighborNodes
    include Astar::Directions

    def initialize(area, dest_node)
      @area = area
      @dest_node = dest_node
      @heightFactor = 0.5
    end

    def find(node)
      NODES_DIRECTIONS.map do |method|
        hash = send(method, node) and PathNode.new(hash)
      end.compact
    end

    private

    attr_reader :dest_node, :area

    delegate :space_coordinates, to: :coordinates_service
    delegate :mesh, to: :area

    def coordinates_service
      @coordinates_service ||= ::Astar::Coordinates.new(area)
    end

    def node_params(coordinate, node)
      space_coordinates = space_coordinates(coordinate)

      {
        came_from: node,
        h: Astar::Heuristic.call(space_coordinates, dest_node.coordinates_hash),
        g: node.g + old_lenght_neighbours(space_coordinates, node.coordinates_hash)
      }.merge(space_coordinates)
    end

    NODES_DIRECTIONS = %i(top_node left_node bottom_node right_node top_right_node
                          bottom_right_node bottom_left_node top_left_node)

    NODES_DIRECTIONS.each do |direction|
      define_method direction do |node|
        coordinate = send("#{direction}_coordinate", node)
        return unless correct?(coordinate)
        coordinate.merge(node_params(coordinate, node))
      end
    end

    def old_lenght_neighbours(nodeA, nodeB)
      return (nodeA[:x] - nodeB[:x]).abs + (nodeA[:y] - nodeB[:y]).abs +
        ((nodeA[:z] - nodeB[:z]).abs * @heightFactor)
    end

    def lenght_neighbours(nodeA, nodeB)
      return Math.sqrt((nodeA[:x] - nodeB[:x])**2 + (nodeA[:y] - nodeB[:y])**2 +
        (nodeA[:z] - nodeB[:z])**2)
    end

    def correct?(i:, j:, **)
      i < mesh['x'] && j < mesh['y']
    end
  end
end
