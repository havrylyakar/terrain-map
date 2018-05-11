class Area
  module Cell
    class Index < ::Trailblazer::Cell
      def areas
        concept('/area/cell/show', collection: model)
      end
    end
  end
end
