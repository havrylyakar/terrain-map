class Area
  module Steps
    class SetupPoints
      extend Uber::Callable

      def self.call(_options, params:, **)
        params.merge! points(params)
      end

      def self.points(params)
        {
          south_east: {
            lat: params.dig(:south_west, :lat),
            lon: params.dig(:north_east, :lon)
          },
          nort_west: {
            lat: params.dig(:north_east, :lat),
            lon: params.dig(:south_west, :lon)
          }
        }
      end
    end
  end
end
