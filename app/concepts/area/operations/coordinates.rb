class Area
  class Coordinates < ::Trailblazer::Operation
    step :elevation_points
    step :locations
    step :heights
    failure :elavation_errors, fail_fast: true

    step :coordinates_file

    def elevation_points(options, model:, **)
      options['elevation_points'] =
        ::GoogleMaps::Calculators::ElevationPoints.call(model)
    end

    def locations(options, elevation_points:, **)
      options['locations'] =
        elevation_points.inject([]) { |a, e| a << [e[:y], e[:x]] }
    end

    def heights(options, locations:, **)
      options[:heights] = elevation_api.call
    end

    def elavation_errors(options, **)
      options['step.errors'] = elevation_api.errors
    end

    def elevation_api
      @elevation_api ||= ::GoogleMaps::Elevation::Height.new(self['locations'])
    end

    def coordinates_file(options, heights:, model:, **)
      model.coordinates = Area::CoordinateFile.call(model.mesh, heights)
      model.save
    end
  end
end
