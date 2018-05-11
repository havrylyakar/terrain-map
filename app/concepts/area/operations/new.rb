class Area
  class New < ::Trailblazer::Operation
    extend ::Trailblazer::Operation::Contract::DSL

    contract ::Area::Contract::Create

    step ::Trailblazer::Operation::Model(::Area, :new)
    step ::Trailblazer::Operation::Contract::Build()

    step Steps::SetupPoints
  end
end
