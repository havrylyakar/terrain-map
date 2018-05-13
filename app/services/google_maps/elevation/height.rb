module GoogleMaps
  module Elevation
    class Height < ::GoogleMaps::Api
      MAX_COUNT = 300

      def initialize(locations)
        @locations = locations
      end

      def perform!
        @locations.each_slice(MAX_COUNT).flat_map { |records| client.elevation(records) }
      end
    end
  end
end
