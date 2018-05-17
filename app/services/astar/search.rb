module Astar
  class Search < BaseService
    def initialize(area, start_indexes, destination_indexes)
      @area = area
      @open_nodes   = []
      @closed_nodes = []
      @start_indexes = start_indexes
      @destination_indexes = destination_indexes
    end

    def call
      start_node.h = ::Astar::Heuristic.call(start_node.coordinates_hash, dest_node.coordinates_hash)
      @open_nodes.push(start_node)

      open_list_cyrcle!
      get_result!
    end

    private

    attr_reader :area

    delegate :space_coordinates, to: :сoordinate_service

    def сoordinate_service
      @coordinates_service ||= ::Astar::Coordinates.new(area)
    end

    def start_node
      @start_node ||= PathNode.new(space_coordinates(@start_indexes).merge(@start_indexes))
    end

    def dest_node
      @dest_node ||= PathNode.new(space_coordinates(@destination_indexes).merge(@destination_indexes))
    end

    def neighbor_nodes
      @neighbor_nodes ||= NeighborNodes.new(area, dest_node)
    end

    def expand(current_node)
      neighbor_nodes.find(current_node)
    end


    def open_list_cyrcle!
      while(!@open_nodes.blank?)
        current_node = @open_nodes.sort! { |a,b| a.f <=> b.f }.first
        return if node_eql?(current_node, dest_node)
        @open_nodes.delete(current_node)
        @closed_nodes << current_node
        change_open_list_nodes!(current_node)
      end
    end

    def get_result!
      result = []
      current_node = @open_nodes[0]
      while(current_node != nil)
        result << current_node.position
        current_node = current_node.came_from
      end
      result
    end

    def change_open_list_nodes!(current_node)
      neighbor_nodes = expand(current_node)
      neighbor_nodes.each do |node|
        next if @closed_nodes.map { |cl| cl if node_eql?(cl, node) }.compact.present?
        @open_node = @open_nodes.select{ |n| node_eql?(n, node) }.first
        (@open_nodes << node && next) unless @open_node
        check_path_lenght(node, current_node)
      end
    end

    def check_path_lenght(neig_node, current_node)
      return unless @open_node.g > neig_node.g
      @open_node.came_from = current_node
      @open_node.g = neig_node.g
    end

    def node_eql?(node1, node2)
      node1.position == node2.position
    end
  end
end


# Astar::Search.call(Area.last, {i: 1,j: 1}, {i: 20, j: 20})
