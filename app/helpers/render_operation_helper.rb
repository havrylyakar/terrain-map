module RenderOperationHelper
  def render_form(action, options = {})
    flash_render!(options)
    @op_result = options.fetch(:result, result)
    render html: concept("#{cell_path}/cell/#{action}", @op_result['model'], render_options),
           layout: options.fetch(:layout, true)
  end

  def render_cell_view(action, options = {})
    render html: concept("#{cell_path}/cell/#{action}", @current_user, options),
           layout: options.fetch(:layout, true)
  end

  def render_options
    {
      form: @op_result['contract.default']
    }
  end

  def flash_render!(options)
    flash.now.alert = options[:alert] if options[:alert]
    flash.now.notice = options[:notice] if options[:notice]
  end

  def cell_path
    self.class.instance_variable_get('@path') || params['controller'].singularize
  end
end
