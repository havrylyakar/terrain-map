module GoogleMaps
  module Calculators
    class ElevationPoints < BaseService
      def initialize(area, options = {})
        @area = area
        @mesh = options.fetch(:mesh, area.mesh).with_indifferent_access
        @points = []
      end

      def call
        perform!
        points
      end

      private

      attr_reader :points, :area, :mesh

      delegate :bound, to: :area
      delegate :sw_point, :nw_point, :ne_point, to: :bound

      def perform!
        point = { x: nw_point.lat, y: nw_point.lng }

        mesh[:y].times do
          mesh[:x].times do
            points.append(next_point_x(point))
          end
          points.append(next_point_y(point))
        end
      end

      def next_point_x(point)
        (point.tap { |p| p.merge!(x: p[:x] + x_step) }).dup
      end

      def next_point_y(point, x = default_lat)
        (point.tap { |p| p.merge!(x: x, y: p[:y] + y_step) }).dup
      end

      def point_enumertor
        mesh[:x]
      end

      def default_lat
        @default_lat ||= nw_point.lat
      end

      def y_step
        @y_step ||= ((nw_point.lng - sw_point.lng) / mesh[:y]).abs
      end

      def x_step
        @x_step ||= ((nw_point.lat - ne_point.lat) / mesh[:x]).abs
      end
    end
  end
end
