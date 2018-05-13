module GoogleMaps
  class Api
    def client
      @client ||= GoogleMapsService::Client.new
    end

    def perform!
      raise NotImplementedError, 'Implement call method in subclass'
    end

    def call
      # TODO: Need add log file and errors
      perform!
    end

    attr_reader :errors
  end
end
