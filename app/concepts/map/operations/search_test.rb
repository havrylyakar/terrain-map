require_dependency '../../lib/trailblazer_helpers/steps/alerts_handler'

module Map
  class SearchTest < Trailblazer::Operation
    step ::Map::Steps::ValidatePoints
    failure :not_points!

    step ::Trailblazer::Operation::Model(::Area, :find)

    step :search!
    step :way_to_points!

    failure ::TrailblazerHelpers::Steps::AlertsHandler

    # REFACTOR THIS PART
    def search!(result, model:, params:, **)
      start_point = { i: params.dig(:start, :i).to_i, j: params.dig(:start, :j).to_i }
      end_point = { i: params.dig(:end, :i).to_i, j: params.dig(:end, :j).to_i }

      result['way'] = Astar::Search.call(model, start_point, end_point)
    end

    def way_to_points!(options, way:, **)
      options['way'] = way.map do |point|
        point.position
      end
    end

    def not_points!(result, **)
      result['step.errors'] = I18n.t('map.search.errors.points')
    end
  end
end
