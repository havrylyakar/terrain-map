require_dependency '../../lib/trailblazer_helpers/steps/destroy'

class Area
  class Destroy < Trailblazer::Operation
    step ::Trailblazer::Operation::Model(::Area, :find)
    step ::TrailblazerHelpers::Steps::Destroy
    step :setup_success_message!
    success TrailblazerHelpers::Steps::AlertsHandler

    def setup_success_message!(options, **)
      options['success_message'] = I18n.t('views.areas.messages.destroyed')
    end
  end
end
