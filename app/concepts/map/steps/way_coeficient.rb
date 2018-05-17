module Map
  module Steps
    class WayCoeficient
      extend Uber::Callable

      class << self
        def call(_options, way:, **)
          way = way.map do |point|
            point.tap do |p|
              p.x *= WorldSettings::MAP_COEFICIENT
              p.y *= WorldSettings::MAP_COEFICIENT
            end
          end
        end
      end
    end
  end
end
