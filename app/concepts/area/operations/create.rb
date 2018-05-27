require_dependency '../../lib/trailblazer_helpers/steps/alerts_handler'
require_dependency '../../lib/trailblazer_helpers/steps/assign_current_user'
require_dependency 'area/operations/coordinates'

class Area
  class Create < Trailblazer::Operation
    extend ::Trailblazer::Operation::Contract::DSL

    contract ::Area::Contract::Create

    step ::Trailblazer::Operation::Model(::Area, :new)
    step ::TrailblazerHelpers::Steps::AssignCurrentUser
    # step ::Area::Steps::SetupMesh
    step ::Trailblazer::Operation::Contract::Build()


    step ::Trailblazer::Operation::Contract::Validate(key: 'reform')
    failure ::TrailblazerHelpers::Steps::AlertsHandler
    step ::Trailblazer::Operation::Contract::Persist()

    success ::TrailblazerHelpers::Steps::AlertsHandler

    step Nested(::Area::Coordinates, input: :coordinates_input, output: :coordinates_output!)

    def coordinates_output!(_options, mutable_data:, **)
      {
        'params' => mutable_data['params'],
        'model' => mutable_data['model']
      }
    end

    def coordinates_input(_options, model:, **)
      {
        'model' => model
      }
    end
  end
end
