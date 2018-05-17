module Astar
  module Directions
    def top_node_coordinate(node)
      {
        i: node.i,
        j: node.j + 1
      }
    end

    def left_node_coordinate(node)
      {
        i: node.i - 1,
        j: node.j
      }
    end

    def bottom_node_coordinate(node)
      {
        i: node.i,
        j: node.j - 1
      }
    end

    def right_node_coordinate(node)
      {
        i: node.i,
        j: node.j + 1
      }
    end

    def top_right_node_coordinate(node)
      {
        i: node.i + 1,
        j: node.j + 1
      }
    end

    def bottom_right_node_coordinate(node)
      {
        i: node.i + 1,
        j: node.j - 1
      }
    end

    def bottom_left_node_coordinate(node)
      {
        i: node.i - 1,
        j: node.j - 1
      }
    end

    def top_left_node_coordinate(node)
      {
        i: node.i - 1,
        j: node.j + 1
      }
    end
  end
end
