module Astar
  class Evklid
    class << self
      def call(current_node, destination_node)
        return Math.sqrt(
                (current_node[:x] - destination_node[:x])**2 +
                (current_node[:y] - destination_node[:y])**2 +
                (current_node[:z] - destination_node[:z])**2
              )
      end
    end
  end
end
