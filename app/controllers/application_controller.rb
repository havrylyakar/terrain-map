class ApplicationController < ActionController::Base
  include Trailblazer::Rails::Controller
  include RenderOperationHelper

  before_action :authenticate_user!

  def _run_options(options)
    options.merge('current_user' => current_user)
  end

  def self.cell_path(path = '')
    @path = path
  end
end
