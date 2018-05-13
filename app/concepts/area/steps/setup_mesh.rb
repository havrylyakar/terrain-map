class Area
  module Steps
    class SetupMesh
      extend Uber::Callable

      def self.call(_options, params:, **)
        params[:reform] = params[:reform].merge(mesh: ::Area::DEFAULT_MESH)
      end
    end
  end
end
