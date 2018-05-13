module TrailblazerHelpers
  module Steps
    class Destroy
      extend Uber::Callable

      def self.call(options, **)
        options['model'].destroy
      end
    end
  end
end
