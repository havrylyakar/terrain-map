class ApplicationView
  class << self
    def parental_controller_for(controller)
      controller&.split('/')&.first
    end

    def action_assets_path(params, file_type)
      path = [params[:controller], params[:action]].join('/') + ".#{file_type}"
      Rails.application.assets.find_asset(path) ? path : ''
    end
  end
end
