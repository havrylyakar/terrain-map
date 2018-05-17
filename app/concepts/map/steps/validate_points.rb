module Map
  module Steps
    class ValidatePoints
      extend Uber::Callable

      class << self
        def call(_options, params:, **)
          start_point?(params) && end_point?(params)
        end

        def start_point?(params)
          params[:start].present?
        end

        def end_point?(params)
          params[:end].present?
        end
      end
    end
  end
end
