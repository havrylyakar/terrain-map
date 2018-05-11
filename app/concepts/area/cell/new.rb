class Area
  module Cell
    class New < ::Trailblazer::Cell
      def show
        @form = options[:form]
        @form.prepopulate!
        super
      end

      def google_image_url
        @google_image_url ||= GoogleStaticMap.call(params[:center], params[:size])
      end
    end
  end
end
