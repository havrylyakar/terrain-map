module GoogleMaps
  module Calculators
    class SizeCoeficient < BaseService
      MAX_SIZE = 640

      def initialize(height, width, zoom)
        @height = height
        @width = width
        @zoom = zoom
        @counter = 0
      end

      def call
        perform!
        counter
      end

      attr_reader :height, :width, :zoom, :counter

      def perform!
        while !avaliable_size? do
          @counter += 1
        end
      end

      def avaliable_size?
        height / (counter + 1) < MAX_SIZE && width / (counter + 1) < MAX_SIZE
      end
    end
  end
end
