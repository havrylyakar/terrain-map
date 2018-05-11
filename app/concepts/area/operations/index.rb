class Area
  class Index < ::Trailblazer::Operation
    step :setup_model!

    def setup_model!(options, current_user:, **)
      options['model'] = current_user.areas
    end
  end
end
