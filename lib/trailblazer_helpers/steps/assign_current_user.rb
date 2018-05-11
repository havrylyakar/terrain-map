module TrailblazerHelpers
  module Steps
    class AssignCurrentUser
      extend Uber::Callable

      def self.call(options, **)
        return add_error(options) unless options['current_user']
        options['model'].user = options['current_user']
      end

      def self.add_error(options)
        options['contract.default'].errors.add(:base, I18n.t('operation.assign_user')) && false
      end
    end
  end
end
