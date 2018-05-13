module GoogleMaps
  module Helpers
    class ElevationEnumerator
      def self.call(elevations, mesh)
        mesh[:x].times do
          mesh[:y].times do
            yield
          end
        end
      end
    end
  end
end
