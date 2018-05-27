module Mesh
  class File < BaseService
    FILE_NAME = 'mesh'.freeze

    def initialize(area)
      @area = area
      @file = Tempfile.new([FILE_NAME, '.json'])
    end

    def call
      file.write(file_json)
      file
    end

    private

    attr_reader :area, :file

    def file_json
      Mesh::Build.call(area).to_json
    end
  end
end
