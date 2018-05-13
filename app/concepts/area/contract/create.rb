class Area
  module Contract
    class Create < Reform::Form
      properties :user_id, :name, :mesh, :coordinates
      property :image, populator: -> (fragment:, **) { self.image = open(fragment) }

      property :bound, form: ::Bound::Contract::Create, populate_if_empty: ::Bound,
                       prepopulator: :prepopulate_bound!
      validates :bound, :user_id, :name, presence: true

      def prepopulate_bound!(options)
        self.bound ||= Bound.new
      end
    end
  end
end
