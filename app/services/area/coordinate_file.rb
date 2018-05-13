class Area
  class CoordinateFile < BaseService
    FILE_NAME = 'coordinates'.freeze

    def initialize(mesh, heights)
      @mesh = mesh.with_indifferent_access
      @heights = heights
      @file = Tempfile.new([FILE_NAME, '.json'])
    end

    def call
      file.tap { |f| f.puts(coordinates_json) && f.close }
    end

    private

    attr_reader :heights, :mesh, :file

    def coordinates_json
      (0..mesh[:y]).map do
        heights.slice!(0, mesh[:x]).map { |e| e[:elevation] }
      end.to_json
    end
  end
end
