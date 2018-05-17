module Map
  module Cell
    class Index < ::Trailblazer::Cell
      delegate :bound, to: :model
      delegate :size, to: :bound

      def world_configs
        {
          source: maps_url(format: :json),
          worldWidth: size['width'].to_i * WorldSettings::MAP_COEFICIENT,
          worldDepth: size['height'].to_i * WorldSettings::MAP_COEFICIENT,
          cameraPositionX: size['width'].to_i * WorldSettings::CAMERA_POSITION_X_COEFICIENT,
          cameraPositionZ: size['height'].to_i * WorldSettings::CAMERA_POSITION_Y_COEFICIENT
        }
      end
    end
  end
end
