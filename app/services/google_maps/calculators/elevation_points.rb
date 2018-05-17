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
        point = { x: nw_point.lng, y: nw_point.lat }

        mesh[:y].times do
          mesh[:x].times do
            points.append(point)
            point = next_point_x(point)
          end
          point = next_point_y(point)
        end
      end

      def next_point_x(point)
        point.merge(x: point[:x] + x_step)
      end

      def next_point_y(point, x = default_lat)
        point.merge(x: x, y: point[:y] - y_step)
      end

      def default_lat
        @default_lat ||= nw_point.lng
      end

      def y_step
        @y_step ||= ((nw_point.lat - sw_point.lat) / (mesh[:y] - 1))
      end

      def x_step
        @x_step ||= ((ne_point.lng - nw_point.lng) / (mesh[:x] - 1))
      end
    end
  end
end
