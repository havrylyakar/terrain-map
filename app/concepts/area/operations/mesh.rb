class Area
  class Mesh < Trailblazer::Operation
    step ::Trailblazer::Operation::Model(::Area, :find)
    step :setup_file!
    step :setup_file_name!

    def setup_file!(options, model:, **)
      options['file'] = ::Mesh::File.call(model)
    end

    def setup_file_name!(options, model:, **)
      options['file_name'] = "#{::Mesh::File::FILE_NAME}_#{model.name}.json"
    end
  end
end
