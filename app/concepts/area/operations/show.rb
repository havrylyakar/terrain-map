class Area
  class Show < Trailblazer::Operation
    step ::Trailblazer::Operation::Model(::Area, :find)
  end
end
