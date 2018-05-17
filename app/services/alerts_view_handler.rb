class AlertsViewHandler
  attr_reader :operation

  class << self
    def call(operation)
      new(operation).perform
    end
  end

  def initialize(operation)
    @operation = operation
  end

  def perform
    setup_alerts!
    setup_status!
  end

  def setup_alerts!
    operation['alerts'] = { message_type => message }.with_indifferent_access
  end

  def setup_status!
    operation['status'] = operation_errors.blank? ? 200 : 422
  end

  def success_message
    operation['success_message']
  end

  def contract_errors_message
    operation['contract.default'] &&
      operation['contract.default'].errors.full_messages
  end

  def steps_errors_message
    operation['step.errors'].presence
  end

  def operation_errors
    @errors ||= steps_errors_message || contract_errors_message
  end

  def message
    operation_errors.blank? ? success_message : operation_errors
  end

  def message_type
    operation_errors.blank? ? 'notice' : 'alert'
  end
end
