module Astar
  class Heuristic
    class << self
      def call(current_node, destination_node)
        return ::Astar::Evklid.call(current_node, destination_node)
        # (current_node[:x] - destination_node[:x]).abs +
        #   (current_node[:y] - destination_node[:y]).abs +
        #     (current_node[:z] - destination_node[:z]).abs
      end
    end
  end
end
