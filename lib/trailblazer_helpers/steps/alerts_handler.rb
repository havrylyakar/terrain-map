module TrailblazerHelpers
  module Steps
    class AlertsHandler
      extend Uber::Callable

      def self.call(options, **)
        AlertsViewHandler.call(options)
      end
    end
  end
end
