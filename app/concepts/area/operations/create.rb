require_dependency '../../lib/trailblazer_helpers/steps/alerts_handler'
require_dependency '../../lib/trailblazer_helpers/steps/assign_current_user'

class Area
  class Create < Trailblazer::Operation
    extend ::Trailblazer::Operation::Contract::DSL

    contract ::Area::Contract::Create

    step ::Trailblazer::Operation::Model(::Area, :new)
    step ::TrailblazerHelpers::Steps::AssignCurrentUser
    step ::Trailblazer::Operation::Contract::Build()

    step ::Trailblazer::Operation::Contract::Validate(key: 'reform')
    failure ::TrailblazerHelpers::Steps::AlertsHandler
    step ::Trailblazer::Operation::Contract::Persist()

    success ::TrailblazerHelpers::Steps::AlertsHandler
  end
end
